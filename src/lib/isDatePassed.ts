export default function isDatePassed(
  date: string | Date,
  isTodayCounted?: boolean
): boolean {
  const inputDate = new Date(date);
  const today = new Date();

  // Set time to midnight for comparison
  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  if (isTodayCounted) {
    return inputDate <= today;
  } else {
    return inputDate < today;
  }
}
