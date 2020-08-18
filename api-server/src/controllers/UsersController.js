import UserModel from "../models/User";
import TryCatchErrorDecorator from "../decorators/TryCatchErrorDecorator";

class UsersController {
  @TryCatchErrorDecorator
  static async index(req, res) {
    const users = await UserModel.find().select("_id name email lastLoginDate creationDate status");

    res.json(users);
  }

  @TryCatchErrorDecorator
  static async delete(req, res) {
    const deleteUsers = req.body.users;

    const promises = deleteUsers.map(userId => {
      return UserModel.deleteOne({ _id: userId });
    })

    await Promise.all(promises);

    const users = await UserModel.find().select("_id name email lastLoginDate creationDate status");

    res.json(users);
  }

  static async updateStatus(req, res) {
    const updateStatusUsers = req.body.users;
    const updateStatus = req.body.status;

    const promises = updateStatusUsers.map(userId => {
      return UserModel.updateOne({ _id: userId }, { status: updateStatus });
    })

    await Promise.all(promises);

    const users = await UserModel.find().select("_id name email lastLoginDate creationDate status");

    res.json(users);
  }
}

export default UsersController;
