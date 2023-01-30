require("dotenv").config();

const { createApp } = require("./app");
const { appDataSource } = require("./models/dbconfig");

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT;

  try {
    await appDataSource
      .initialize()
      .then(() => {
        console.log("Data Source has been intialized!");
      })
      .catch((err) => {
        console.error("Error occurred during Data Source initialization", err);
      });
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    appDataSource.destroy();
    console.error(err);
  }
};

startServer();
