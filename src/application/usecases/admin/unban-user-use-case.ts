import { prisma } from "../../../lib/prisma";
import { AppError } from "../../../infra/errors/app-error";

type UnbanUserUseCaseRequest = {
  id: string;
};

export class UnbanUserUseCase {
  async execute({ id }: UnbanUserUseCaseRequest) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new AppError("Usuario nao encontrado", 404);
    }

    const unbannedUser = await prisma.user.update({
      where: { id },
      data: {
        banned: false,
        banReason: null,
        banExpires: null,
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

    return unbannedUser;
  }
}
