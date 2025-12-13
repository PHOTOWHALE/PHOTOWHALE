import { format } from 'date-fns';

export const getCurrentTimestamp = (): string => {
  return format(new Date(), 'yy MM dd');
};
