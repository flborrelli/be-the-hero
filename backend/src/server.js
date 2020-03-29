// require('dotenv').config();
const app = require('./app');
const config = require('./config');

app.listen(config.port, () => {
  console.log(`Running on PORT: ${config.port}`)
});