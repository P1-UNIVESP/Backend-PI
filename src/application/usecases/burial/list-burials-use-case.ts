import { prisma } from "../../../lib/prisma";

type ListBurialsUseCaseRequest = {
  limit: number;
  offset: number;
  q?: string;
};

export class ListBurialsUseCase {
  async execute({ limit, offset, q }: ListBurialsUseCaseRequest) {
    const where = q
      ? {
          OR: [
            { deceased: { name: { contains: q, mode: "insensitive" as const } } },
            { deceased: { deathCertificate: { contains: q, mode: "insensitive" as const } } },
            { plot: { code: { contains: q, mode: "insensitive" as const } } },
          ],
        }
      : undefined;

    const [burials, total] = await prisma.$transaction([
      prisma.burial.findMany({
        where,
        include: { plot: true, deceased: true },
        orderBy: { burialDate: "desc" },
        take: limit,
        skip: offset,
      }),
      prisma.burial.count({ where }),
    ]);

    return { data: burials, total, limit, offset };
  }
}
