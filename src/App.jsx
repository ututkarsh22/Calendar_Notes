import { useState } from "react";
import ImageHero  from "./components/ImageHero.jsx";
import Calendar from "./components/Calendar.jsx";
import NotesPanel   from "./components/NotesPanel.jsx";


const STORAGE_KEY = "calendar_notes";

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveToStorage(notesMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notesMap));
}


export default function WallCalendar() {
  const now = new Date();

  const [year,  setYear]  = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd,   setRangeEnd]   = useState(null);
  const [hoverDate,  setHoverDate]  = useState(null);

  const [notesMap, setNotesMap] = useState(() => loadFromStorage());

  console.log("Notesmap", notesMap);

  const [draft, setDraft] = useState("");

  const monthKey   = `${year}-${month}`;
  const savedNotes = notesMap[monthKey] || [];

  console.log("Saved Notes",savedNotes);

  function handlePrevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
    clearRange();
    setDraft("");
  }

  function handleNextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
    clearRange();
    setDraft("");
  }



  function handleDayClick(date) {
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(date);
      setRangeEnd(null);
    } else {
      if (date < rangeStart) {
        setRangeEnd(rangeStart);
        setRangeStart(date);
      } else {
        setRangeEnd(date);
      }
    }
  }

  function clearRange() {
    setRangeStart(null);
    setRangeEnd(null);
  }

  function handleDraftChange(text) {
    setDraft(text);
  }

  function handleSaveNote() {
    if (!draft.trim()) return;

    const newNote = {
      id:    Date.now(),
      text:  draft.trim(),
      start: rangeStart ? rangeStart.toISOString() : null,
      end:   rangeEnd   ? rangeEnd.toISOString()   : null,
    };

    const updated = {
      ...notesMap,
      [monthKey]: [...savedNotes, newNote],
    };

    setNotesMap(updated);
    saveToStorage(updated); 
    setDraft("");
  }

  function handleDeleteNote(id) {
    const updated = {
      ...notesMap,
      [monthKey]: savedNotes.filter(n => n.id !== id),
    };
    setNotesMap(updated);
    saveToStorage(updated);
  }



  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden">


        <ImageHero
          year={year}
          month={month}
          onPrev={handlePrevMonth}
          onNext={handleNextMonth}
        />

        <div className="flex flex-col sm:flex-row">

          <div className="sm:w-1/3">
            <NotesPanel
              draft={draft}
              savedNotes={savedNotes}
              onDraftChange={handleDraftChange}
              onSaveNote={handleSaveNote}
              onDeleteNote={handleDeleteNote}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
            />
          </div>

          <div className="sm:w-2/3">
            <Calendar
              year={year}
              month={month}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              hoverDate={hoverDate}
              onDayClick={handleDayClick}
              onDayHover={setHoverDate}
            />
          </div>

        </div>

        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-t border-gray-100 text-xs text-gray-400">
          <span>
            {rangeStart && rangeEnd
              ? `Selected: ${rangeStart.toDateString()} → ${rangeEnd.toDateString()}`
              : rangeStart
              ? "Click another day to complete the range"
              : "Click a day to start selecting a range"}
          </span>
          {(rangeStart || rangeEnd) && (
            <button onClick={clearRange} className="text-blue-500 hover:text-blue-700 font-medium">
              Clear
            </button>
          )}
        </div>

      </div>
    </div>
  );
}