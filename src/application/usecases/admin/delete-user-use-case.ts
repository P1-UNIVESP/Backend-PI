import { prisma } from "../../../lib/prisma";
import { AppError } from "../../../infra/errors/app-error";

type DeleteUserUseCaseRequest = {
  id: string;
  currentUserId: string;
};

export class DeleteUserUseCase {
  async execute({ id, currentUserId }: DeleteUserUseCaseRequest) {
    if (id === currentUserId) {
      throw new AppError("Voce nao pode remover o proprio usuario", 409);
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new AppError("Usuario nao encontrado", 404);
    }

    await prisma.user.delete({
      where: { id },
    });

    return { message: "Usuario removido com sucesso" };
  }
}
