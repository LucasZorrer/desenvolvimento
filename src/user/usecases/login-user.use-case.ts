import { Hash } from "../../utils/hash";
import { UserRepository } from "../user.repos";

interface LoginData {
  email: string;
  password: string;
}

export class LoginUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(loginData: LoginData) {
    try {
      await this.validation(loginData);

      const user = await this.userRepo.findByEmail(loginData.email);
      if (!user) {
        throw new Error("User not found!");
      }
      if ((await user.getPassword()) !== loginData.password) {
        throw new Error("Wrong Password!");
      }
      return Hash.create(await user.getPassword());
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async validation(loginData: LoginData) {
    if (!loginData.email) {
      throw new Error("Email is required");
    }
    if (!loginData.password) {
      throw new Error("Password is required");
    }
  }
}
