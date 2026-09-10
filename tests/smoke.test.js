const { test, describe, after } = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");

const BASE = process.env.APP_URL || "http://localhost:3000";

async function get(route) {
  const res = await fetch(`${BASE}${route}`);
  return { status: res.status, body: await res.text() };
}

describe("routes respond", () => {
  const routes = [
    "/",
    "/landing.html",
    "/user.html",
    "/payment.html",
    "/watchhist.html",
    "/cinemalist.html",
    "/index.html/demo",
    "/select.html/demo",
    "/paymentsummary.html?data=2",
  ];

  for (const route of routes) {
    test(`GET ${route} does not error`, async () => {
      const { status } = await get(route);
      assert.strictEqual(status, 200, `${route} returned ${status}`);
    });
  }
});

describe("GET requests are safe", () => {
  test("loading the account page does not create a user", async () => {
    // This page used to insert a hardcoded user — name "ujh,buj", password
    // "yv" — into the database on every view, and render twice while doing it.
    const before = await countUsers();
    await get("/user.html");
    await get("/user.html");
    const after = await countUsers();
    assert.strictEqual(after, before, "a GET wrote to the database");
  });
});

describe("no credentials in source", () => {
  const sourceFiles = [];
  (function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      // Skip tests/ — this file connects in a helper and would count itself.
      if (
        entry.name === "node_modules" ||
        entry.name === "tests" ||
        entry.name.startsWith(".")
      )
        continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".js")) sourceFiles.push(full);
    }
  })(path.join(__dirname, ".."));

  test("no connection string carries a password", () => {
    // A URI with credentials was committed here in plain text and is still in
    // this repository's git history.
    const pattern = /mongodb(\+srv)?:\/\/[^\/\s"']*:[^@\s"']+@/;
    const offenders = sourceFiles.filter((f) =>
      pattern.test(fs.readFileSync(f, "utf8"))
    );
    assert.deepStrictEqual(offenders, [], `credentials found in: ${offenders}`);
  });

  test("the database URI comes from the environment", () => {
    const db = fs.readFileSync(
      path.join(__dirname, "..", "app_server", "models", "db.js"),
      "utf8"
    );
    assert.match(db, /process\.env\.MONGODB_URI/);
  });

  test("only one module opens a connection", () => {
    // Three model files each called mongoose.connect() with a different
    // hardcoded database name. Mongoose has one default connection, so the
    // last call simply won and they all shared it.
    const connecting = sourceFiles.filter((f) => {
      // Strip comments first: a commented-out connect() is not a connection,
      // and this repository had a whole duplicate block of them.
      const src = fs
        .readFileSync(f, "utf8")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/^\s*\/\/.*$/gm, "");
      return /mongoose\.connect\(/.test(src);
    });
    assert.strictEqual(
      connecting.length,
      1,
      `expected one connect() call, found ${connecting.length}: ${connecting}`
    );
  });
});

async function countUsers() {
  const mongoose = require("mongoose");
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ticketing");
  }
  return mongoose.connection.db.collection("usersdb1").countDocuments();
}

after(async () => {
  const mongoose = require("mongoose");
  if (mongoose.connection.readyState === 1) await mongoose.disconnect();
});


describe('read-only demonstration routes', () => {
 test('detail and summary views do not create cinemas or payment history', async () => {
  const mongoose = require('mongoose');
  if (mongoose.connection.readyState !== 1) await mongoose.connect(process.env.MONGODB_URI);
  const counts = async () => Promise.all(['cinemas','histories'].map(name=>mongoose.connection.db.collection(name).countDocuments()));
  const before = await counts();
  await get('/index.html/demo');await get('/paymentsummary.html?data=2');
  assert.deepStrictEqual(await counts(), before);
 });
 test('selection routes respond and malformed quantities are rejected', async () => {
  const result = await fetch(`${BASE}/pop.html/demo`,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'seat=A1,A2',redirect:'manual'});
  assert.strictEqual(result.status,302);
  assert.strictEqual((await get('/paymentsummary.html?data=-1')).status,400);
 });
});
