const app = require('./app');
const connectDB = require('./config/db');


// connectDB();

app.listen(5000, () => {
  console.log(`listening at 5000`);
});
