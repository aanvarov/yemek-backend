import mongoose, { ConnectOptions } from "mongoose";
import config from "config";
import log from "../logger";

const connect = () => {
  const databaseUri = config.get("databaseUri") as string;

  return mongoose
    .connect(databaseUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => {
      log.info("Connected to database");
    })
    .catch((err) => {
      log.error(err);
      process.exit(1);
    });
};

export default connect;
