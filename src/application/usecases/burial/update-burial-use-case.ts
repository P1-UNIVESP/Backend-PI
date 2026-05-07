import { StatusPlot } from "@prisma/client";

import { prisma } from "../../../lib/prisma";
import { AppError } from "../../../infra/errors/app-error";

type UpdateBurialUseCaseRequest = {
  id: string;
  burialDate?: Date;
  plotId?: string;
  deceasedId?: string;
};

export class UpdateBurialUseCase {
  async execute({ id, burialDate, plotId, deceasedId }: UpdateBurialUseCaseRequest) {
    const burial = await prisma.burial.findUnique({
      where: { id },
    });

    if (!burial) {
      throw new AppError("Sepultamento nao encontrado", 404);
    }

    const nextPlotId = plotId ?? burial.plotId;
    const nextDeceasedId = deceasedId ?? burial.deceasedId;

    if (nextPlotId !== burial.plotId) {
      const nextPlot = await prisma.plot.findUnique({
        where: { id: nextPlotId },
      });

      if (!nextPlot) {
        throw new AppError("Jazigo nao encontrado", 404);
      }

      if (nextPlot.status !== StatusPlot.DISPONIVEL) {
        throw new AppError("Jazigo nao esta disponivel", 409);
      }
    }

    if (nextDeceasedId !== burial.deceasedId) {
      const nextDeceased = await prisma.deceased.findUnique({
        where: { id: nextDeceasedId },
        include: {
          burial: true,
        },
      });

      if (!nextDeceased) {
        throw new AppError("Falecido nao encontrado", 404);
      }

      if (nextDeceased.burial) {
        throw new AppError("Falecido ja possui sepultamento", 409);
      }
    }

    const updatedBurial = await prisma.$transaction(async (tx) => {
      const updated = await tx.burial.update({
        where: { id },
        data: {
          burialDate,
          plotId,
          deceasedId,
        },
      });

      if (plotId && plotId !== burial.plotId) {
        const updatedNextPlot = await tx.plot.updateMany({
          where: {
            id: plotId,
            status: StatusPlot.DISPONIVEL,
          },
          data: { status: StatusPlot.OCUPADO },
        });

        if (updatedNextPlot.count === 0) {
          throw new AppError("Jazigo nao esta disponivel", 409);
        }

        await tx.plot.update({
          where: { id: burial.plotId },
          data: { status: StatusPlot.DISPONIVEL },
        });
      }

      return updated;
    });

    return updatedBurial;
  }
}
