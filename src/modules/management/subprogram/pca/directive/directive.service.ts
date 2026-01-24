import { BadRequestException, Injectable } from '@nestjs/common';
import { Directive } from '@prisma/client';
import * as xlsx from 'xlsx';
import { CreateDirectiveDto, UpdateDirectiveDto } from './dto';
import { PrismaService } from '../../../../../prisma/prisma.service';
import {
  paginationHelper,
  timezoneHelper,
  fullTimeHelper,
} from '../../../../../common/helpers';
import { SearchDto } from '../../../../../common/dto';

@Injectable()
export class DirectiveService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateDirectiveDto): Promise<Directive> {
    const Directive = await this.prisma.directive.create({
      data: {
        ...dto,
        created_at: timezoneHelper(),
        updated_at: timezoneHelper(),
      },
    });
    return await this.getDirectiveById(Directive.id);
  }

  async findAll(dto: SearchDto): Promise<any> {
    const { search, ...pagination } = dto;
    const where: any = { deleted_at: null };
    if (search) where.name = { contains: search, mode: 'insensitive' };
    return paginationHelper(
      this.prisma.directive,
      {
        where,
        orderBy: { name: 'asc' },
      },
      pagination,
    );
  }

  async findOne(id: string): Promise<Directive> {
      return await this.getDirectiveById(id);
    }

    async update(id: string, dto: UpdateDirectiveDto): Promise<Directive> {
      await this.getDirectiveById(id);
      await this.prisma.directive.update({
        data: {
          ...dto,
          updated_at: timezoneHelper(),
        },
        where: { id },
      });
      return await this.getDirectiveById(id);
    }
  
    async toggleDelete(id: string): Promise<any> {
      const Directive = await this.getDirectiveById(id, true);
      const inactive = Directive.deleted_at;
      const deleted_at = inactive ? null : timezoneHelper();
      await this.prisma.directive.update({
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

    async upload(file: Express.Multer.File) {
        const count = await this.prisma.directive.count();
        if (count > 0)
          throw new BadRequestException('Solo se puede realizar una vez');
        const workbook = xlsx.read(file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
        const data = rows.map((row: any) => {
          return {
            resolution: row.resolution,
            start_At: fullTimeHelper(row.start_At, 'start'),
            end_At: fullTimeHelper(row.end_At, 'end'),
            created_at: timezoneHelper(),
            updated_at: timezoneHelper(),
          };
        });
        await this.prisma.directive.createMany({ data });
        return { success: true };
      }
    
      private async getDirectiveById(
        id: string,
        toogle: boolean = false,
      ): Promise<any> {
        const Directive = await this.prisma.directive.findUnique({
          where: { id },
        });
        if (!Directive)
          throw new BadRequestException('Centro de acoplo no encontrado');
        if (Directive.deleted_at && !toogle)
          throw new BadRequestException('Centro de acoplo eliminado');
        return Directive;
      }
    }