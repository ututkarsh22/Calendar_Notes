/** Returns an array for the grid — null for empty padding cells, Date for real days */
export function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < startOffset; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d));

  while (days.length < 42) days.push(null);

  return days;
}

/** True if two dates fall on the same calendar day */
export function sameDay(a, b) {
  if (!a || !b) return false;
  return a.toDateString() === b.toDateString();
}

/** True if date is strictly between start and end (order-independent) */
export function isBetween(date, start, end) {
  if (!date || !start || !end) return false;
  const [lo, hi] = start <= end ? [start, end] : [end, start];
  return date > lo && date < hi;
}

/** Formats a Date as "12 Jun" */
export function formatDate(d) {
  return d ? d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : null;
}
