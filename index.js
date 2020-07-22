const app = require("./app");
require("dotenv").config();

const start = () => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is Running on port ${process.env.PORT}`);
  });
};

start();
