import React from "react";
import type { Note } from "../pages/Home";
import { Link } from "react-router";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

type NoteCardProps = {
  note: Note;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

const NoteCard: React.FC<NoteCardProps> = ({ note, setNotes }) => {
  const handleDelete = async (e: any, id: number) => {
    e.preventDefault(); // Prevent the navigation behaviour inherent in the <Link> component

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);

      setNotes((prev) => prev.filter((note) => note._id !== id));

      toast.success("Note delete successfully");
    } catch (error) {
      console.log(`Failed to delete note ${id}: `, error);

      toast.error("Failed to delete note");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>

        <p className="text-base-content/70 line-clamp-3">{note.content}</p>

        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>

          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />

            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e: any) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
