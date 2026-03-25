import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";

type HomeProps = {};

export type Note = {
  _id: number;
  title: string;
  content: string;
  createdAt: string;
};

const Home: React.FC<HomeProps> = ({}) => {
  const [isRateLimited, setIsRateLimited] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await api.get("/notes");

      if (res.data) {
        setNotes(res.data);

        setIsRateLimited(false);
      }
    } catch (error: any) {
      console.log("Error fetching notes: ", error);

      if (error.response.status === 429) {
        setIsRateLimited(true);
      } else {
        toast.error("Failed to get Notes");
        setIsRateLimited(false);
      }

      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading Notes...</div>
        )}

        {notes?.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => {
              return (
                <div className="">
                  <NoteCard key={note._id} note={note} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
