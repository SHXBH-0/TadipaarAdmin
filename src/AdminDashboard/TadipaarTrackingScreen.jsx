import React, { useEffect, useState } from "react";

export default function TadipaarTrackingScreen() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Loads live submissions from criminals
    const storedLogs = JSON.parse(localStorage.getItem("checkin_logs") || "[]");
    setLogs(storedLogs);
  }, []);

  const openInGoogleMaps = (lat, lng) => {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className="p-6 bg-[#F4F6F9] min-h-screen">
      <h1 className="text-2xl font-bold text-[#0B3D91] mb-6">Tadipaar Monitoring</h1>
      <div className="grid gap-4">
        {logs.map((log) => (
          <div key={log.id} className="bg-white rounded-xl shadow-sm border p-4 flex gap-4">
            <img src={log.image_url} alt="evidence" className="w-24 h-24 object-cover rounded-lg border" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-800 text-lg">{log.name}</p>
                  <p className="text-sm text-gray-500">Aadhaar: {log.aadhaar}</p>
                  <p className="text-sm text-gray-500 mt-1">📍 {log.latitude}, {log.longitude}</p>
                  <p className="text-sm text-gray-500">🏢 {log.police_station}</p>
                  <p className="text-sm text-gray-500 text-xs">🕒 {log.captured_at}</p>
                </div>
                <button
                  onClick={() => openInGoogleMaps(log.latitude, log.longitude)}
                  className="text-sm px-3 py-1 rounded-md border border-[#0B3D91] text-[#0B3D91] hover:bg-[#0B3D91] hover:text-white"
                >
                  View Location
                </button>
              </div>
            </div>
          </div>
        ))}
        {logs.length === 0 && <p className="text-center text-gray-500 mt-10">No check-ins recorded yet.</p>}
      </div>
    </div>
  );
} 