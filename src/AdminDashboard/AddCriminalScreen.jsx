import React, { useState } from "react";

export default function AddCriminalScreen() {
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔐 Safety guard for unauthorized access
  if (!user) {
    return (
      <div className="p-6">
        <p className="text-red-600 font-bold">Unauthorized access: Please login as Station Admin.</p>
      </div>
    );
  }

  const [form, setForm] = useState({
    name: "",
    permanent_address: "",
    externment_section: "", // 55, 56, 57
    start_date: "",
    end_date: "",
    stay_address: "", // Address where externee will reside
    photo: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const existing = JSON.parse(localStorage.getItem("criminals")) || [];

    const newRecord = {
      id: Date.now(),
      ...form,
      police_station: user.police_station || "Default Station",
      created_by: user.name,
      status: "Active",
    };

    const updated = [newRecord, ...existing];
    localStorage.setItem("criminals", JSON.stringify(updated));

    // Reset form
    setForm({
      name: "",
      permanent_address: "",
      externment_section: "",
      start_date: "",
      end_date: "",
      stay_address: "",
      photo: null,
    });

    alert("Externee registered successfully for seamless tracking.");
  };

  return (
    <div className="p-6 bg-[#F4F6F9] min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-[#0B3D91] mb-2">
          Externee Registration
        </h1>
        <p className="text-gray-600 mb-6">Police Station: <span className="font-semibold">{user.police_station || "Wakad Police Station"}</span></p>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg space-y-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Name of Externee */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name of Externee</label>
              <input
                required
                placeholder="Enter full name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0B3D91] outline-none"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            {/* 2. Permanent Address */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Permanent Address</label>
              <textarea
                required
                placeholder="Enter permanent residential address"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0B3D91] outline-none"
                rows="2"
                value={form.permanent_address}
                onChange={(e) => setForm({ ...form, permanent_address: e.target.value })}
              />
            </div>

            {/* 3. Externment Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Externment Section</label>
              <select
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0B3D91] outline-none"
                value={form.externment_section}
                onChange={(e) => setForm({ ...form, externment_section: e.target.value })}
              >
                <option value="">Select Section</option>
                <option value="55">Section 55 (Gangs)</option>
                <option value="56">Section 56 (Habitual/Dangerous)</option>
                <option value="57">Section 57 (Convicts)</option>
              </select>
            </div>

            {/* 4. Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Externee Photo</label>
              <input
                type="file"
                accept="image/*"
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#0B3D91] hover:file:bg-blue-100"
                onChange={(e) => setForm({ ...form, photo: e.target.files[0]?.name })}
              />
            </div>

            {/* 5. Period: From */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Period From</label>
              <input
                required
                type="date"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0B3D91] outline-none"
                value={form.start_date}
                onChange={(e) => setForm({ ...form, start_date: e.target.value })}
              />
            </div>

            {/* 6. Period: Till */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Period Till</label>
              <input
                required
                type="date"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0B3D91] outline-none"
                value={form.end_date}
                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
              />
            </div>

            {/* 7. Residence During Externment */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address During Externment</label>
              <textarea
                required
                placeholder="Where will the externee reside during this period?"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0B3D91] outline-none"
                rows="2"
                value={form.stay_address}
                onChange={(e) => setForm({ ...form, stay_address: e.target.value })}
              />
            </div>
          </div>

          <button className="w-full bg-[#0B3D91] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#082d6b] transition-colors shadow-md">
            Register for Tracking
          </button>
        </form>
      </div>
    </div>
  );
}