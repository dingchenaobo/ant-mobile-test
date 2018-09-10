const jsonServer = require("json-server");

const DB = require('./db')();
const router = jsonServer.router(DB);
const middlewares = jsonServer.defaults();

const server = jsonServer.create();
const port = 4201;

router.render = (req, res) => {
  res.jsonp({
    suc: true,
    data: res.locals.data,
  });
};

server.use(middlewares);
server.use(router);
server.listen(port, () => {
  console.log('JSON Server is running at prot: ', port)
});