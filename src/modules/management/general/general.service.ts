import { BadRequestException, Injectable } from '@nestjs/common';
import { FilterGeneralDto } from './dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { paginationHelper, timezoneHelper } from '../../../common/helpers';
import { Send } from '@prisma/client';
import { filterGeneral } from './helpers';

@Injectable()
export class GeneralService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(dto: FilterGeneralDto): Promise<any> {
    const { where, pagination } = filterGeneral(dto);
<<<<<<< HEAD

=======
>>>>>>> c34d5f9 (feat: recipient crud filter)
    return paginationHelper(
      this.prisma.general,
      {
        where,
<<<<<<< HEAD
        orderBy: { name: 'asc' },
        include: {
          module: {
            select: {
              name: true,
            },
          },
        },
=======
        orderBy: { lastname: 'asc' },
>>>>>>> c34d5f9 (feat: recipient crud filter)
      },
      pagination,
    );
  }

  async getForMessage() {
    const today = timezoneHelper();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const general = await this.prisma.$queryRaw<any[]>`
      UPDATE initial.general
      SET send = 'PENDING'
      WHERE deleted_at IS NULL
        AND send IS NULL
        AND EXTRACT(MONTH FROM birthday) = ${month}
        AND EXTRACT(DAY FROM birthday) = ${day}
      RETURNING *
    `;
    return {
      data: general,
      count: general.length,
    };
  }

  async sendMessage(id: string, message: string) {
    const citizen = await this.getCitizenById(id);
    if (citizen.send != Send.PENDING)
      throw new BadRequestException('El mensaje ya ha sido enviado');
    await this.prisma.general.update({
      data: {
        message,
        send: Send.SENT,
        updated_at: timezoneHelper(),
      },
      where: { id },
    });
    return { success: true };
  }

  async answerMessage(id: string, answer: string) {
    const citizen = await this.getCitizenById(id);
    if (citizen.send != Send.SENT)
      throw new BadRequestException('El mensaje ya ha sido respondido');
    await this.prisma.general.update({
      data: {
        answer,
        send: Send.ANSWERED,
        updated_at: timezoneHelper(),
      },
      where: { id },
    });
    return { success: true };
  }

  private async getCitizenById(id: string) {
    const citizen = await this.prisma.general.findFirst({
      where: { id },
    });
    if (!citizen) throw new BadRequestException('Persona no encontrada');
    return citizen;
  }
}
