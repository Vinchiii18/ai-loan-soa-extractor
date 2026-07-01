import { useState } from "react";
import "./UploadCard.css";

function UploadCard({ onAnalyze }) {
  const [selectedFile, setSelectedFile] = useState(null);

  function handleFileChange(event) {
    setSelectedFile(event.target.files[0]);
  }

  function handleAnalyze() {
    if (!selectedFile) {
      alert("Please choose a file first.");

      return;
    }

    onAnalyze(selectedFile);
  }

  return (
    <div className="card shadow">
      <div className="card-body">
        <h4 className="mb-3">Upload Statement</h4>

        <input
          className="form-control"
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={handleFileChange}
        />

        {selectedFile && (
          <div className="mt-2 text-success">Selected: {selectedFile.name}</div>
        )}

        <button className="btn btn-primary mt-3 w-100" onClick={handleAnalyze}>
          Analyze Document
        </button>
      </div>
    </div>
  );
}

export default UploadCard;
