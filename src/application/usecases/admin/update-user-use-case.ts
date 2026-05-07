import { prisma } from "../../../lib/prisma";
import { AppError } from "../../../infra/errors/app-error";

type UpdateUserUseCaseRequest = {
  id: string;
  name?: string;
  email?: string;
  image?: string | null;
  role?: "user" | "admin";
};

export class UpdateUserUseCase {
  async execute({ id, name, email, image, role }: UpdateUserUseCaseRequest) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new AppError("Usuario nao encontrado", 404);
    }

    const normalizedEmail = email?.trim().toLowerCase();

    if (normalizedEmail && normalizedEmail !== user.email) {
      const userWithSameEmail = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });

      if (userWithSameEmail) {
        throw new AppError("Ja existe usuario com este email", 409);
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name: name?.trim(),
        email: normalizedEmail,
        image,
        role,
      },
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
    });

    return updatedUser;
  }
}
