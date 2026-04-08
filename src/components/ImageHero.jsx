import { MONTH_IMAGES, MONTH_NAMES } from "../constants/calendarData.js";


export default function ImageHero({ year, month, onPrev, onNext }) {
  return (
    <div className="relative w-full h-52 sm:h-72 overflow-hidden">

      
      <img
        src={MONTH_IMAGES[month]}
        alt={MONTH_NAMES[month]}
        className="w-full h-full object-cover transition-all duration-500"
      />

   
      <div className="absolute bottom-0 right-0 bg-blue-600 text-white px-6 py-3 text-right">
        <p className="text-sm font-semibold tracking-widest opacity-80">{year}</p>
        <p className="text-2xl font-bold tracking-wider uppercase">
          {MONTH_NAMES[month]}
        </p>
      </div>

     
      <button
        onClick={onPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-12 h-12 flex items-center justify-center shadow text-gray-700 text-lg font-bold transition"
      >
        ‹
      </button>

    
      <button
        onClick={onNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-12 h-12 flex items-center justify-center shadow text-gray-700 text-lg font-bold transition"
      >
        ›
      </button>

    </div>
  );
}
