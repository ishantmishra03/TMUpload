import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const FileList = () => {
  const { axios, navigate } = useAppContext();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const { data } = await axios.get("/api/file/list");
        if (data.success) {
          setFiles(data.uploads);
        } else {
          toast.error("Failed to load files.");
        }
      } catch (error) {
        toast.error(error.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [axios]);

  return (
    <main className="bg-gradient-to-br from-[#2e3a4c] to-[#1a2533] text-white min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-4xl bg-[#233142] border border-[#37475c] rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-orbitron font-bold text-center mb-6">
          Uploaded Files
        </h1>
        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : files.length === 0 ? (
          <p className="text-center text-gray-400">No files uploaded yet.</p>
        ) : (
          <div className="space-y-4">
            {files.map((file) => (
              <div
                key={file.filename}
                className="flex justify-between items-center bg-[#2d3b4f] border border-[#3a4b62] rounded-lg p-4"
              >
                <div>
                  <p onClick={() => navigate(`/f/${file._id}`)} className="text-lg font-semibold">{file.filename}</p>
                  <a
                    href= {`${import.meta.env.VITE_FRONTEND_URL}/f/${file._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-yellow-400 hover:underline"
                  >
                    {`${import.meta.env.VITE_FRONTEND_URL}/f/${file._id}`}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default FileList;
