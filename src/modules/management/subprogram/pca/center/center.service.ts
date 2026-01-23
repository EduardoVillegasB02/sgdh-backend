import { BadRequestException, Injectable } from '@nestjs/common';
import { Center, Model } from '@prisma/client';
import * as xlsx from 'xlsx';
import { CreateCenterDto, UpdateCenterDto } from './dto';
import { PrismaService } from '../../../../../prisma/prisma.service';
import {
  paginationHelper,
  timezoneHelper,
} from '../../../../../common/helpers';
import { SearchDto } from '../../../../../common/dto';

@Injectable()
export class CenterService {
    constructor(private readonly prisma: PrismaService) {}

    async create(dto: CreateCenterDto): Promise<Center> {
        const {
            latitude,
            longitude,
            members,
            members_male,
            members_female,
            ...res
        } = dto;
        const data: any = {
            ...res,
            ...(members && { members: Number(members) }),
            ...(members_male && {members_male: Number(members_male)}),
            ...(members_female && {members_female: Number(members_female)}),
            latitude: Number(latitude),
            longitude: Number(longitude),
            created_at: timezoneHelper(),
            updated_at: timezoneHelper(),
        };
        const center = await this.prisma.center.create({ data });
        return this.getCenterById(center.id);
    }

    async findAll(dto: SearchDto): Promise<any> {
        const { search, ...pagination } = dto;
        const where: any = { delete_at: null};
        if (search)
            where.OR = [{name: { contains: search, mode: 'insensitive'}}]
        return paginationHelper(
            this.prisma.center,
            {
                where,
                orderBy: { code: 'asc' },
            },
            pagination,
        );
    }

    async findOne(id: string): Promise<Center> {
        return await this.getCenterById(id);
    }

    async update(id: string, dto: UpdateCenterDto): Promise<Center> {
        await this.getCenterById(id);
        const {
            latitude,
            longitude,
            members,
            members_male,
            members_female,
            ...res
        } = dto;
        const data: any = {
            ...res,
            ...(members && { members: Number(members) }),
            ...(members_male && { members_male: Number(members_male)}),
            ...(members_female && {members_female: Number(members_female)}),
            ...(latitude && {}),                                                     /* revisar */
            update_at: timezoneHelper(),
        };
        await this.prisma.center.update({
            data,
            where: { id },
        });
        return await this.getCenterById(id);
    }

    async toggleDelete(id: string): Promise<any> {
        const center = await this.getCenterById(id, true);
        const inactive = center.deleted_at;
        const deleted_at = inactive ? null : timezoneHelper();
        await this.prisma.center.update({
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
        const count = await this.prisma.center.count();
        if (count > 0)
            throw new BadRequestException('Solo se puede realizar una vez');
        const workbook = xlsx.read(file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
        const data = rows.map((row: any) => {
            return {
                modality: String(row.modality),
                code: String(row.code),
                name: row.name,
                address: row.address ?? null,
                members: row.members ? Number(row.members) : 0,
                members_male: row.members_male ? Number(row.members_male) :0,
                members_female: row.members_female ? Number(row.members_female) :0,
                created_at: timezoneHelper(),
                updated_at: timezoneHelper(),
                deleted_at: row.state === 'Activo' ? null : timezoneHelper(),
                situation: String(row.situation),
                latitude: Number(row.latitude),
                longitude: Number(row.longitude),
                president: row.president_id,
                directive: row.directive_id
            }
        })
        const result: any = [];
        for (const d of data) {
            const presidentd = await this.prisma.president.findFirst({ where: { dni: d.president }});
            const directived = await this.prisma.directive.findFirst({ where: { resolution: d.directive}})
            if (!presidentd || !directived)
                throw new BadRequestException('No hay ID');
            const { president, directive, ...res } = d;
            result.push({
                president_id: presidentd.id,
                directive_id: directived.id,
                ...res,
            })
        }
        await this.prisma.center.createMany({ data: result });
        return { success: true};
    }

    private async getCenterById(
    id: string,
    toogle: boolean = false,
        ): Promise<any> {
    const center = await this.prisma.center.findUnique({
      where: { id },
    });
    if (!center)
      throw new BadRequestException('Centro de acoplo no encontrado');
    if (center.deleted_at && !toogle)
      throw new BadRequestException('Centro de acoplo eliminado');
    return center;
  }
}

