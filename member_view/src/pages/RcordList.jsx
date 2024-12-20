import React from "react";
import { useNavigate } from "react-router-dom";

function RecordList() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Record List</h1>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Back to Members
        </button>
      </div>
      {/* Add your record list content here */}
      <div>Record List Content</div>
    </div>
  );
}

export default RecordList;
