import { prisma } from "../../../lib/prisma";
import { AppError } from "../../../infra/errors/app-error";

type GetOwnerUseCaseRequest = {
  id: string;
};

export class GetOwnerUseCase {
  async execute({ id }: GetOwnerUseCaseRequest) {
    const owner = await prisma.owner.findUnique({
      where: { id },
      include: {
        plots: true,
      },
    });

    if (!owner) {
      throw new AppError("Proprietario nao encontrado", 404);
    }

    return owner;
  }
}
