export const formatDate = date => {
  return new Intl.DateTimeFormat('ee-EE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date));
};
