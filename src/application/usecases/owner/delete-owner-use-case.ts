import { prisma } from "../../../lib/prisma";
import { AppError } from "../../../infra/errors/app-error";

type DeleteOwnerUseCaseRequest = {
  id: string;
};

export class DeleteOwnerUseCase {
  async execute({ id }: DeleteOwnerUseCaseRequest) {
    const owner = await prisma.owner.findUnique({
      where: { id },
    });

    if (!owner) {
      throw new AppError("Proprietario nao encontrado", 404);
    }

    await prisma.plot.updateMany({
      where: { ownerId: id },
      data: { ownerId: null },
    });

    await prisma.owner.delete({
      where: { id },
    });

    return { message: "Proprietario removido com sucesso" };
  }
}
