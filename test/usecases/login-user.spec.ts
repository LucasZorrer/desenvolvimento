import { describe, expect, it } from "vitest";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
import { CreateUserUseCase } from "../../src/user/usecases/create-user.use-case";
import { LoginUserUseCase } from "../../src/user/usecases/login-user.use-case";
import { PrismaUserRepos } from "../../src/user/implements/prisma-user.repos";
import { Roles } from "../../src/user/user.domain";

describe("Login User Tests", async () => {
  const repos = new PrismaUserRepos();
  const register = randomUUID();
  const input = {
    register: register,
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(8),
  };
  const user = await new CreateUserUseCase(repos).execute(input, register);

  it("Test if the inputs are correct", async () => {
    const input = {
        email: user.getEmail(),
        password: await user.getPassword(),
    }
    const LoginUser = await new LoginUserUseCase(repos).execute(input);

   

  })
});
