import { FilterBenefitedDto } from '../dto';
import { parseDate } from '../../../../../../common/helpers';
import { Prisma } from '@prisma/client';

export function filterBenefited(dto: FilterBenefitedDto): any {
  const {
    search,
    country,
    depa_birth,
    depa_live,
    district,
    education,
    ethnic,
    housing,
    lang_learned,
    lang_native,
    prov_birth,
    prov_live,
    civil,
    doc_type,
    health,
    pov_level,
    house_status,
    mode,
    sex,
    birthday,
    month,
    ...pagination
  } = dto;
  const where: any = { deleted_at: null };
  const AND: any[] = [];
  if (search)
    where.OR = [
      { doc_num: { contains: search, mode: 'insensitive' } },
      { name: { contains: search, mode: 'insensitive' } },
      { lastname: { contains: search, mode: 'insensitive' } },
    ];
  if (country) where.country_id = country;
  if (depa_birth) where.department_birth_id = depa_birth;
  if (depa_live) where.department_live_id = depa_live;
  if (district) where.district_live_id = district;
  if (education) where.education_id = education;
  if (ethnic) where.ethnic_id = ethnic;
  if (housing) where.housing_id = housing;
  if (lang_learned) where.language_learned_id = lang_learned;
  if (lang_native) where.language_native_id = lang_native;
  if (prov_birth) where.province_birth_id = prov_birth;
  if (prov_live) where.province_live_id = prov_live;
  if (civil) where.civil = civil;
  if (doc_type) where.doc_type = doc_type;
  if (health) where.health = health;
  if (pov_level) where.poverty_level = pov_level;
  if (house_status) where.housing_status = house_status;
  if (mode) where.mode = mode;
  if (sex) where.sex = sex;
  if (birthday) {
    const date = parseDate(birthday);
    const m = date.getUTCMonth() + 1;
    const d = date.getUTCDate();
    AND.push(
      Prisma.sql`EXTRACT(MONTH FROM birthday) = ${m}`,
      Prisma.sql`EXTRACT(DAY FROM birthday) = ${d}`,
    );
  } else if (month)
    AND.push(Prisma.sql`EXTRACT(MONTH FROM birthday) = ${month}`);
  if (AND.length) where.AND = AND;
  return {
    where,
    pagination: { ...pagination },
  };
}
