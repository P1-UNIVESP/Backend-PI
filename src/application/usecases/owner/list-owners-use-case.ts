import { prisma } from "../../../lib/prisma";

type ListOwnersUseCaseRequest = {
  limit: number;
  offset: number;
  q?: string;
};

export class ListOwnersUseCase {
  async execute({ limit, offset, q }: ListOwnersUseCaseRequest) {
    const where = q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" as const } },
            { cpf: { contains: q, mode: "insensitive" as const } },
            { phone: { contains: q, mode: "insensitive" as const } },
          ],
        }
      : undefined;

    const [owners, total] = await prisma.$transaction([
      prisma.owner.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: { plots: true },
        take: limit,
        skip: offset,
      }),
      prisma.owner.count({ where }),
    ]);

    return { data: owners, total, limit, offset };
  }
}
