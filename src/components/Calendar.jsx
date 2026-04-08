import { DAYS } from "../constants/calendarData.js";
import { getCalendarDays, sameDay, isBetween } from "../utils/calendarHelper.js";

export default function CalendarGrid({
  year, month,
  rangeStart, rangeEnd, hoverDate,
  onDayClick, onDayHover,
}) {
  const days = getCalendarDays(year, month);
  const today = new Date();
 
  const effectiveEnd = rangeStart && !rangeEnd ? hoverDate : rangeEnd;
 
  function getDayClasses(date) {
    const isStart   = sameDay(date, rangeStart);
    const isEnd     = sameDay(date, effectiveEnd);
    const inRange   = isBetween(date, rangeStart, effectiveEnd);
    const isToday   = sameDay(date, today);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
 
    let base = "w-full h-9 flex items-center justify-center text-sm rounded-full cursor-pointer transition-all duration-150 ";
 
    if (isStart || isEnd)  return base + "bg-blue-600 text-white font-bold";
    if (inRange)           return base + "bg-blue-100 text-blue-800";
    if (isToday)           return base + "border-2 border-blue-500 font-semibold text-blue-700";
    if (isWeekend)         return base + "text-blue-500 hover:bg-gray-100";
    return                        base + "text-gray-700 hover:bg-gray-100";
  }
 
  return (
    <div className="p-4">
 
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div
            key={d}
            className={`text-center text-xs font-semibold uppercase tracking-wide py-1 ${
              d === "Sat" || d === "Sun" ? "text-blue-500" : "text-gray-400"
            }`}
          >
            {d}
          </div>
        ))}
      </div>
 
      <div className="grid grid-cols-7 gap-0.5">
        {days.map((date, i) => (
          <div
            key={i}
            className="h-9"
            onClick={() => date && onDayClick(date)}
            onMouseEnter={() => date && onDayHover(date)}
            onMouseLeave={() => onDayHover(null)}
          >
            {date
              ? <div className={getDayClasses(date)}>{date.getDate()}</div>
              : <div className="h-9" />
            }
          </div>
        ))}
      </div>
 
    </div>
  );
}