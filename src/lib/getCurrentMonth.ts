import months from "../const/months";

export default function getCurrentMonth() {
  const today: Date = new Date();
  const monthIndex: number = today.getMonth();

  return months[monthIndex];
}
