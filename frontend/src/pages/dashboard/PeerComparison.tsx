import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";

export default function PeerComparison() {

  const [userData, setUserData] = useState<any>(null);
  const [peerAvg, setPeerAvg] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [percentile, setPercentile] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const snapshot = await getDocs(collection(db, "users"));

    let users: any[] = [];
    let total = {
      dsa: 0,
      dev: 0,
      projects: 0,
      systemDesign: 0,
      problemSolving: 0,
      communication: 0,
    };

    let count = 0;

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      users.push({ id: docSnap.id, ...data });

      if (data.skills) {
        total.dsa += data.skills.dsa || 0;
        total.dev += data.skills.dev || 0;
        total.projects += data.skills.projects || 0;
        total.systemDesign += data.skills.systemDesign || 0;
        total.problemSolving += data.skills.problemSolving || 0;
        total.communication += data.skills.communication || 0;
        count++;
      }

      if (docSnap.id === user.uid) {
        setUserData(data);
      }
    });

    // 🔥 Peer Average
    const avg = {
      dsa: Math.round(total.dsa / count),
      dev: Math.round(total.dev / count),
      projects: Math.round(total.projects / count),
      systemDesign: Math.round(total.systemDesign / count),
      problemSolving: Math.round(total.problemSolving / count),
      communication: Math.round(total.communication / count),
    };

    setPeerAvg(avg);

    // 🔥 Leaderboard Score
    const ranked = users
      .map((u) => ({
        name: u.name || "User",
        score:
          (u.skills?.dsa || 0) +
          (u.skills?.dev || 0) +
          (u.skills?.projects || 0) +
          (u.skills?.systemDesign || 0) +
          (u.skills?.problemSolving || 0) +
          (u.skills?.communication || 0),
        isYou: u.id === user.uid,
      }))
      .sort((a, b) => b.score - a.score);

    setLeaderboard(ranked);

    // 🔥 Percentile
    const yourIndex = ranked.findIndex((u) => u.isYou);
    const perc = Math.round((1 - yourIndex / ranked.length) * 100);
    setPercentile(perc);
  };

  if (!userData || !peerAvg) return <p>Loading...</p>;

  // 🔥 Graph Data
  const peerData = [
    { name: "DSA", you: userData.skills.dsa, peers: peerAvg.dsa },
    { name: "Dev", you: userData.skills.dev, peers: peerAvg.dev },
    { name: "Projects", you: userData.skills.projects, peers: peerAvg.projects },
    { name: "Design", you: userData.skills.systemDesign, peers: peerAvg.systemDesign },
    { name: "Solving", you: userData.skills.problemSolving, peers: peerAvg.problemSolving },
  ];

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold mb-1">Peer Comparison</h1>
        <p className="text-muted-foreground text-sm">See how you stack up against peers.</p>
      </div>

      {/* 🔥 Percentile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-primary/20 rounded-xl p-6 glow-green-sm"
      >
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8 text-primary" />
          <div>
            <p className="text-2xl font-bold">Top {percentile}%</p>
            <p className="text-sm text-muted-foreground">
              Among peers preparing for Product-Based Companies
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* 🔥 GRAPH */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h3 className="font-semibold mb-4">Skills Comparison</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={peerData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} /> {/* 🔥 FIX */}
              <Tooltip />
              <Legend />
              <Bar dataKey="you" fill="#22C55E" name="You" />
              <Bar dataKey="peers" fill="#FACC15" name="Peer Avg" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* 🔥 LEADERBOARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h3 className="font-semibold mb-4">Leaderboard</h3>

          <div className="space-y-3">
            {leaderboard.map((l, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  l.isYou
                    ? "bg-primary/10 border border-primary/30"
                    : "bg-muted/30"
                }`}
              >
                <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>

                <span
                  className={`flex-1 font-medium text-sm ${
                    l.isYou ? "text-primary" : ""
                  }`}
                >
                  {l.isYou ? "You" : l.name}
                </span>

                <span className="text-sm font-bold">{l.score}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}