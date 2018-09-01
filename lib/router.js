const express = require('express');

const _router = express.Router;
const router = _router();

// return req.method === 'GET' && req.path.endsWith('/index.html');
const isIndexPageRequest = req => req.method === 'GET';

router.use('/', (req, res, next) => {
  if (isIndexPageRequest(req)) {
    const assetsRoot = '/assets';
    // retain router for login
    // maybe someday need
    if (req._parsedOriginalUrl.path === '/login') {
      res.render('login', {
        assetsRoot
      });
    } else {
      res.render('index', {
        assetsRoot
      });
    }
  } else {
    next();
  }
});

module.exports = router;
