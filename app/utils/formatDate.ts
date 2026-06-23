export const formatDateParts = (dateString?: string) => {
  if (!dateString) return { day: '', month: '' };

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return { day: '', month: '' };

  return {
    day: date.toLocaleDateString('en-US', { day: 'numeric' }),
    month: date.toLocaleDateString('en-US', { month: 'short' }),
  };
};
