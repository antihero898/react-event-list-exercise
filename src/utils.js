export const NOOP = () => {};
export const EMPTY_ARRAY = [];
export const EMPTY_OBJECT = {};

export const sortByCompanyName = (
  itemA = EMPTY_OBJECT,
  itemB = EMPTY_OBJECT
) => {
  const { company: companyA } = itemA;
  const { company: companyB } = itemB;

  const companyALower = companyA?.toLowerCase();
  const companyBLower = companyB?.toLowerCase();

  if (companyALower < companyBLower) {
    return -1;
  }

  if (companyALower > companyBLower) {
    return 1;
  }

  return 0;
};

export default {
  NOOP,
  EMPTY_ARRAY,
  EMPTY_OBJECT,
  sortByCompanyName
};
