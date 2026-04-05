import { prisma } from "../../../lib/prisma";
import { AppError } from "../../../infra/errors/app-error";

type UpdateDeceasedUseCaseRequest = {
  id: string;
  name?: string;
  birthDate?: Date;
  deathDate?: Date;
  deathCertificate?: string;
};

export class UpdateDeceasedUseCase {
  async execute({
    id,
    name,
    birthDate,
    deathDate,
    deathCertificate,
  }: UpdateDeceasedUseCaseRequest) {
    const deceased = await prisma.deceased.findUnique({
      where: { id },
    });

    if (!deceased) {
      throw new AppError("Falecido nao encontrado", 404);
    }

    const nextBirthDate = birthDate ?? deceased.birthDate;
    const nextDeathDate = deathDate ?? deceased.deathDate;

    if (nextBirthDate.getTime() > nextDeathDate.getTime()) {
      throw new AppError("Data de nascimento nao pode ser maior que data de obito", 400);
    }

    if (nextDeathDate.getTime() > Date.now()) {
      throw new AppError("Data de obito nao pode ser no futuro", 400);
    }

    const normalizedCertificate = deathCertificate?.trim();

    if (normalizedCertificate && normalizedCertificate !== deceased.deathCertificate) {
      const deceasedWithSameCertificate = await prisma.deceased.findUnique({
        where: { deathCertificate: normalizedCertificate },
      });

      if (deceasedWithSameCertificate) {
        throw new AppError("Ja existe falecido com este atestado de obito", 409);
      }
    }

    const updatedDeceased = await prisma.deceased.update({
      where: { id },
      data: {
        name: name?.trim(),
        birthDate,
        deathDate,
        deathCertificate: normalizedCertificate,
      },
    });

    return updatedDeceased;
  }
}
