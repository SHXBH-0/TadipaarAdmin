import React, { useState, useEffect } from "react";
import { Camera, MapPin, User, LogOut, CheckCircle, Clock, ShieldAlert } from "lucide-react";
import toast from "react-hot-toast";

export default function CriminalDashboard() {
  // Retrieve user with safety check
  const [user] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  // Redirect if no user is found
  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]);

  // Prevent rendering if user is null to avoid evaluation errors
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <p className="text-slate-500 font-bold">Authenticating...</p>
      </div>
    );
  }

  // Load externed person data from local storage to show restrictions
  const criminals = JSON.parse(localStorage.getItem("criminals") || "[]");
  const myData = criminals.find(c => c.aadhaar === user.aadhaar) || {
    from_area: "Area data pending",
    end_date: "N/A"
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setReport(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!report) return toast.error("Please take a photo first");
    
    setLoading(true);
    
    // Get real Geolocation
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        
        // Check violation against restricted areas (mock logic)
        const areas = JSON.parse(localStorage.getItem("restrictedAreas") || "[]");
        const myArea = areas.find(a => a.name === myData.from_area);
        
        let isViolation = false;
        // Simple radius check if area center is known
        if (myArea && myArea.latitude && myArea.longitude) {
           const dist = Math.sqrt(
             Math.pow(latitude - myArea.latitude, 2) + 
             Math.pow(longitude - myArea.longitude, 2)
           );
           // Mock threshold check (approx degrees to meters)
           if (dist < 0.005) isViolation = true; 
        }

        const newLog = {
          id: Date.now(),
          name: user.name,
          aadhaar: user.aadhaar,
          image_url: report,
          latitude,
          longitude,
          police_station: user.police_station,
          is_violation: isViolation,
          captured_at: new Date().toLocaleString(),
          timestamp: new Date().toISOString()
        };

        const logs = JSON.parse(localStorage.getItem("tadipaarLogs") || "[]");
        localStorage.setItem("tadipaarLogs", JSON.stringify([newLog, ...logs]));

        setLoading(false);
        setReport(null);
        toast.success(isViolation ? "Report submitted. WARNING: You are in a restricted zone!" : "Compliance report submitted successfully!");
      },
      (err) => {
        setLoading(false);
        toast.error("Location access is mandatory for reporting.");
      }
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden mt-4">
        {/* Header */}
        <div className="bg-[#0B3D91] p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-xl">
              {user.name?.[0] || "?"}
            </div>
            <div>
              <h2 className="font-bold">{user.name}</h2>
              <p className="text-xs text-blue-200 uppercase tracking-widest font-bold">Externed Person</p>
            </div>
          </div>
          <button onClick={handleLogout} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition">
            <LogOut size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Warning Card */}
          <div className="bg-red-50 p-4 rounded-2xl border border-red-100 flex items-start gap-3">
            <ShieldAlert className="text-red-600 mt-1 shrink-0" size={20} />
            <div>
              <h4 className="text-xs font-black text-red-800 uppercase">Current Restriction</h4>
              <p className="text-sm text-red-700 mt-1">
                Restricted from entering: <strong>{myData.from_area}</strong>.
              </p>
              <p className="text-[10px] text-red-500 font-bold mt-1">Order valid until: {myData.end_date}</p>
            </div>
          </div>

          {/* Upload Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Clock size={18} className="text-[#0B3D91]"/> Daily Check-in
              </h3>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Geotagged Report</span>
            </div>

            <div className="relative">
              {!report ? (
                <label className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50 hover:bg-slate-100 cursor-pointer transition">
                  <Camera size={48} className="text-slate-300 mb-2"/>
                  <span className="text-sm font-bold text-slate-500">Take Live Selfie</span>
                  <input type="file" capture="user" accept="image/*" className="hidden" onChange={handleCapture} />
                </label>
              ) : (
                <div className="relative group">
                  <img src={report} className="w-full h-64 object-cover rounded-3xl border shadow-inner" alt="Evidence" />
                  <button onClick={() => setReport(null)} className="absolute top-3 right-3 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md">✕</button>
                </div>
              )}
            </div>

            <button 
              disabled={!report || loading} 
              onClick={handleSubmit}
              className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition shadow-lg ${report && !loading ? "bg-[#0B3D91] text-white" : "bg-slate-200 text-slate-400"}`}
            >
              {loading ? "Getting GPS..." : "Submit Geotagged Report"}
            </button>
          </div>

          {/* Details */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
             <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Identity</p>
                <p className="text-sm font-bold text-slate-700">{user.aadhaar}</p>
             </div>
             <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Police Station</p>
                <p className="text-sm font-bold text-slate-700">{user.police_station}</p>
             </div>
          </div>
        </div>
      </div>
      <p className="mt-8 text-[10px] text-slate-400 text-center max-w-[280px]">
        Geolocation and facial verification are active. Tampering with GPS coordinates will result in immediate cancellation of bail/externment conditions.
      </p>
    </div>
  );
}