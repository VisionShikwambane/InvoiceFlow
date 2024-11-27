import { UserInput } from '../Interfaces/user.interface';
import db from '../models';


class UserService {

  async getAllUsers() {
    return await db.User.findAll();
  }

  async getUserById(id: number) {
    return await db.User.findByPk(id);
  }

  async createUser(data: UserInput) {
    return await db.User.create(data);
  }


  async updateUser(id: number, data: UserInput) {
    const user = await db.User.findByPk(id);
    if (!user) return null;
    return await user.update(data);
  }

  async deleteUser(id: number) {
    const user = await db.User.findByPk(id);
    if (!user) return false;
    await user.destroy();
    return true;
  }
}

export default new UserService();
