require('dotenv').config();
const app = require('./app');

app.listen(process.env.PORT, () => {
  console.log(`Running on PORT: ${process.env.PORT}`)
});