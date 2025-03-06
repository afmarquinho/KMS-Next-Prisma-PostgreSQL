import { InvProcurementNoteType } from "@/interface";
import { MessageSquare } from "lucide-react";

type Props = {
  notes: InvProcurementNoteType[];
};

export const CommentsSection = ({ notes }: Props) => {
  return (
    <div className="flex-1 overflow-y-auto max-h-60 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 shadow-md">
      <p className={`mb-2 flex gap-2`}>
        <MessageSquare /> Comentarios
      </p>

      {notes.length < 1 ? (
        <div className={`italic font-medium text-sm`}>No hay comentarios</div>
      ) : (
        <>
          {notes.map((note) => (
            <div
              className="mb-2 p-2 bg-white dark:bg-slate-700 rounded-lg shadow"
              key={note.Note_id}
            >
              <p className="text-sm text-slate-700 dark:text-slate-200">
                {note.Note_content}
              </p>
              <div
                className={`w-full text-right text-[11px] italic flex gap-2 items-center justify-end`}
              >
                <span className={`font-medium`}>
                  {note.User.User_name} {note.User.User_surname}
                </span>
                <span>-</span>
                {note.Note_createdAt}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
