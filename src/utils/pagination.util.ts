import { SelectQueryBuilder } from 'typeorm';

export const defaultPerPage = 20;

export const getPaginatedData = async (
  query: SelectQueryBuilder<any>,
  dataPage: string | undefined,
  perPage: number,
) => {
  const page = Number(dataPage) || 1;
  const [data, total] = await query
    .take(perPage)
    .skip(perPage * (page - 1))
    .getManyAndCount();

  const from = page === 1 ? 1 : (page - 1) * perPage + 1;
  const to = page * perPage;
  let last_page = Math.ceil(total / perPage);
  if (total === 0) last_page = 1;

  return {
    total,
    per_page: perPage,
    current_page: page,
    last_page,
    from,
    to,
    data,
  };
};
