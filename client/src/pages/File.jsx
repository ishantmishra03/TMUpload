import React from "react";
import { Download, FileText } from "lucide-react";

const File = () => {
  const name = "Project_Documentation.pdf";
  const size = 5.24; // in MB
  const daysRemaining = 14;

  const handleDownload = () => {
    // Mock download logic
    alert("Downloading: " + name);
  };

  return (
    <main className="bg-gradient-to-br from-[#2e3a4c] to-[#1a2533] text-white min-h-screen  flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-[#233142] border border-[#37475c] rounded-xl shadow-2xl p-8 text-center font-inter">
        <div className="flex flex-col items-center gap-4">
          <FileText size={48} className="text-yellow-400" />
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-sm text-gray-400">
            Size: {size.toFixed(2)} MB
          </p>
          <p className="text-sm text-gray-400">
            Deleted in {daysRemaining} days
          </p>
          <button
            onClick={handleDownload}
            className="mt-6 flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-2 rounded-full transition cursor-pointer"
          >
            <Download size={18} /> Download
          </button>
        </div>
      </div>
    </main>
  );
};

export default File;
