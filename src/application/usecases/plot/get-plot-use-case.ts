import { prisma } from "../../../lib/prisma";
import { AppError } from "../../../infra/errors/app-error";

type GetPlotUseCaseRequest = {
  id: string;
};

export class GetPlotUseCase {
  async execute({ id }: GetPlotUseCaseRequest) {
    const plot = await prisma.plot.findUnique({
      where: { id },
      include: {
        owner: true,
        burials: {
          include: {
            deceased: true,
          },
        },
      },
    });

    if (!plot) {
      throw new AppError("Jazigo nao encontrado", 404);
    }

    return plot;
  }
}
