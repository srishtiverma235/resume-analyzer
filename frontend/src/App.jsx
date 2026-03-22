import { useState } from "react";
import { motion } from "framer-motion";

function App() {

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please upload a file first");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      alert("Resume uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Error uploading file");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-purple-900 flex items-center justify-center relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute w-72 h-72 bg-blue-500/20 rounded-full top-10 left-10 blur-3xl animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-purple-500/20 rounded-full bottom-10 right-10 blur-3xl animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-6 w-full max-w-xl z-10"
      >
        
        {/* Heading */}
        <h1 className="text-5xl font-bold text-white mb-4">
          AI Resume Analyzer 🚀
        </h1>

        <p className="text-gray-300 text-lg mb-8">
          Get your ATS score & improve your resume instantly
        </p>

        {/* Upload Box */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="border-2 border-dashed border-gray-500 p-10 rounded-2xl bg-white/10 backdrop-blur-lg shadow-xl"
        >
          
          <p className="text-gray-200 mb-4">
            Drag & drop your resume here
          </p>

          <input 
            type="file" 
            accept=".pdf"
            onChange={handleFileChange}
            className="mb-4 text-white"
          />

          {/* Show file name */}
          {file && (
            <p className="text-green-400 mb-4">
              Uploaded: {file.name}
            </p>
          )}

          {/* ✅ THIS IS YOUR BUTTON */}
          <motion.button 
            onClick={handleUpload}
            whileTap={{ scale: 0.9 }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Upload Resume
          </motion.button>

        </motion.div>

      </motion.div>

    </div>
  );
}

export default App;