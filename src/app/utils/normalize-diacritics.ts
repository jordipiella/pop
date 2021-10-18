
/**
 *  Normalize diacritics characters from string
 * */
export const normalizeDiacritics = (value: string): string => {
  if (!value) return '';
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}
