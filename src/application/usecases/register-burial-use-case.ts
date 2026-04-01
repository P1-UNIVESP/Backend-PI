import { prisma } from '../../lib/prisma';
//importe aqui o nome da classe do validator
import { RegisterBurialRequest } from '../../infra/validators/register-burial-schema';
import { AppError } from '../../infra/errors/app-error';

export class RegisterBurialUseCase {
  async execute(data: RegisterBurialRequest) {

    const plot = await prisma.plot.findUnique({
      where: { id: data.plotId }
    });

    if (!plot) {
      throw new AppError("Jazigo não encontrado.");
    }

    if (plot.status !== 'DISPONIVEL') {
      throw new AppError("Este jazigo não está disponível para novos sepultamentos no momento.");
    }


    const burial = await prisma.$transaction(async (tx) => {
      const deceased = await tx.deceased.create({
        data: {
          name: data.deceased.name,
          birthDate: data.deceased.birthDate,
          deathDate: data.deceased.deathDate,
          deathCertificateNumber: data.deceased.deathCertificateNumber
        }
      });


      const newBurial = await tx.burial.create({
        data: {
          dateTime: data.dateTime,
          plotId: data.plotId,
          deceasedId: deceased.id,
        }
      });


      await tx.plot.update({
        where: { id: data.plotId },
        data: { status: 'OCUPADO' }
      });

      return newBurial;
    });

    return burial;
  }
}