import { StatusPlot } from "@prisma/client";

import { prisma } from "../../../lib/prisma";
import { AppError } from "../../../infra/errors/app-error";

type CreateBurialUseCaseRequest = {
  burialDate: Date;
  plotId: string;
  deceasedId: string;
};

export class CreateBurialUseCase {
  async execute({ burialDate, plotId, deceasedId }: CreateBurialUseCaseRequest) {
    const plot = await prisma.plot.findUnique({
      where: { id: plotId },
    });

    if (!plot) {
      throw new AppError("Jazigo nao encontrado", 404);
    }

    if (plot.status !== StatusPlot.DISPONIVEL) {
      throw new AppError("Jazigo nao esta disponivel", 409);
    }

    const deceased = await prisma.deceased.findUnique({
      where: { id: deceasedId },
      include: {
        burial: true,
      },
    });

    if (!deceased) {
      throw new AppError("Falecido nao encontrado", 404);
    }

    if (deceased.burial) {
      throw new AppError("Falecido ja possui sepultamento", 409);
    }

    const burial = await prisma.$transaction(async (tx) => {
      const updatedPlot = await tx.plot.updateMany({
        where: {
          id: plotId,
          status: StatusPlot.DISPONIVEL,
        },
        data: {
          status: StatusPlot.OCUPADO,
        },
      });

      if (updatedPlot.count === 0) {
        throw new AppError("Jazigo nao esta disponivel", 409);
      }

      const createdBurial = await tx.burial.create({
        data: {
          burialDate,
          plotId,
          deceasedId,
        },
      });

      return createdBurial;
    });

    return burial;
  }
}
