import { useState } from "react";
import axios from "axios";

const UploadPage = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);

    const formData = new FormData();
    for (let file of files) {
      formData.append("videos", file);
    }

    try {
      await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Videos uploaded successfully.");
      setFiles([]);
    } catch (error) {
      console.warn("Upload failed", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="app-shell upload-shell">
      <section className="hero-section upload-hero">
        <div className="hero-copy">
          <span className="eyebrow">Upload your content</span>
          <h2>Bring new videos to the carousel and keep your audience engaged.</h2>
          <p>Select one or more clips to upload and make them available inside the Socially Approved player.</p>
        </div>
      </section>

      <section className="upload-panel">
        <div className="upload-card">
          <label className="file-input-label">
            <span>Select videos</span>
            <input
              type="file"
              multiple
              accept="video/*"
              onChange={(e) => setFiles(e.target.files)}
            />
          </label>

          <div className="upload-info">
            <p>{files.length === 0 ? "No files selected yet." : `${files.length} file(s) ready to upload.`}</p>
            {files.length > 0 && (
              <ul className="file-list">
                {Array.from(files).map((file) => (
                  <li key={file.name}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>

          <button
            className="btn btn-primary"
            type="button"
            onClick={handleUpload}
            disabled={uploading || files.length === 0}
          >
            {uploading ? "Uploading..." : "Upload Videos"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default UploadPage;
