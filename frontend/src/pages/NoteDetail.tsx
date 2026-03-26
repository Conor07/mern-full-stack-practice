import React, { useEffect, useState } from "react";
import { type Note } from "./Home";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

type NoteDetailProps = {};

const NoteDetail: React.FC<NoteDetailProps> = ({}) => {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const fetchNote = async (id: string) => {
    try {
      setLoading(true);

      const res = await api.get(`/notes/${id}`);

      setNote(res.data);
    } catch (error) {
      console.log("Failed to get note details: ", error);

      toast.error("Failed to get note details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchNote(id);
    }
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);

      toast.success("Note deleted");

      navigate("/");
    } catch (error) {
      console.log("Failed to delete note: ", error);

      toast.error("Failed to delete note");
    } finally {
    }
  };

  const handleSave = async () => {
    if (!note?.title.trim() || !note.content.trim()) {
      toast.error("Please add a Title and Content");

      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);

      toast.success("Note saves successfully");

      navigate("/");
    } catch (error) {
      console.log("Failed to save note: ", error);

      toast.error("Failed to save note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost mb-6">
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </Link>

            <button
              onClick={handleDelete}
              disabled={!id}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="size-5" />
              Delete Note
            </button>
          </div>

          {note ? (
            <div className="card bg-base-100">
              <div className="card-body">
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={note.title}
                    onChange={(e) =>
                      setNote({ ...note, title: e.target.value })
                    }
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>

                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-32 resize-none"
                    value={note.content}
                    onChange={(e) =>
                      setNote({ ...note, content: e.target.value })
                    }
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    disabled={saving}
                    onClick={handleSave}
                  >
                    {saving ? "Saving..." : "Save Note"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <h3 className="text-2xl font-bold">No note details</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
