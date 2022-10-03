import {
  createUserService,
  deleteUserService,
  listUserService,
  updateUserService,
  userLoginService,
} from "../services/user.service.js";

const createUserController = async (request, response) => {
  const { email, name, password } = request.body;

  try {
    const user = await createUserService(email, name, password);

    return response.status(201).json(user);
  } catch (error) {
    return response.status(400).json(err.message);
  }

  // if (user) {
  //   return response.status(201).send(user);
  // }
  // response.status(400).send({
  //   message: "user is already registered",
  // });
};

const listUserController = (request, response) => {
  const users = listUserService();

  response.status(200).json(users);
};

const updateUserController = (request, response) => {
  const { id } = request.params;
  const user = request.body;

  const updatedUser = updateUserService(id, user);

  if (!updatedUser) {
    response.status(400).send({
      message: "User id not found",
    });
  }
  response.status(200).send(updatedUser);
};

const deleteUserController = (request, response) => {
  const { id } = request.params;

  const responseService = deleteUserService(id);

  if (!responseService) {
    response.status(400).send({
      message: "Delete unsuccessfuly user id not found",
    });
  }
  response.status(200).send({
    message: responseService,
  });
};

const userLoginController = async (request, response) => {
  const { email, password } = request.body;

  const userLogin = await userLoginService(email, password);

  return response.status(200).send({
    token: userLogin,
  });
};

export {
  createUserController,
  listUserController,
  updateUserController,
  deleteUserController,
  userLoginController,
};
