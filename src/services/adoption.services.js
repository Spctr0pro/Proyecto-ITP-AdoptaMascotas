import Adoption from "../dao/Adoption.js";
import Pet from "../dao/Pets.dao.js";
import Users from "../dao/Users.dao.js";

export class AdoptionServices {
  constructor() {
    this.adoptionDao = new Adoption();
    this.userDao = new Users();
    this.petDao = new Pet();
  }
  async getAll() {
    const adoptions = await this.adoptionDao.get();
    return adoptions;
  }
  async getById(id) {
    const adoption = await this.adoptionDao.getBy(id);
    if (!adoption) throw customError.notFoundError(`Adoption id ${id} not found`);
    return adoption;
  }

  async create(data) {
    const adoption = await this.adoptionDao.save(data);
    return adoption;
  }

  async update(id, data) {
    const adoption = await this.adoptionDao.update(id, data);
    return adoption;
  }

  async remove(id) {
    const adoption = await this.adoptionDao.getBy(id);
    const user = await this.userDao.getBy(adoption.owner._id);
    const pet = await this.petDao.getBy(adoption.pet._id);
    await this.adoptionDao.delete(id);
    
    user.pets.pop(adoption.pet._id);
    await this.userDao.update(user._id, { ...user });
    pet.adopted = false;
    await this.petDao.update(adoption.pet._id, { ...pet });
    
    return "ok";
  }
}
