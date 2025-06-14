import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Download, FileText } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const File = () => {
  const { id } = useParams();
  const { axios } = useAppContext();
  const [file, setFile] = useState(null);

  const fetchFileData = async () => {
    try {
      const { data } = await axios.post(`/api/file/get`, { id });
      if (data.success) {
        setFile(data.file);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(`/api/file/download/${file._id}`, {
        responseType: "blob", 
      });

      const blob = new Blob([response.data], { type: file.mimetype });
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = downloadUrl;
      a.download = file.filename; // Use original filename
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download error:", error.message);
      toast.error("Failed to download file");
    }
  };

  useEffect(() => {
    fetchFileData();
  }, []);

  if (!file)
    return (
      <div className="fixed inset-0 bg-blue-600 flex items-center justify-center z-50">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <main className="bg-gradient-to-br from-[#2e3a4c] to-[#1a2533] text-white min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-[#233142] border border-[#37475c] rounded-xl shadow-2xl p-8 text-center font-inter">
        <div className="flex flex-col items-center gap-4">
          <FileText size={48} className="text-yellow-400" />
          <h3 className="text-xl font-semibold">{file.filename}</h3>
          <p className="text-sm text-gray-400">
            Size: {(file.size / (1024 * 1024)).toFixed(2)} MB
          </p>
          <p className="text-sm text-gray-400">
            Expires at: {new Date(file.expiresAt).toLocaleString()}
          </p>

          <button
            onClick={handleDownload}
            className="mt-6 inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-8 py-2 rounded-full transition cursor-pointer"
          >
            <Download size={18} />
            Download
          </button>
        </div>
      </div>
    </main>
  );
};

export default File;
