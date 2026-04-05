import { prisma } from "../../../lib/prisma";
import { PlotType, StatusPlot } from "@prisma/client";

type ListPlotsUseCaseRequest = {
  limit: number;
  offset: number;
  q?: string;
  status?: StatusPlot;
  type?: PlotType;
};

export class ListPlotsUseCase {
  async execute({ limit, offset, q, status, type }: ListPlotsUseCaseRequest) {
    const where = {
      ...(status ? { status } : {}),
      ...(type ? { type } : {}),
      ...(q
        ? {
            OR: [
              { code: { contains: q, mode: "insensitive" as const } },
              { owner: { name: { contains: q, mode: "insensitive" as const } } },
            ],
          }
        : {}),
    };

    const [plots, total] = await prisma.$transaction([
      prisma.plot.findMany({
        where,
        include: { owner: true },
        orderBy: { code: "asc" },
        take: limit,
        skip: offset,
      }),
      prisma.plot.count({ where }),
    ]);

    return { data: plots, total, limit, offset };
  }
}
