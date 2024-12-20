import { customError, CustomError } from "../errors/custom.error.js";
import { generateUsersMock } from "../mocks/user.mock.js";
import { UserServices } from "../services/user.services.js";

export class UserControllers {
  constructor() {
    this.userServices = new UserServices();
  }

  create = async (req, res) => {
    const user = await this.userServices.create(req.body);
    res.status(201).json({ status: "ok", payload: user });
  };

  createUserMock = async (req, res) => {
    const users = await this.userServices.createMocks();
    
    res.status(201).json({ status: "ok", users });
  };

  getAllUsers = async (req, res, next) => {
    try {
      const users = await this.userServices.getAll();
      res.status(200).json({ status: "success", payload: users });
    } catch (error) {
      next(error);
    }
  };

  getUser = async (req, res, next) => {
    try {
      const userId = req.params.uid;

      const user = await this.userServices.getById(userId);

      res.status(200).json({ status: "success", payload: user });
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req, res) => {
    const updateBody = req.body;
    const userId = req.params.uid;
    const user = await this.userServices.getById(userId);
    if (!user)
      return res.status(404).send({ status: "error", error: "User not found" });

    const result = await this.userServices.update(userId, updateBody);
    res.status(201).json({ status: "success", payload: result });
  };

  deleteUser = async (req, res) => {
    const userId = req.params.uid;
    const result = await this.userServices.remove(userId);
    res.status(200).json({ status: "success", message: "User deleted" });
  };

  deleteAllUser = async (req, res) => {
    const result = await this.userServices.removeAll();
    res.status(200).json({ status: "success", message: "Users deleted" });
  };
}
