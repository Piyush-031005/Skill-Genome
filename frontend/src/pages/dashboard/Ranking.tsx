import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function Ranking() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [leetcodeId, setLeetcodeId] = useState("");
  const [data, setData] = useState<any>(null);
  const [score, setScore] = useState(0);

  const [easy, setEasy] = useState(0);
  const [medium, setMedium] = useState(0);
  const [hard, setHard] = useState(0);

  const [filter, setFilter] = useState("global");
  const [selectedLeague, setSelectedLeague] = useState("Beginner");

  // 🎯 Tier Logic
  const getTier = (score: number) => {
    if (score < 150) return "Beginner";
    if (score < 300) return "DSA Warrior";
    if (score < 500) return "Advanced";
    if (score < 800) return "Expert";
    return "Elite";
  };

  const currentTier = getTier(score);

  const filteredUsers = leaderboard.filter(
    (user) => getTier(user.score) === selectedLeague
  );

  const finalUsers = filteredUsers
    .filter((user) => {
      if (filter === "india") return user.country === "India";
      if (filter === "college") return user.college === "YourCollege";
      return true;
    })
    .sort((a, b) => b.score - a.score);

  const myRank =
    finalUsers.findIndex((u) => u.leetcodeId === leetcodeId) + 1;

  const fetchLeaderboard = async () => {
    const res = await fetch("http://localhost:8000/api/auth/leaderboard");
    const data = await res.json();
    setLeaderboard(data);
  };

  const handleSync = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/auth/leetcode/${leetcodeId}`
      );
      const result = await res.json();

      setData(result);

      const easyCount =
        result.submitStats.acSubmissionNum.find(
          (d: any) => d.difficulty === "Easy"
        )?.count || 0;

      const mediumCount =
        result.submitStats.acSubmissionNum.find(
          (d: any) => d.difficulty === "Medium"
        )?.count || 0;

      const hardCount =
        result.submitStats.acSubmissionNum.find(
          (d: any) => d.difficulty === "Hard"
        )?.count || 0;

      setEasy(easyCount);
      setMedium(mediumCount);
      setHard(hardCount);

      const totalScore = easyCount * 1 + mediumCount * 3 + hardCount * 5;
      setScore(totalScore);

      setSelectedLeague(getTier(totalScore));

      await fetch("http://localhost:8000/api/auth/save-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leetcodeId,
          score: totalScore,
        }),
      });

      fetchLeaderboard();
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  // 🔥 GRAPH DATA
  const chartData = [
    { name: "Easy", value: easy },
    { name: "Medium", value: medium },
    { name: "Hard", value: hard }
  ];

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          🏆 Competitive Ranking
        </h1>
        <p className="text-sm text-gray-400">
          LeetCode-based tier system with fair competition
        </p>
      </div>

      {/* INPUT */}
      <div className="flex gap-3">
        <input
          value={leetcodeId}
          onChange={(e) => setLeetcodeId(e.target.value)}
          placeholder="Enter LeetCode Username"
          className="flex-1 px-4 py-2 rounded-lg bg-[#020617] border border-gray-700 text-white focus:border-green-400 outline-none"
        />
        <Button className="bg-green-500 hover:bg-green-600" onClick={handleSync}>
          Sync
        </Button>
      </div>

      {/* FILTER */}
      <div className="flex gap-2">
        {["global", "india", "college"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1 rounded-full text-sm transition ${
              filter === f
                ? "bg-green-500 text-black"
                : "bg-gray-800 text-gray-300"
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* LEAGUES */}
      <div className="flex gap-2 flex-wrap">
        {["Beginner", "DSA Warrior", "Advanced", "Expert", "Elite"].map(
          (tier) => (
            <button
              key={tier}
              onClick={() => setSelectedLeague(tier)}
              className={`px-4 py-1 rounded-full text-sm transition ${
                selectedLeague === tier
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-800 text-gray-300"
              }`}
            >
              {tier}
            </button>
          )
        )}
      </div>

      {/* USER STATS */}
      {data && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#0f172a] to-[#020617] border border-green-500/20 p-6 rounded-xl shadow-[0_0_25px_rgba(34,197,94,0.15)]"
        >
          <h2 className="text-xl font-bold text-green-400 mb-2">
            Your Stats
          </h2>

          <div className="flex justify-between text-white mb-2">
            <span>Tier: {currentTier}</span>
            <span>Score: {score}</span>
          </div>

          <Progress value={(score / 800) * 100} />

          <div className="flex justify-between mt-3 text-sm text-gray-300">
            <span>Easy: {easy}</span>
            <span>Medium: {medium}</span>
            <span>Hard: {hard}</span>
          </div>
        </motion.div>
      )}

      {/* 🔥 GRAPH */}
      {data && (
        <div className="bg-gradient-to-br from-[#0f172a] to-[#020617] border border-green-500/20 p-6 rounded-xl">

          <h2 className="text-lg font-bold text-green-400 mb-4">
            📊 Performance Analytics
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />

              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* LEADERBOARD */}
      <div className="bg-gradient-to-br from-[#0f172a] to-[#020617] border border-gray-800 p-6 rounded-xl">

        <h2 className="text-xl font-bold text-white mb-4">
          {selectedLeague} Leaderboard ({filter})
        </h2>

        {finalUsers.length === 0 ? (
          <p className="text-gray-400">No users in this category</p>
        ) : (
          finalUsers.map((user, index) => {
            let medal = "";
            if (index === 0) medal = "🥇";
            else if (index === 1) medal = "🥈";
            else if (index === 2) medal = "🥉";

            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className={`flex justify-between items-center p-4 rounded-lg mb-2 ${
                  index < 3
                    ? "bg-yellow-500/10 border border-yellow-500/30"
                    : "bg-[#020617] border border-gray-800"
                }`}
              >
                <span className="flex items-center gap-3 text-white">
                  <span>{medal || `#${index + 1}`}</span>
                  <a
                    href={`/profile/${user.leetcodeId}`}
                    className="hover:text-green-400"
                  >
                    {user.leetcodeId}
                  </a>
                </span>

                <span className="font-bold text-green-400">
                  {user.score}
                </span>
              </motion.div>
            );
          })
        )}
      </div>

      {/* MY RANK */}
      <div className="text-white">
        Your Rank:{" "}
        <span className="text-green-400 font-bold">
          #{myRank > 0 ? myRank : "Not Ranked"}
        </span>
      </div>

      {/* SCORING */}
      <div className="bg-[#020617] border border-gray-800 p-4 rounded-xl text-gray-300">
        <h2 className="font-bold text-white mb-2">Scoring System</h2>
        <p>Easy = +1</p>
        <p>Medium = +3</p>
        <p>Hard = +5</p>
      </div>

    </div>
  );
}