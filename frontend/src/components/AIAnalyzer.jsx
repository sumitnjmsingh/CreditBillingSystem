import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import {
  Bot,
  Sparkles,
  Copy,
  RefreshCw,
  Download,
  AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";

export default function AIAnalyzer() {
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeLogs = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("http://localhost:9000/aiAnalysis");

      setAnalysis(response.data.analysis);
    } catch (err) {
      setError("Unable to analyze logs.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(analysis);
    toast.success("Copied to clipboard.");
  };

  const downloadAnalysis = () => {
    const blob = new Blob([analysis], {
      type: "text/plain",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "AI_Log_Analysis.txt";

    link.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}

      <div className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-8 py-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3">
              <Bot size={42} />
              AI Log Analyzer
            </h1>

            <p className="mt-2 text-indigo-100">
              Analyze backend logs intelligently using Gemini AI
            </p>
          </div>

          <button
            onClick={analyzeLogs}
            disabled={loading}
            className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition flex items-center gap-2 shadow"
          >
            {loading ? (
              <>
                <RefreshCw className="animate-spin" size={18} />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Analyze Logs
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main */}

      <div className="max-w-7xl mx-auto p-8">
        {error && (
          <div className="bg-red-100 text-red-700 rounded-lg p-4 mb-6 flex items-center gap-3">
            <AlertTriangle />

            {error}
          </div>
        )}

        {!loading && analysis === "" && (
          <div className="bg-white rounded-xl shadow-lg p-16 text-center">
            <Bot size={80} className="mx-auto text-indigo-600" />

            <h2 className="text-3xl font-bold mt-6">AI Log Analysis</h2>

            <p className="text-gray-500 mt-3">
              Click the Analyze Logs button to inspect the latest application
              logs.
            </p>
          </div>
        )}

        {loading && (
          <div className="bg-white rounded-xl shadow-lg p-20 text-center">
            <RefreshCw
              className="animate-spin mx-auto text-indigo-600"
              size={70}
            />

            <h2 className="text-3xl font-bold mt-6">
              Gemini is analyzing your logs...
            </h2>

            <p className="text-gray-500 mt-3">
              Finding root causes, severity, and possible fixes.
            </p>
          </div>
        )}

        {!loading && analysis && (
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Toolbar */}

            <div className="bg-slate-50 border-b px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Bot className="text-indigo-600" />

                <h2 className="font-bold text-2xl">Gemini Analysis</h2>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
                >
                  <Copy size={18} />
                  Copy
                </button>

                <button
                  onClick={downloadAnalysis}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  <Download size={18} />
                  Download
                </button>
              </div>
            </div>

            {/* Response */}

            <div className="p-8">
              <div
                className="
                prose
                prose-lg
                max-w-none
                prose-headings:text-indigo-700
                prose-code:bg-gray-100
                prose-code:px-1
                prose-code:rounded
                prose-pre:bg-slate-900
                prose-pre:text-white
              "
              >
                <ReactMarkdown>{analysis}</ReactMarkdown>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
