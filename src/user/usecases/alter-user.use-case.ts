import { RebbitmqServer } from "../../infra/rabbitmq/Server";
import { Roles, User } from "../user.domain";
import { UserDto } from "../user.dto";
import { UserRepository } from "../user.repos";

export class AlterUserUseCase {
    constructor(private userRepository: UserRepository){}

    async execute(input: UserDto){
        const user = new User(input.register, input.name, input.email, input.role, input.password);
        const userAlter = await this.userRepository.update(user);
        return userAlter;
    }
}