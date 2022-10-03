import express from "express";
import {
  createUserController,
  listUserController,
  updateUserController,
  deleteUserController,
  userLoginController,
} from "./controllers/user.controller.js";
import { startDatabase } from "./database/index.mjs";
import { verifyAuthToken } from "./middlewares/verify.middlewares.mjs";

const app = express();
app.use(express.json());

app.post("/user", createUserController);
app.get("/users", listUserController);
app.patch("/user/:id", verifyAuthToken, updateUserController);
app.delete("/user/:id", verifyAuthToken, deleteUserController);
app.post("/login", userLoginController);

app.listen(3000, () => {
  console.log("server running at 3000");
  startDatabase();
  console.log("Database connected");
});

// ---> EXEMPLOS DE ROTAS <----

// app.get("/carros", (request, response) => {
//   response.send("hello, voce está na rota Carros ");
// });

// app.get("/motos", (request, response) => {
//   response.send("hello, voce está na rota motos ");
// });

// app.get("/aviao", (request, response) => {
//   response.send("hello, voce está na rota aviao ");
// });

// app.get("/bikes", (request, response) => {
//   response.send("hello, voce está na rota bikes ");
// });
