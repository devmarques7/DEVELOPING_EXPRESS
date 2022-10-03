import { v4 as uuidv4 } from "uuid";
import users from "../database/index.mjs";
import * as bcryptjs from "bcryptjs";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import jwt from "jsonwebtoken";
import database from "../database/index.mjs";

const createUserService = async (email, name, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const res = await database.query(
      "INSERT INTO users(nome, email, password) VALUES($1, $2, $3) RETURNING*",
      [name, email, password]
    );

    return res.rows[0];
  } catch (error) {
    throw new Error(err);
  }

  // const newUser = {
  //   email,
  //   name,
  //   password: hashedPassword,
  //   id: uuidv4(),
  // };
};

const listUserService = () => {
  return users;
};

const updateUserService = (id, user) => {
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return false;
  }
  users[userIndex] = { ...users[userIndex], ...user };

  return users[userIndex];
};

const deleteUserService = (id) => {
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return false;
  }
  users.splice(userIndex, 1);

  return "Deleted successfully";
};

const userLoginService = async (email, password) => {
  const user = users.find((user) => user.email === email);

  if (!user) {
    return false;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return false;
  }

  const token = jwt.sign({ email: email }, "SECRET_KEY", { expiresIn: "24h" });

  return token;
};

export {
  createUserService,
  listUserService,
  updateUserService,
  deleteUserService,
  userLoginService,
};
