import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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

  // ✅ FILTER + LEAGUE LOGIC
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

  // ✅ MY RANK
  const myRank =
    finalUsers.findIndex((u) => u.leetcodeId === leetcodeId) + 1;

  // 🚀 Fetch leaderboard
  const fetchLeaderboard = async () => {
    const res = await fetch("http://localhost:8000/api/auth/leaderboard");
    const data = await res.json();
    setLeaderboard(data);
  };

  // 🚀 Sync Function
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

      // 🔥 auto-select league
      setSelectedLeague(getTier(totalScore));

      // 🔥 save score
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

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Competitive Ranking</h1>
        <p className="text-sm text-muted-foreground">
          LeetCode-based tier system with fair competition
        </p>
      </div>

      {/* INPUT */}
      <div className="flex gap-3">
        <input
          value={leetcodeId}
          onChange={(e) => setLeetcodeId(e.target.value)}
          placeholder="Enter LeetCode Username"
          className="flex-1 p-2 rounded bg-muted"
        />
        <Button onClick={handleSync}>Sync</Button>
      </div>

      {/* FILTER */}
      <div className="flex gap-2">
        {["global", "india", "college"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded ${
              filter === f ? "bg-green-500 text-white" : "bg-muted"
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* LEAGUES */}
      <div className="flex gap-2">
        {["Beginner", "DSA Warrior", "Advanced", "Expert", "Elite"].map(
          (tier) => (
            <button
              key={tier}
              onClick={() => setSelectedLeague(tier)}
              className={`px-3 py-1 rounded ${
                selectedLeague === tier ? "bg-yellow-500" : "bg-muted"
              }`}
            >
              {tier}
            </button>
          )
        )}
      </div>

      {/* USER STATS */}
      {data && (
        <div className="bg-card p-4 rounded-lg">
          <h2 className="font-bold text-lg">Your Stats</h2>

          <p>Tier: {currentTier}</p>
          <p>Score: {score}</p>

          <Progress value={(score / 800) * 100} />

          <div className="flex justify-between mt-3">
            <span>Easy: {easy}</span>
            <span>Medium: {medium}</span>
            <span>Hard: {hard}</span>
          </div>
        </div>
      )}

      {/* LEADERBOARD */}
      <div className="bg-card p-4 rounded-lg">
        <h2 className="font-bold mb-2">
          {selectedLeague} Leaderboard ({filter})
        </h2>

        {finalUsers.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No users in this category
          </p>
        ) : (finalUsers.map((user, index) => {
  let medal = "";

  if (index === 0) medal = "🥇";
  else if (index === 1) medal = "🥈";
  else if (index === 2) medal = "🥉";

  return (
    <div
      key={index}
      className={`flex justify-between items-center p-3 rounded-lg mb-2 ${
        index < 3 ? "bg-yellow-500/10 border border-yellow-500/30" : "bg-muted/30"
      }`}
    >
      <span className="flex items-center gap-2">
        {medal && <span>{medal}</span>}
        <a
  href={`/profile/${user.leetcodeId}`}
  className="hover:underline"
>
  #{index + 1} {user.leetcodeId}
</a>
      </span>

      <span className="font-bold">{user.score}</span>
    </div>
  );
}))}
      </div>

      {/* MY RANK */}
      <p>
        Your Rank: #{myRank > 0 ? myRank : "Not Ranked"}
      </p>

      {/* SCORING SYSTEM */}
      <div className="bg-card p-4 rounded-lg">
        <h2 className="font-bold">Scoring System</h2>
        <p>Easy = +1</p>
        <p>Medium = +3</p>
        <p>Hard = +5</p>
      </div>

    </div>
  );
}