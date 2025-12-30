import { format } from 'date-fns';

export const getCurrentDay = (): string => {
  return format(new Date(), 'yy MM dd');
};

export const getCurrentTime = (): string => {
  return format(new Date(), 'yy_MM_dd_HH_mm_ss');
};
