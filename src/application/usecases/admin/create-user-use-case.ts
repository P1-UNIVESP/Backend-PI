import { auth } from "../../../lib/auth";

type CreateUserUseCaseRequest = {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin";
};

export class CreateUserUseCase {
  async execute({ name, email, password, role }: CreateUserUseCaseRequest) {
    return auth.api.createUser({
      body: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        role: role ?? "user",
      },
    });
  }
}
