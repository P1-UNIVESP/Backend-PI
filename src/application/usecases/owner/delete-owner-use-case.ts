import { prisma } from "../../../lib/prisma";
import { AppError } from "../../../infra/errors/app-error";

type DeleteOwnerUseCaseRequest = {
  id: string;
};

export class DeleteOwnerUseCase {
  async execute({ id }: DeleteOwnerUseCaseRequest) {
    const owner = await prisma.owner.findUnique({
      where: { id },
      include: {
        ownershipHistory: {
          select: {
            id: true,
          },
          take: 1,
        },
      },
    });

    if (!owner) {
      throw new AppError("Proprietario nao encontrado", 404);
    }

    if (owner.ownershipHistory.length > 0) {
      throw new AppError("Proprietario possui historico de jazigos e nao pode ser removido", 409);
    }

    await prisma.$transaction(async (tx) => {
      await tx.plot.updateMany({
        where: { ownerId: id },
        data: { ownerId: null },
      });

      await tx.owner.delete({
        where: { id },
      });
    });

    return { message: "Proprietario removido com sucesso" };
  }
}
