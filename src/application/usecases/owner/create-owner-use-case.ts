import { prisma } from "../../../lib/prisma";
import { AppError } from "../../../infra/errors/app-error";

type CreateOwnerUseCaseRequest = {
  name: string;
  cpf: string;
  phone?: string;
};

export class CreateOwnerUseCase {
  async execute({ name, cpf, phone }: CreateOwnerUseCaseRequest) {
    const normalizedCpf = cpf.trim();

    const ownerWithSameCpf = await prisma.owner.findUnique({
      where: { cpf: normalizedCpf },
    });

    if (ownerWithSameCpf) {
      throw new AppError("Ja existe proprietario com este CPF", 409);
    }

    const owner = await prisma.owner.create({
      data: {
        name: name.trim(),
        cpf: normalizedCpf,
        phone: phone?.trim() || null,
      },
    });

    return owner;
  }
}
