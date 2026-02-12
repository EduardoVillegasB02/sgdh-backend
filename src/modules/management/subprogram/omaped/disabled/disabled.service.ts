import { BadRequestException, Injectable } from '@nestjs/common';
import { Disabled } from '@prisma/client';
import { CreateDisabledDto, UpdateDisabledDto } from './dto';
import { PrismaService } from '../../../../../prisma/prisma.service';
import {
  paginationHelper,
  timezoneHelper,
} from '../../../../../common/helpers';
import { SearchDto } from '../../../../../common/dto';

@Injectable()
export class DisabledService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateDisabledDto): Promise<Disabled> {
    const disabled = await this.prisma.disabled.create({
      data: {
        ...dto,
        created_at: timezoneHelper(),
        updated_at: timezoneHelper(),
      },
    });
    return await this.getDisabledById(disabled.id);
  }

  async findAll(dto: SearchDto): Promise<any> {
    const { search, ...pagination } = dto;
    const where: any = { deleted_at: null };
    if (search)
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { lastname: { contains: search, mode: 'insensitive' } },
        { doc_num: { contains: search, mode: 'insensitive' } },
      ];
    return paginationHelper(
      this.prisma.disabled,
      {
        where,
        orderBy: { lastname: 'asc' },
      },
      pagination,
    );
  }

  async findOne(id: string): Promise<Disabled> {
    return await this.getDisabledById(id);
  }

  async update(id: string, dto: UpdateDisabledDto): Promise<Disabled> {
    await this.getDisabledById(id);
    await this.prisma.disabled.update({
      data: {
        ...dto,
        updated_at: timezoneHelper(),
      },
      where: { id },
    });
    return await this.getDisabledById(id);
  }

  async toggleDelete(id: string): Promise<any> {
    const disabled = await this.getDisabledById(id, true);
    const inactive = disabled.deleted_at;
    const deleted_at = inactive ? null : timezoneHelper();
    await this.prisma.disabled.update({
      data: {
        updated_at: timezoneHelper(),
        deleted_at,
      },
      where: { id },
    });
    return {
      action: inactive ? 'Restore' : 'Delete',
      id,
    };
  }

  private async getDisabledById(
    id: string,
    toggle: boolean = false,
  ): Promise<Disabled> {
    const disabled = await this.prisma.disabled.findUnique({
      where: { id },
    });
    if (!disabled)
      throw new BadRequestException('Persona con discapacidad no encontrada');
    if (disabled.deleted_at && !toggle)
      throw new BadRequestException('Persona con discapacidad eliminada');
    return disabled;
  }
}