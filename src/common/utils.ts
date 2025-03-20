export const getPaginationSkip = (page: number, limit: number) =>
  (page - 1) * limit;
