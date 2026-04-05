import { prisma } from "../../../lib/prisma";
import { AppError } from "../../../infra/errors/app-error";

type UpdateOwnerUseCaseRequest = {
  id: string;
  name?: string;
  cpf?: string;
  phone?: string | null;
};

export class UpdateOwnerUseCase {
  async execute({ id, name, cpf, phone }: UpdateOwnerUseCaseRequest) {
    const owner = await prisma.owner.findUnique({
      where: { id },
    });

    if (!owner) {
      throw new AppError("Proprietario nao encontrado", 404);
    }

    const normalizedCpf = cpf?.trim();

    if (normalizedCpf && normalizedCpf !== owner.cpf) {
      const ownerWithSameCpf = await prisma.owner.findUnique({
        where: { cpf: normalizedCpf },
      });

      if (ownerWithSameCpf) {
        throw new AppError("Ja existe proprietario com este CPF", 409);
      }
    }

    const updatedOwner = await prisma.owner.update({
      where: { id },
      data: {
        name: name?.trim(),
        cpf: normalizedCpf,
        phone: phone === undefined ? undefined : phone?.trim() || null,
      },
    });

    return updatedOwner;
  }
}
