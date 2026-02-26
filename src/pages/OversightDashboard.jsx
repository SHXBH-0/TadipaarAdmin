// src/pages/OversightDashboard.jsx
import React, { useState } from "react";
import { AREA_DEMARCATION } from "../utils/areaDemarcation";

// Demo Data for High-Level Oversight
const OVERSIGHT_DATA = [
  { id: 1, name: "Rahul More", section: "56", station: "Pimpri PS", division: "ACP PIMPRI", zone: "ZONE 1", photoMissingDays: 5, lastLocation: "Inside Restricted Zone" },
  { id: 2, name: "Amol Shinde", section: "55", station: "Wakad PS", division: "ACP WAKAD", zone: "ZONE 2", photoMissingDays: 0, lastLocation: "Safe Area" },
];

export default function OversightDashboard() {
  const user = JSON.parse(localStorage.getItem("user")); // Role: DCP, ACP, or CP
  const [filterZone, setFilterZone] = useState(user?.zone || "All");

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="bg-[#0B3D91] p-6 rounded-2xl text-white mb-6">
        <h1 className="text-xl font-bold uppercase tracking-wider">{user?.role} Oversight Dashboard</h1>
        <p className="text-blue-200 text-sm">Jurisdiction: {user?.zone || "Entire Pimpri-Chinchwad"}</p>
      </div>

      {/* Point 1 & 2: List of Externees and Sections */}
      <div className="space-y-4">
        {OVERSIGHT_DATA.filter(d => filterZone === "All" || d.zone === filterZone).map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
            {/* Alert Badge for Point 4: Entered in our area */}
            {item.lastLocation.includes("Restricted") && (
              <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl animate-pulse">
                ZONE VIOLATION
              </div>
            )}

            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">{item.station} | {item.division}</p>
              </div>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-black italic">
                SEC {item.section}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Point 3: Photo Not Uploaded Alert */}
              <div className={`p-3 rounded-xl border ${item.photoMissingDays > 0 ? "bg-orange-50 border-orange-200" : "bg-gray-50 border-gray-100"}`}>
                <p className="text-[10px] font-bold text-gray-500 uppercase">Photo Update</p>
                <p className={`text-sm font-black ${item.photoMissingDays > 0 ? "text-orange-600" : "text-gray-400"}`}>
                  {item.photoMissingDays > 0 ? `${item.photoMissingDays} Days Overdue` : "Updated Today"}
                </p>
              </div>

              {/* Point 4: Area Entry Alert */}
              <div className={`p-3 rounded-xl border ${item.lastLocation.includes("Restricted") ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"}`}>
                <p className="text-[10px] font-bold text-gray-500 uppercase">Location Status</p>
                <p className={`text-sm font-black ${item.lastLocation.includes("Restricted") ? "text-red-600" : "text-green-600"}`}>
                  {item.lastLocation}
                </p>
              </div>
            </div>
            
            <button className="w-full mt-4 bg-gray-100 text-[#0B3D91] py-3 rounded-xl text-xs font-bold uppercase hover:bg-blue-50 transition-all">
              Initiate Action / Call Station
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}