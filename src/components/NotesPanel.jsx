import { formatDate } from "../utils/calendarHelper.js";
 

export default function NotesPanel({
  draft, savedNotes,
  onDraftChange, onSaveNote, onDeleteNote,
  rangeStart, rangeEnd,
}) {
 
  const rangeLabel =
    rangeStart && rangeEnd
      ? `${formatDate(rangeStart)} → ${formatDate(rangeEnd)}`
      : rangeStart
      ? `From ${formatDate(rangeStart)}`
      : null;


 
  return (
    <div className="p-4 flex flex-col gap-3 border-t sm:border-t-0 sm:border-r border-gray-200 h-full">
 
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
        Notes
      </p>
 
      {/* ── Saved notes list ── */}
      {savedNotes.length > 0 && (
        <ul className="flex flex-col gap-2 max-h-36 overflow-y-auto">
          {savedNotes.map((note) => (
            <li
              key={note.id}
              className="flex items-start justify-between gap-1 bg-gray-50 rounded p-2 text-xs text-gray-700"
            >
              <div className="flex flex-col gap-0.5">
                <span>{note.text}</span>
                {/* Show the date range this note was attached to */}
                {note.start && (
                  <span className="text-blue-400">
                    {formatDate(new Date(note.start))}
                    {note.end ? ` → ${formatDate(new Date(note.end))}` : ""}
                  </span>
                )}
              </div>
 
              {/* Delete button */}
              <button
                onClick={() => onDeleteNote(note.id)}
                className="text-gray-300 hover:text-red-400 font-bold shrink-0"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
 
      {rangeLabel && (
        <p className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
          📅 {rangeLabel}
        </p>
      )}
 
      {/* ── Draft textarea ── */}
      <textarea
        value={draft}
        onChange={(e) => onDraftChange(e.target.value)}
        placeholder="Type a note, then click Save..."
        className="w-full min-h-[80px] resize-none border border-gray-200 rounded p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder:text-gray-300"
      />
 
 
      <button
        onClick={onSaveNote}
        disabled={!draft.trim()}
        className="w-full py-1.5 rounded bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        Save Note
      </button>
      {/* <button
        onClick={deleteNotes}
        className="w-full py-1.5 rounded bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        Delete All Notes
      </button> */}
 
    </div>
  );
}