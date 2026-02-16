import React from "react";
import { FaFilePdf, FaFileExcel, FaFileCsv } from "react-icons/fa";

export default function DownloadReports() {
  return (
    <div className="download-card">
      <h3 className="download-title">Download Reports</h3>

      <div className="download-buttons">
        <button className="btn pdf">
          <FaFilePdf />
          Download PDF
        </button>

        <button className="btn excel">
          <FaFileExcel />
          Export Excel
        </button>

        <button className="btn csv">
          <FaFileCsv />
          Generate CSV
        </button>
      </div>

      <style>{`
        .download-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 20px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .download-title {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 20px;
        }

        .download-buttons {
          display: flex;
          gap: 20px;
        }

        .btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 10px;
          border: none;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        /* PDF */
        .pdf {
          background: #fee2e2;
          color: #dc2626;
        }

        .pdf:hover {
          background: #fecaca;
        }

        /* Excel */
        .excel {
          background: #dcfce7;
          color: #16a34a;
        }

        .excel:hover {
          background: #bbf7d0;
        }

        /* CSV */
        .csv {
          background: #dbeafe;
          color: #2563eb;
        }

        .csv:hover {
          background: #bfdbfe;
        }
      `}</style>
    </div>
  );
}
