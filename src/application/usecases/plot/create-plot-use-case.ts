import { PlotType, StatusPlot } from "@prisma/client";

import { prisma } from "../../../lib/prisma";
import { AppError } from "../../../infra/errors/app-error";

type CreatePlotUseCaseRequest = {
  code: string;
  type: PlotType;
  status?: StatusPlot;
  capacity: number;
  ownerId?: string;
};

export class CreatePlotUseCase {
  async execute({ code, type, status, capacity, ownerId }: CreatePlotUseCaseRequest) {
    const normalizedCode = code.trim();

    const plotWithSameCode = await prisma.plot.findUnique({
      where: { code: normalizedCode },
    });

    if (plotWithSameCode) {
      throw new AppError("Ja existe jazigo com este codigo", 409);
    }

    if (ownerId) {
      const owner = await prisma.owner.findUnique({
        where: { id: ownerId },
      });

      if (!owner) {
        throw new AppError("Proprietario nao encontrado", 404);
      }
    }

    const plot = await prisma.plot.create({
      data: {
        code: normalizedCode,
        type,
        status: status ?? StatusPlot.DISPONIVEL,
        capacity,
        ownerId: ownerId ?? null,
      },
    });

    return plot;
  }
}
