import { useState } from "react";

import Header from "./components/Header/Header";
import UploadCard from "./components/UploadCard/UploadCard";

import { analyzeLoan } from "./services/loanService";

function App() {
  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  async function handleAnalyze(file) {
    try {
      setLoading(true);

      const data = await analyzeLoan(file);

      setResult(data);
    } catch (error) {
      console.error(error);

      alert("Analysis failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-5">
      <Header />

      <UploadCard onAnalyze={handleAnalyze} />

      {loading && (
        <div className="text-center mt-4">
          <div className="spinner-border text-primary"></div>

          <p className="mt-2">Analyzing document...</p>
        </div>
      )}

      {result && (
        <pre className="mt-4 bg-light p-3 rounded">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;
