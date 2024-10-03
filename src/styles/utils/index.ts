export const getCSSVariable = (variableName: string): string => {
  if (!document) return '';
  return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
};
