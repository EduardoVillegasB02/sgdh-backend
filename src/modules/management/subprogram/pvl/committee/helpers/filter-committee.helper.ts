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
    coordinator_age_min,
    coordinator_age_max,
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
  if (coordinator_age_min || coordinator_age_max) {
    const now = timezoneHelper();
    where.coordinator = where.coordinator || {};
    if (coordinator_age_min)
      where.coordinator.birthday = {
        ...(where.coordinator.birthday || {}),
        lte: new Date(
          now.getFullYear() - Number(coordinator_age_min),
          now.getMonth(),
          now.getDate(),
        ),
      };
    if (coordinator_age_max)
      where.coordinator.birthday = {
        ...(where.coordinator.birthday || {}),
        gte: new Date(
          now.getFullYear() - Number(coordinator_age_max) - 1,
          now.getMonth(),
          now.getDate() + 1,
        ),
      };
  }
  return {
    where,
    pagination: {
      ...pagination,
    },
  };
}
