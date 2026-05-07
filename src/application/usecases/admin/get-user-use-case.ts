import { prisma } from "../../../lib/prisma";
import { AppError } from "../../../infra/errors/app-error";

type GetUserUseCaseRequest = {
  id: string;
};

export class GetUserUseCase {
  async execute({ id }: GetUserUseCaseRequest) {
    const user = await prisma.user.findUnique({
      where: { id },
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
        sessions: {
          select: {
            id: true,
            expiresAt: true,
            createdAt: true,
            updatedAt: true,
            ipAddress: true,
            userAgent: true,
            impersonatedBy: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!user) {
      throw new AppError("Usuario nao encontrado", 404);
    }

    return user;
  }
}
