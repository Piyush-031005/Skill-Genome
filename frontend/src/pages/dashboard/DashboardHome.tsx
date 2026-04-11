import { useEffect, useState } from "react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";
import { AlertTriangle } from "lucide-react";

export default function DashboardHome() {

  const [userData, setUserData] = useState<any>(null);
  const [peerAvg, setPeerAvg] = useState<any>(null);

  // 🔥 FETCH FUNCTION (separate)
  const fetchData = async (user: any) => {

    // ✅ current user
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    let currentUserData = null;

    if (snap.exists()) {
      currentUserData = snap.data();
      setUserData(currentUserData);
    }

    // ✅ all users
    const querySnapshot = await getDocs(collection(db, "users"));

    let total = {
      dsa: 0,
      dev: 0,
      systemDesign: 0,
      projects: 0,
      problemSolving: 0,
      communication: 0,
    };

    let count = 0;

    querySnapshot.forEach((docItem) => {
      const d = docItem.data();

      // ❌ skip yourself
      if (docItem.id === user.uid) return;

      if (
        d.skills &&
        d.role === currentUserData?.role &&
        d.company === currentUserData?.company
      ) {
        total.dsa += d.skills.dsa || 0;
        total.dev += d.skills.dev || 0;
        total.systemDesign += d.skills.systemDesign || 0;
        total.projects += d.skills.projects || 0;
        total.problemSolving += d.skills.problemSolving || 0;
        total.communication += d.skills.communication || 0;
        count++;
      }
    });

    // ✅ avg calc
    if (count > 0) {
      setPeerAvg({
        dsa: total.dsa / count,
        dev: total.dev / count,
        systemDesign: total.systemDesign / count,
        projects: total.projects / count,
        problemSolving: total.problemSolving / count,
        communication: total.communication / count,
      });
    } else {
      setPeerAvg({
        dsa: 0,
        dev: 0,
        systemDesign: 0,
        projects: 0,
        problemSolving: 0,
        communication: 0,
      });
    }
  };

  // 🔥 AUTH LISTENER (FIXED)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchData(user);
      }
    });

    return () => unsubscribe();
  }, []);

  // 🔥 DATA
  const radarData = userData
    ? [
        { skill: "DSA", value: userData.skills.dsa },
        { skill: "Development", value: userData.skills.dev },
        { skill: "Projects", value: userData.skills.projects },
        { skill: "System Design", value: userData.skills.systemDesign },
        { skill: "Problem Solving", value: userData.skills.problemSolving },
      ]
    : [];

  const peerData =
    userData && peerAvg
      ? [
          { name: "DSA", you: userData.skills.dsa, peers: peerAvg.dsa },
          { name: "Dev", you: userData.skills.dev, peers: peerAvg.dev },
          { name: "Projects", you: userData.skills.projects, peers: peerAvg.projects },
          { name: "Design", you: userData.skills.systemDesign, peers: peerAvg.systemDesign },
          { name: "Solving", you: userData.skills.problemSolving, peers: peerAvg.problemSolving },
        ]
      : [];

  const progressSkills = userData
    ? [
        { name: "DSA", value: userData.skills.dsa, recommended: 80 },
        { name: "Development", value: userData.skills.dev, recommended: 70 },
        { name: "Projects", value: userData.skills.projects, recommended: 65 },
        { name: "System Design", value: userData.skills.systemDesign, recommended: 60 },
      ]
    : [];

  if (!userData) {
    return <div className="text-center mt-10 text-white">Loading...</div>;
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Your Skill Genome at a glance.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Radar */}
        <motion.div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold mb-4">Skill Radar</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" />
              <Radar dataKey="value" stroke="#22C55E" fill="#22C55E" fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Peer */}
        <motion.div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold mb-4">You vs Peers</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={peerData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} /> {/* 🔥 FIXED */}
              <Tooltip />
              <Legend />
              <Bar dataKey="you" fill="#22C55E" />
              <Bar dataKey="peers" fill="#FACC15" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

      </div>

      {/* Progress */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-semibold mb-4">Skill Progress</h3>
        {progressSkills.map((s) => (
          <div key={s.name}>
            <div className="flex justify-between text-sm">
              <span>{s.name}</span>
              <span>{s.value}% / {s.recommended}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded">
              <div className="h-full bg-green-500" style={{ width: `${s.value}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Gap */}
      <div className="bg-card border border-yellow-500 rounded-xl p-6 flex gap-3">
        <AlertTriangle className="text-yellow-400" />
        <div>
          <h3 className="font-semibold">Skill Gap: System Design</h3>
          <p className="text-sm text-muted-foreground">
            Improve backend & system design skills.
          </p>
        </div>
      </div>

    </div>
  );
}