import { prisma } from "../../../lib/prisma";

type ListPlotOwnerHistoriesUseCaseRequest = {
  limit: number;
  offset: number;
  q?: string;
  plotId?: string;
  ownerId?: string;
  active?: boolean;
};

export class ListPlotOwnerHistoriesUseCase {
  async execute({ limit, offset, q, plotId, ownerId, active }: ListPlotOwnerHistoriesUseCaseRequest) {
    const where = {
      ...(plotId ? { plotId } : {}),
      ...(ownerId ? { ownerId } : {}),
      ...(active === true ? { endedAt: null } : {}),
      ...(active === false ? { endedAt: { not: null } } : {}),
      ...(q
        ? {
            OR: [
              { plot: { code: { contains: q, mode: "insensitive" as const } } },
              { owner: { name: { contains: q, mode: "insensitive" as const } } },
              { owner: { cpf: { contains: q, mode: "insensitive" as const } } },
            ],
          }
        : {}),
    };

    const [histories, total] = await prisma.$transaction([
      prisma.plotOwnerHistory.findMany({
        where,
        include: {
          plot: true,
          owner: true,
        },
        orderBy: [{ startedAt: "desc" }, { createdAt: "desc" }],
        take: limit,
        skip: offset,
      }),
      prisma.plotOwnerHistory.count({ where }),
    ]);

    return { data: histories, total, limit, offset };
  }
}
