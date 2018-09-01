const { app } = require('./devServer');
const router = require('./router');

// Use ejs as the default view engine.
app.set('view engine', 'ejs');

app.use('/', router);
module.exports = app;