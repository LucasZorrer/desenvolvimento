import { RebbitmqServer } from "../../infra/rabbitmq/Server";
import { Roles, User } from "../user.domain";
import { UserDto } from "../user.dto";
import { UserRepository } from "../user.repos";

export interface PayLoad  {
    name: string;
    photoFile: string;
    role: string;
  }

export class DeleteUserUseCase {
    constructor(private userRepository: UserRepository){}

    async execute(register: string, payLoad: PayLoad) {
        try {
            this.verifyUser(register);
            this.verifyRole(payLoad);
            await this.userRepository.delete(register);
        }catch (error: any){
            throw new Error(error.message);
        }
    }
    async verifyUser(register: string){
        const result = await this.userRepository.findByRegister(register);
        if(result == null){
            throw new Error("User not found.")
        }
    }
    async verifyRole(payLoad: PayLoad){
        if (payLoad.role !== "ADMIN"){
            throw new Error("You don't have permition to delete ADMINs.")
        }
    }


}