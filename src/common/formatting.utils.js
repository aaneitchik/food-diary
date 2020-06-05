const intlFormatter = new Intl.DateTimeFormat('ru-RU', {
  month: 'long',
  day: 'numeric',
});

// Convert to a readable date, like May 16
export const toLocaleDate = seconds => {
  return intlFormatter.format(new Date(seconds * 1000));
};
