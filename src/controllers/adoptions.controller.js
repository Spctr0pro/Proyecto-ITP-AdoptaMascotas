// import { adoptionsService, petsService } from "../services/index.js"
import { UserServices } from "../services/user.services.js";
import { AdoptionServices } from "../services/adoption.services.js";
import { PetServices } from "../services/pet.services.js";

export class AdoptionsController {
  constructor() {
    this.adoptionsService = new AdoptionServices();
    this.usersService = new UserServices();
    this.petsService = new PetServices();
  }

  remove = async (req, res, next) => {
    try {
      const aid = req.params.aid;
      
      const result = await this.adoptionsService.remove(aid);
      
      res.status(200).json({ status: "success", message: "pet deleted" });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const aid = req.params.aid;
      const result = await this.adoptionsService.update(aid, req.body);
      res.status(201).json({ status: "success", payload: result });
    } catch (error) {
      next(error);
    }
  };

  getAllAdoptions = async (req, res, next) => {
    try {
      const result = await this.adoptionsService.getAll();
      res.status(200).json({ status: "success", payload: result });
    } catch (error) {
      next(error);
    }
  };

  getAdoption = async (req, res, next) => {
    try {
      const adoptionId = req.params.aid;
      const adoption = await this.adoptionsService.getById(adoptionId);
      if (!adoption) return res.status(404).send({ status: "error", error: "Adoption not found" });
      res.status(200).json({ status: "success", payload: adoption });
    } catch (error) {
      next(error);
    }
  };

  createAdoption = async (req, res, next) => {
    try {
      const { uid, pid } = req.params;     

      const user = await this.usersService.getById(uid);
      if (!user) return res.status(404).send({ status: "error", error: "user Not found" });
      const pet = await this.petsService.getById(pid);
      if (!pet) return res.status(404).send({ status: "error", error: "Pet not found" });
      if (pet.adopted) return res.status(400).send({ status: "error", error: "Pet is already adopted" });
      
      user.pets.push(pet._id);
      await this.usersService.update(user._id, { pets: user.pets });
      await this.petsService.update(pet._id, { adopted: true, owner: user._id });
      const newAdoption = await this.adoptionsService.create({ owner: user._id, pet: pet._id });
      res.status(201).json({ status: "success", payload: newAdoption });
    } catch (error) {
      next(error);
    }
  };
}
