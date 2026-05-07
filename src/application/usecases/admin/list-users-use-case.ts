import { prisma } from "../../../lib/prisma";

type ListUsersUseCaseRequest = {
  limit: number;
  offset: number;
  q?: string;
  role?: "user" | "admin";
};

export class ListUsersUseCase {
  async execute({ limit, offset, q, role }: ListUsersUseCaseRequest) {
    const where = {
      ...(role ? { role } : {}),
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" as const } },
              { email: { contains: q, mode: "insensitive" as const } },
            ],
          }
        : {}),
    };

    const [users, total] = await prisma.$transaction([
      prisma.user.findMany({
        where,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          emailVerified: true,
          image: true,
          role: true,
          banned: true,
          banReason: true,
          banExpires: true,
          createdAt: true,
          updatedAt: true,
        },
        take: limit,
        skip: offset,
      }),
      prisma.user.count({ where }),
    ]);

    return { data: users, total, limit, offset };
  }
}
