export const formatDate = date => {
  if (!date) {
    return 'undefined';
  }
  return new Intl.DateTimeFormat('ee-EE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date));
};

export const formatPrice = number => {
  return new Intl.NumberFormat('et-EE', {
    style: 'currency',
    currency: 'EUR',
  }).format(number);
};

export const renameProp = (
  oldProp,
  newProp,
  { [oldProp]: old, ...others }
) => ({
  [newProp]: old,
  ...others,
});
