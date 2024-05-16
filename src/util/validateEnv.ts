import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";

export default cleanEnv(process.env, {
  MONGO_CONNECTION_STRING: str(),
  JWT_SECRET: str(),
  SESSION_SECRET: str(),
  PORT: port(),
});
