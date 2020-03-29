require('dotenv').config();
const app = require('./app');

app.listen(process.env.PORT || 5000, () => {
  console.log(`Running on PORT: ${process.env.PORT}`)
});