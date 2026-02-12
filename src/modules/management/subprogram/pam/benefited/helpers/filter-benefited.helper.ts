import { FilterBenefitedDto } from '../dto';
import { parseDate } from '../../../../../../common/helpers';

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
    age,
    age_min,
    age_max,
    ...pagination
  } = dto;

  const where: any = { deleted_at: null };

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

  const today = new Date();

  if (age) {
    const maxDate = new Date(
      today.getFullYear() - Number(age),
      today.getMonth(),
      today.getDate() + 1,
    );

    const minDate = new Date(
      today.getFullYear() - Number(age) - 1,
      today.getMonth(),
      today.getDate() + 1,
    );

    where.birthday = {
      gte: minDate,
      lt: maxDate,
    };
  }

  if (age_min || age_max) {
    let gte;
    let lte;

    if (age_max) {
      gte = new Date(
        today.getFullYear() - Number(age_max) - 1,
        today.getMonth(),
        today.getDate() + 1,
      );
    }

    if (age_min) {
      lte = new Date(
        today.getFullYear() - Number(age_min),
        today.getMonth(),
        today.getDate(),
      );
    }

    where.birthday = {
      ...(gte && { gte }),
      ...(lte && { lte }),
    };
  }

  if (birthday) {
    const date = parseDate(birthday);

    const month = date.getUTCMonth();
    const day = date.getUTCDate();

    const ranges: any[] = [];

    for (let year = 1900; year <= 2100; year++) {
      const start = new Date(Date.UTC(year, month, day, 0, 0, 0));
      const end = new Date(Date.UTC(year, month, day, 23, 59, 59));

      ranges.push({
        birthday: {
          gte: start,
          lte: end,
        },
      });
    }

    where.OR = [...(where.OR || []), ...ranges];
  }
  if (month) {
    const m = Number(month) - 1;
    const ranges: any[] = [];

    for (let year = 1900; year <= 2100; year++) {
      const start = new Date(Date.UTC(year, m, 1, 0, 0, 0));
      const end = new Date(Date.UTC(year, m + 1, 0, 23, 59, 59)); // último día del mes

      ranges.push({
        birthday: {
          gte: start,
          lte: end,
        },
      });
    }

    where.AND = [...(where.AND || []), { OR: ranges }];
  }
  return {
    where,
    pagination: { ...pagination },
  };
}
