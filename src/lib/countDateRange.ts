export default function countDateRange(fromDate: Date, toDate: Date): number {
  //@ts-ignore
  const diffTime = Math.abs(fromDate - toDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}
