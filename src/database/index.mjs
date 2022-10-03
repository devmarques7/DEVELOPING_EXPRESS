import { Client } from "pg";

const database = new Client({
  user: "admin",
  host: "localhost",
  database: "database",
  password: "pswr",
  port: 5432,
});

export const startDatabase = async () => {
  await database.connect();
};

export default database;
