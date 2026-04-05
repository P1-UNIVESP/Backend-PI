import { prisma } from "../../../lib/prisma";
import { AppError } from "../../../infra/errors/app-error";

type CreateDeceasedUseCaseRequest = {
  name: string;
  birthDate: Date;
  deathDate: Date;
  deathCertificate: string;
};

export class CreateDeceasedUseCase {
  async execute({
    name,
    birthDate,
    deathDate,
    deathCertificate,
  }: CreateDeceasedUseCaseRequest) {
    if (birthDate.getTime() > deathDate.getTime()) {
      throw new AppError("Data de nascimento nao pode ser maior que data de obito", 400);
    }

    if (deathDate.getTime() > Date.now()) {
      throw new AppError("Data de obito nao pode ser no futuro", 400);
    }

    const normalizedCertificate = deathCertificate.trim();

    const deceasedWithSameCertificate = await prisma.deceased.findUnique({
      where: { deathCertificate: normalizedCertificate },
    });

    if (deceasedWithSameCertificate) {
      throw new AppError("Ja existe falecido com este atestado de obito", 409);
    }

    const deceased = await prisma.deceased.create({
      data: {
        name: name.trim(),
        birthDate,
        deathDate,
        deathCertificate: normalizedCertificate,
      },
    });

    return deceased;
  }
}
