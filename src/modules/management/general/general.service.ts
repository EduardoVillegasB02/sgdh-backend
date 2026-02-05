import { BadRequestException, Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';
import { FilterGeneralDto } from './dto';
import { PrismaService } from '../../../prisma/prisma.service';
import {
  paginationHelper,
  parseDate,
  timezoneHelper,
} from '../../../common/helpers';
import { Send } from '@prisma/client';

@Injectable()
export class GeneralService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(dto: FilterGeneralDto): Promise<any> {
    const { search, ...pagination } = dto;
    const where: any = { deleted_at: null };
    if (search)
      where.OR = [
        { dni: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
        { lastname: { contains: search, mode: 'insensitive' } },
      ];
    return paginationHelper(
      this.prisma.general,
      {
        where,
        orderBy: { lastname: 'asc' },
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
    if (!citizen)
      throw new BadRequestException('Persona no encontrada');
    return citizen;
  }
}
