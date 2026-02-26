import React, { useState } from "react";

const DEMO_EXTERNEES = [
  {
    id: 1,
    name: "Rajesh Kumar",
    permanent_address: "Flat 402, Shivajinagar, Pune",
    section: "56",
    period_from: "2026-02-01",
    period_till: "2026-08-01",
    stay_address: "House No. 12, Pimpri, Pune",
    photo: "https://via.placeholder.com/50",
    status: "Active"
  },
  {
    id: 2,
    name: "Vijay Patil",
    permanent_address: "Sector 2, Wakad, Pune",
    section: "55",
    period_from: "2025-12-01",
    period_till: "2026-03-01",
    stay_address: "Village Chakan, Dist. Pune",
    photo: "https://via.placeholder.com/50",
    status: "Active"
  }
];

export default function StationAdminPreview() {
  const [records, setRecords] = useState(DEMO_EXTERNEES);

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0B3D91]">Station Admin Tracking</h1>
          <p className="text-gray-500">Monitoring Externment Orders for Wakad Police Station</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
          <span className="text-sm font-medium text-gray-600">Active Records: </span>
          <span className="text-lg font-bold text-[#0B3D91]">{records.length}</span>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-600">
          <p className="text-sm text-gray-500 uppercase font-bold">Section 55</p>
          <p className="text-2xl font-black text-gray-800">
            {records.filter(r => r.section === "55").length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
          <p className="text-sm text-gray-500 uppercase font-bold">Section 56</p>
          <p className="text-2xl font-black text-gray-800">
            {records.filter(r => r.section === "56").length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-600">
          <p className="text-sm text-gray-500 uppercase font-bold">Section 57</p>
          <p className="text-2xl font-black text-gray-800">
            {records.filter(r => r.section === "57").length}
          </p>
        </div>
      </div>

      {/* Main Tracking Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0B3D91] text-white">
              <th className="p-4 font-semibold uppercase text-xs">Photo</th>
              <th className="p-4 font-semibold uppercase text-xs">Externee Details</th>
              <th className="p-4 font-semibold uppercase text-xs">Legal Section</th>
              <th className="p-4 font-semibold uppercase text-xs">Period</th>
              <th className="p-4 font-semibold uppercase text-xs">Residence During Externment</th>
              <th className="p-4 font-semibold uppercase text-xs text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {records.map((person) => (
              <tr key={person.id} className="hover:bg-blue-50/50 transition-colors">
                <td className="p-4">
                  <img src={person.photo} alt="Profile" className="w-12 h-12 rounded-full border-2 border-gray-200" />
                </td>
                <td className="p-4">
                  <p className="font-bold text-gray-800">{person.name}</p>
                  <p className="text-xs text-gray-500 truncate w-48">{person.permanent_address}</p>
                </td>
                <td className="p-4">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                    Section {person.section}
                  </span>
                </td>
                <td className="p-4">
                  <p className="text-xs font-medium text-gray-700">From: {person.period_from}</p>
                  <p className="text-xs font-medium text-red-600">Till: {person.period_till}</p>
                </td>
                <td className="p-4">
                  <p className="text-xs text-gray-600 italic bg-gray-50 p-2 rounded border">
                    {person.stay_address}
                  </p>
                </td>
                <td className="p-4 text-center">
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold ring-1 ring-green-200">
                    {person.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}