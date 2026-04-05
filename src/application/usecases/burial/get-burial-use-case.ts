import { prisma } from "../../../lib/prisma";
import { AppError } from "../../../infra/errors/app-error";

type GetBurialUseCaseRequest = {
  id: string;
};

export class GetBurialUseCase {
  async execute({ id }: GetBurialUseCaseRequest) {
    const burial = await prisma.burial.findUnique({
      where: { id },
      include: {
        plot: true,
        deceased: true,
      },
    });

    if (!burial) {
      throw new AppError("Sepultamento nao encontrado", 404);
    }

    return burial;
  }
}
