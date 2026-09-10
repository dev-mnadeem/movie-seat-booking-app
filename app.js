const express = require('express');
const mongoose = require('mongoose');
require('./app_server/models/db');
const path = require('node:path');
const app = express();
app.use(express.urlencoded({ extended: false, limit: '32kb' }));
app.use(express.json({ limit: '32kb' }));
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.get('/health', (_request, response) => response.status(mongoose.connection.readyState === 1 ? 200 : 503).json({ready: mongoose.connection.readyState === 1}));
app.use('/', require('./app_server/routes/route'));
if (require.main === module) {
 mongoose.connection.asPromise().then(() => {
  const server = app.listen(Number(process.env.PORT || 3000), process.env.HOST || '127.0.0.1');
  const stop = () => server.close(() => { void mongoose.disconnect(); });
  process.once('SIGTERM', stop);process.once('SIGINT', stop);
 }).catch(() => { console.error('Database startup failed; check MONGODB_URI');process.exitCode = 1; });
}
module.exports = app;
