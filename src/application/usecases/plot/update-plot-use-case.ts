import { PlotType, StatusPlot } from "@prisma/client";

import { prisma } from "../../../lib/prisma";
import { AppError } from "../../../infra/errors/app-error";

type UpdatePlotUseCaseRequest = {
  id: string;
  code?: string;
  type?: PlotType;
  status?: StatusPlot;
  capacity?: number;
  ownerId?: string | null;
};

export class UpdatePlotUseCase {
  async execute({ id, code, type, status, capacity, ownerId }: UpdatePlotUseCaseRequest) {
    const plot = await prisma.plot.findUnique({
      where: { id },
    });

    if (!plot) {
      throw new AppError("Jazigo nao encontrado", 404);
    }

    const normalizedCode = code?.trim();

    if (normalizedCode && normalizedCode !== plot.code) {
      const plotWithSameCode = await prisma.plot.findUnique({
        where: { code: normalizedCode },
      });

      if (plotWithSameCode) {
        throw new AppError("Ja existe jazigo com este codigo", 409);
      }
    }

    if (ownerId) {
      const owner = await prisma.owner.findUnique({
        where: { id: ownerId },
      });

      if (!owner) {
        throw new AppError("Proprietario nao encontrado", 404);
      }
    }

    const updatedPlot = await prisma.$transaction(async (tx) => {
      const nextOwnerId = ownerId === undefined ? plot.ownerId : ownerId;
      const ownerChanged = ownerId !== undefined && ownerId !== plot.ownerId;

      if (ownerChanged) {
        await tx.plotOwnerHistory.updateMany({
          where: {
            plotId: plot.id,
            endedAt: null,
          },
          data: {
            endedAt: new Date(),
          },
        });
      }

      const result = await tx.plot.update({
        where: { id },
        data: {
          code: normalizedCode,
          type,
          status,
          capacity,
          ownerId: nextOwnerId,
        },
      });

      if (ownerChanged && nextOwnerId) {
        await tx.plotOwnerHistory.create({
          data: {
            plotId: plot.id,
            ownerId: nextOwnerId,
          },
        });
      }

      return result;
    });

    return updatedPlot;
  }
}
