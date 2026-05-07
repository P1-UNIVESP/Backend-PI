import { prisma } from "../../../lib/prisma";
import { AppError } from "../../../infra/errors/app-error";

type BanUserUseCaseRequest = {
  id: string;
  banReason?: string;
  banExpiresIn?: number;
};

export class BanUserUseCase {
  async execute({ id, banReason, banExpiresIn }: BanUserUseCaseRequest) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new AppError("Usuario nao encontrado", 404);
    }

    const banExpires = banExpiresIn ? new Date(Date.now() + banExpiresIn * 1000) : null;

    await prisma.session.deleteMany({
      where: { userId: id },
    });

    const bannedUser = await prisma.user.update({
      where: { id },
      data: {
        banned: true,
        banReason: banReason?.trim() ?? null,
        banExpires,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        banned: true,
        banReason: true,
        banExpires: true,
      },
    });

    return bannedUser;
  }
}
