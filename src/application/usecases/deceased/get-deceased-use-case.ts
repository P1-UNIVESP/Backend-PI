import { prisma } from "../../../lib/prisma";
import { AppError } from "../../../infra/errors/app-error";

type GetDeceasedUseCaseRequest = {
  id: string;
};

export class GetDeceasedUseCase {
  async execute({ id }: GetDeceasedUseCaseRequest) {
    const deceased = await prisma.deceased.findUnique({
      where: { id },
      include: {
        burial: {
          include: {
            plot: true,
          },
        },
      },
    });

    if (!deceased) {
      throw new AppError("Falecido nao encontrado", 404);
    }

    return deceased;
  }
}
