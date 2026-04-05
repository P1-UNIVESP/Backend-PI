import { StatusPlot } from "@prisma/client";

import { prisma } from "../../../lib/prisma";
import { AppError } from "../../../infra/errors/app-error";

type DeleteBurialUseCaseRequest = {
  id: string;
};

export class DeleteBurialUseCase {
  async execute({ id }: DeleteBurialUseCaseRequest) {
    const burial = await prisma.burial.findUnique({
      where: { id },
    });

    if (!burial) {
      throw new AppError("Sepultamento nao encontrado", 404);
    }

    await prisma.$transaction(async (tx) => {
      await tx.burial.delete({
        where: { id },
      });

      await tx.plot.update({
        where: { id: burial.plotId },
        data: {
          status: StatusPlot.DISPONIVEL,
        },
      });
    });

    return { message: "Sepultamento removido com sucesso" };
  }
}
