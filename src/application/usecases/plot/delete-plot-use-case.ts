import { prisma } from "../../../lib/prisma";
import { AppError } from "../../../infra/errors/app-error";

type DeletePlotUseCaseRequest = {
  id: string;
};

export class DeletePlotUseCase {
  async execute({ id }: DeletePlotUseCaseRequest) {
    const plot = await prisma.plot.findUnique({
      where: { id },
      include: {
        burials: true,
      },
    });

    if (!plot) {
      throw new AppError("Jazigo nao encontrado", 404);
    }

    if (plot.burials.length > 0) {
      throw new AppError("Nao e possivel remover jazigo com sepultamentos", 409);
    }

    await prisma.plot.delete({
      where: { id },
    });

    return { message: "Jazigo removido com sucesso" };
  }
}
