import { FilterCommitteeDto } from '../dto';
import { timezoneHelper } from '../../../../../../common/helpers';

export function filterCommitte(dto: FilterCommitteeDto): any {
  const {
    search,
    route,
    coordinator_id,
    couple_id,
    town_id,
    beneficiaries_min,
    beneficiaries_max,
    age_max,
    age_min,
    birthday,
    month,
    age,
    ...pagination
  } = dto;
  const where: any = {
    deleted_at: null,
  };
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { code: { contains: search, mode: 'insensitive' } },
      {
        coordinator: {
          dni: { contains: search },
        },
      },
      {
        coordinator: {
          name: { contains: search, mode: 'insensitive' },
        },
      },
      {
        coordinator: {
          lastname: { contains: search, mode: 'insensitive' },
        },
      },
    ];
  }
  if (route) where.route = route;
  if (coordinator_id) where.coordinator_id = coordinator_id;
  if (couple_id) where.couple_id = couple_id;
  if (town_id) where.town_id = town_id;
  if (beneficiaries_min || beneficiaries_max) {
    where.beneficiaries = {
      ...(beneficiaries_min && { gte: Number(beneficiaries_min) }),
      ...(beneficiaries_max && { lte: Number(beneficiaries_max) }),
    };
  }

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

    where.coordinator = {
      ...(where.coordinator || {}),
      birthday: {
        gte: minDate,
        lt: maxDate,
      },
    };
  }
  if (age_min || age_max) {
    let gte: any;
    let lte: any;

    if (age_max)
      gte = new Date(
        today.getFullYear() - Number(age_max) - 1,
        today.getMonth(),
        today.getDate() + 1,
      );

    if (age_min)
      lte = new Date(
        today.getFullYear() - Number(age_min),
        today.getMonth(),
        today.getDate(),
      );

    where.coordinator = {
      ...(where.coordinator || {}),
      birthday: {
        ...(gte && { gte }),
        ...(lte && { lte }),
      },
    };
  }
  if (birthday) {
    const [monthStr, dayStr] = birthday.split('-');

    const m = Number(monthStr) - 1;
    const d = Number(dayStr);

    const ranges: any[] = [];

    for (let year = 1900; year <= 2100; year++) {
      ranges.push({
        coordinator: {
          birthday: {
            gte: new Date(Date.UTC(year, m, d, 0, 0, 0)),
            lte: new Date(Date.UTC(year, m, d, 23, 59, 59)),
          },
        },
      });
    }

    where.AND = [...(where.AND || []), { OR: ranges }];
  }
  if (month) {
    const m = Number(month);
    const ranges: any[] = [];

    for (let year = 1900; year <= 2100; year++) {
      ranges.push({
        coordinator: {
          birthday: {
            gte: new Date(Date.UTC(year, m - 1, 1)),
            lt: new Date(Date.UTC(year, m, 1)),
          },
        },
      });
    }

    where.AND = [...(where.AND || []), { OR: ranges }];
  }
  return {
    where,
    pagination,
  };
}
