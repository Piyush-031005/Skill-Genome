import { useState } from "react";

export default function ResumeAnalyzer() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/resume/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        alert("Backend error");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setResult(data);

    } catch (err) {
      alert("Upload failed");
    }

    setLoading(false);
  };

  return (
    <div className="p-8 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6">🚀 Resume Analyzer</h1>

      {/* Upload */}
      <input type="file" onChange={handleFileUpload} />

      {loading && <p className="mt-4">Analyzing...</p>}

      {result && (
        <div className="mt-8 space-y-6">

          {/* SCORE */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-bold">ATS Score</h2>

            <div className="w-full bg-gray-700 h-4 mt-4 rounded">
              <div
                className="bg-green-500 h-4 rounded"
                style={{ width: `${result.score || 0}%` }}
              />
            </div>

            <p className="mt-2 text-lg">{result.score}/100</p>

            <p className="text-gray-400 mt-2">
              This score shows how well your resume matches job requirements.
            </p>
          </div>

          {/* STRENGTHS */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-green-400">Strengths</h2>

            {Array.isArray(result.strengths) &&
              result.strengths.map((s: any, i: number) => (
                <div key={i} className="mt-2">
                  <p>✔ {s}</p>
                  <p className="text-gray-400 text-sm">
                    This is a strong point that improves your chances.
                  </p>
                </div>
              ))}
          </div>

          {/* MISSING */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-red-400">Missing Skills</h2>

            {Array.isArray(result.missingSkills) &&
              result.missingSkills.map((m: any, i: number) => (
                <div key={i} className="mt-2">
                  <p>⚠ {m}</p>
                  <p className="text-gray-400 text-sm">
                    Adding this skill will improve your resume ranking.
                  </p>
                </div>
              ))}
          </div>

          {/* IMPROVEMENTS */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-yellow-400">Improvements</h2>

            {Array.isArray(result.improvements) &&
              result.improvements.map((imp: any, i: number) => (
                <div key={i} className="mt-2">
                  <p>💡 {imp}</p>
                  <p className="text-gray-400 text-sm">
                    This will make your resume more professional and ATS-friendly.
                  </p>
                </div>
              ))}
          </div>

        </div>
      )}
    </div>
  );
}