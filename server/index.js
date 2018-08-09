const server = require('./app');

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log('Server is listening on http://127.0.0.1:' + PORT);
});
