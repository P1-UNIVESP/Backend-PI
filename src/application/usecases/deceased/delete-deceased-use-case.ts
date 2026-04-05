import { prisma } from "../../../lib/prisma";
import { AppError } from "../../../infra/errors/app-error";

type DeleteDeceasedUseCaseRequest = {
  id: string;
};

export class DeleteDeceasedUseCase {
  async execute({ id }: DeleteDeceasedUseCaseRequest) {
    const deceased = await prisma.deceased.findUnique({
      where: { id },
      include: {
        burial: true,
      },
    });

    if (!deceased) {
      throw new AppError("Falecido nao encontrado", 404);
    }

    if (deceased.burial) {
      throw new AppError("Nao e possivel remover falecido com sepultamento vinculado", 409);
    }

    await prisma.deceased.delete({
      where: { id },
    });

    return { message: "Falecido removido com sucesso" };
  }
}
