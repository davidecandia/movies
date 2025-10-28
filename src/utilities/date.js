import { parseISO, format, differenceInCalendarDays } from "date-fns";
import itLocale from "date-fns/locale/it";

export const parseDateString = (value) => {
  if (!value) return null;

  try {
    const parsed = parseISO(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  } catch (error) {
    return null;
  }
};

export const formatAsItalianDate = (value, pattern = "dd MMM yyyy") => {
  const date = parseDateString(value);
  if (!date) return undefined;

  try {
    return format(date, pattern, { locale: itLocale });
  } catch (error) {
    return undefined;
  }
};

export const daysUntilDate = (value, baseDate = new Date()) => {
  const date = parseDateString(value);
  if (!date) return null;

  return differenceInCalendarDays(date, baseDate);
};
