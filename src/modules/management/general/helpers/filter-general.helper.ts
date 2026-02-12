import { FilterGeneralDto } from '../dto';

export function filterGeneral(dto: FilterGeneralDto): any {
  const {
    search,
    module_id,
    birthday,
    month,
    age,
    age_min,
    age_max,
    ...pagination
  } = dto;

  const where: any = { deleted_at: null };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { lastname: { contains: search, mode: 'insensitive' } },
      { dni: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (module_id) where.module_id = module_id;

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
    const parts = birthday.split('-');

  if (parts.length !== 2) return { where, pagination };

  const m = Number(parts[0]);
  const d = Number(parts[1]);

  if (isNaN(m) || isNaN(d)) return { where, pagination };

  const ranges: any[] = [];

  for (let year = 1900; year <= 2100; year++) {
    ranges.push({
      birthday: {
        gte: new Date(Date.UTC(year, m - 1, d, 0, 0, 0)),
        lte: new Date(Date.UTC(year, m - 1, d, 23, 59, 59)),
      },
    });
  }

  where.AND = [
    ...(where.AND || []),
    { OR: ranges },
  ];
}

  if (month) {
    const m = Number(month);
    const ranges: any[] = [];
    for (let year = 1900; year <= 2100; year++)
      ranges.push({
        birthday: {
          gte: new Date(Date.UTC(year, m - 1, 1)),
          lt: new Date(Date.UTC(year, m, 1)),
        },
      });
    where.AND = [
      ...(where.AND || []),
      { OR: ranges },
    ];
  }

  return {
    where,
    pagination: { ...pagination },
  };
}
