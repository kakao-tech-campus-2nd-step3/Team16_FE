export const getCurrentDateStrings = (baseDate: string) => {
  const date = new Date(baseDate);

  const plus15Days = new Date(date.getTime() + 15 * 24 * 60 * 60 * 1000);
  const minus13Days = new Date(date.getTime() - 13 * 24 * 60 * 60 * 1000);

  const formatDate = (d: Date): string => {
    return d.toISOString().slice(0, 19) + 'Z';
  };

  return {
    from: formatDate(minus13Days),
    to: formatDate(plus15Days),
  };
};
