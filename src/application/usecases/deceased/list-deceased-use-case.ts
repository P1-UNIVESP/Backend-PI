import { prisma } from "../../../lib/prisma";

type ListDeceasedUseCaseRequest = {
  limit: number;
  offset: number;
  q?: string;
};

export class ListDeceasedUseCase {
  async execute({ limit, offset, q }: ListDeceasedUseCaseRequest) {
    const where = q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" as const } },
            { deathCertificate: { contains: q, mode: "insensitive" as const } },
          ],
        }
      : undefined;

    const [deceasedList, total] = await prisma.$transaction([
      prisma.deceased.findMany({
        where,
        include: { burial: true },
        orderBy: { deathDate: "desc" },
        take: limit,
        skip: offset,
      }),
      prisma.deceased.count({ where }),
    ]);

    return { data: deceasedList, total, limit, offset };
  }
}
