# Movie Ticketing

A cinema seat-booking application: browse films, pick a cinema and showtime,
choose seats, pay, and review booking history.

Express, MongoDB (Mongoose), EJS-rendered HTML.

**Read the limitations section before judging this one.** It is early student
work, and the honest summary is that the plumbing now works and the application
logic largely does not. What follows documents both.

---

## Run it

```bash
docker compose up -d --build
```

Open **http://localhost:3700**.

![The account screen](docs/screenshots/landing.png)

---

## It was called three different things

| Where | Name |
|---|---|
| Directory | `Thecodechecker` |
| `README.md` | `# My-Cv` |
| `package.json` | `movie_ticketing` |
| The actual code | a movie ticketing system |

The README was a single line naming a different project entirely. `package.json`
is the only one that was right, and it is now the name used everywhere.

---

## Credentials were committed

```js
dbURI = "mongodb://shamsa:shamsa123@ds263571.mlab.com:63571/loc8r";
```

A username and password, in plain text, in `app_server/models/db.js` — and a
second copy commented out in `app.js`. The connection string now comes from
`MONGODB_URI`.

**This does not undo the disclosure.** The credential is in this repository's
git history, and removing it from the working tree does not remove it from
there. mLab shut down in 2018 so that host is long dead, but if the password
was reused anywhere it should be treated as public. Rewriting history is a
decision for whoever owns the repository, not something to do quietly.

`gitignore` was also missing its leading dot, so git never read it. It was
supposed to be ignoring `node_modules`.

---

## Nothing could be saved to the database

The app rendered every page and persisted nothing. Two separate causes.

**Four connections to three databases.** `db.js`, `showtimedb.js`,
`history.js` and `usersdb.js` each called `mongoose.connect()`, three of them
hardcoded to `localhost` and naming *different* databases:

```js
mongoose.connect('mongodb://localhost/showtimedb');   // showtimedb.js
mongoose.connect('mongodb://localhost/history');      // history.js
mongoose.connect('mongodb://localhost/usersdb');      // usersdb.js
```

Mongoose has a single default connection. Those calls did not open three
connections to three databases — the last one won and every model shared it.
In a container the three `localhost` calls also failed outright, logging
connection errors on every start while the app appeared to work. Connecting is
now `db.js`'s job alone, and there is a test that fails if a second module
starts doing it again.

**The driver spoke a protocol the database no longer accepts.** mongoose 5.3 /
mongodb 3.1 use the OP_QUERY opcode, removed in MongoDB 6:

```
Unsupported OP_QUERY command: insert. The client driver may require an upgrade.
```

Every write failed with that, and every page still rendered — so the
application looked like it worked. On mongoose 8 the writes land: four
collections now appear where none did before.

---

## A GET request wrote to the database

The `/user.html` handler rendered the page, then inserted a hardcoded user, then
rendered the page *again*:

```js
res.render("user.html", { user_n: "Mark", ... }),
usersdb1.create(
  { id: 2, name: "ujh,buj", password: "yv", email: "uhygu@d.gg", city: "hgu" },
  function (err, usersdb1) { ... res.render("user.html", { userData: usersdb1 }) }
)
```

Three things wrong at once: a GET that writes, junk data written on every page
view, and two `res.render()` calls in one handler — which throws
`ERR_HTTP_HEADERS_SENT` the moment the insert succeeds. It only ever *looked*
fine because the insert always failed. There is a test that loads the page
twice and asserts the user count did not change.

---

## Dependencies that were never imported

`@angular/cli` (in an Express app), `jade` *and* `pug` (jade is pug's
deprecated predecessor, and the app renders with EJS anyway),
`node-base64-image`, `prettier`, `ejs-lint`, and `fs` — which is a Node
builtin; the npm package of that name is an unrelated stub. None of them appear
in a single `require()`.

Thirty-three lines of commented-out duplicate connection logic came out of
`app.js` too.

---

## Tests

```bash
docker compose run --rm --no-deps -v "$PWD/tests":/app/tests \
  -e APP_URL=http://web:3000 -e MONGODB_URI=mongodb://mongo:27017/ticketing \
  --entrypoint sh web -c 'node --test tests/'
```

10 tests, from none. They are deliberately modest, and it is worth saying why:
most controllers render hardcoded values —
`res.render("user.html", { user_n: "Mark", city: "Karachi" })` — so unit tests
over them would assert that a constant equals itself. That is test theatre and
it would make the suite look like evidence of quality this code does not have.

What they do pin is everything that was actually broken: every route responds,
a GET does not write, no source file carries a connection string with a
password, the URI comes from the environment, and exactly one module opens a
connection.

---

## Known limitations

This is the honest part.

- **Passwords would be stored in plain text.** The user schema has a
  `password: String` field and there is no hashing anywhere in the codebase.
  Nothing currently writes a password — the only code that did was the junk
  insert removed above — so this is latent rather than active. Wiring up the
  signup form would need bcrypt first.
- **The signup and login forms are not connected to anything.** They render,
  they post nowhere useful.
- **Most controllers return hardcoded data.** Cinema listings, user details and
  payment summaries are literals in the source, not queries.
- **Handlers are named `nothing`, `nothing1` … `nothing5`.** That is not a
  style complaint; it reflects that they were placeholders that never got
  finished.
- **It is branded "BookMyShow.com"**, which is a real and substantial company.
  That is fine for a private exercise and not fine for a public portfolio — it
  should be renamed before this repository is made public.
- **No authentication, sessions, or authorisation** of any kind.

**What this repository is worth showing for:** the debugging. A dead driver
protocol, four competing connections, a GET that wrote, and a committed
credential are all real production failure modes, and the README above is a
record of finding and fixing them. It is not worth showing as a working product,
and presenting it as one would be the same kind of overclaiming the fixes above
were about.
