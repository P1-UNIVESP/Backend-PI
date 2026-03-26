import { prisma } from "../../lib/prisma";
import { AppError } from "../../infra/errors/app-error";

type RegisterDeathUseCaseRequest = {
  name: string;
  cause: string;
  occurredAt: Date;
  location?: string;
};

export class RegisterDeathUseCase {
  async execute({
    name,
    cause,
    occurredAt,
    location,
  }: RegisterDeathUseCaseRequest) {
    if (occurredAt.getTime() > Date.now()) {
      throw new AppError("A data do obito nao pode ser no futuro", 400);
    }

    const death = await prisma.death.create({
      data: {
        name: name.trim(),
        cause: cause.trim(),
        occurredAt,
        location: location?.trim() || null,
      },
    });

    return death;
  }
}
