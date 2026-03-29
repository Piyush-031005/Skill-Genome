import { motion } from "framer-motion";
import { Trophy, Flame, Medal, Shield, Swords, Star, TrendingUp, Zap, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const tiers = [
  { name: "Beginner", range: "0 – 150", color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/30", icon: Shield },
  { name: "Intermediate", range: "150 – 300", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/30", icon: Swords },
  { name: "Advanced", range: "300 – 500", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/30", icon: Star },
  { name: "Expert", range: "500 – 800", color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/30", icon: Flame },
  { name: "Elite", range: "800+", color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/30", icon: Trophy },
];

const userScore = 370;
const userTier = tiers[2]; // Advanced

const divisionPeers = [
  { rank: 1, name: "Ravi K.", score: 395, change: "+12" },
  { rank: 2, name: "You", score: 370, change: "+8", isYou: true },
  { rank: 3, name: "Ananya M.", score: 355, change: "+5" },
  { rank: 4, name: "Jordan L.", score: 340, change: "-3" },
  { rank: 5, name: "Priya S.", score: 328, change: "+15" },
  { rank: 6, name: "Alex T.", score: 310, change: "-7" },
];

const badges = [
  { name: "DSA Warrior", desc: "Solved 100+ DSA problems", icon: Swords, earned: true },
  { name: "Consistency King", desc: "30-day streak", icon: Flame, earned: true },
  { name: "Contest Champion", desc: "Top 10% in a contest", icon: Trophy, earned: false },
  { name: "Hard Crusher", desc: "Solved 25 hard problems", icon: Target, earned: false },
];

const scoreBreakdown = [
  { label: "Easy × 1", count: 120, points: 120 },
  { label: "Medium × 3", count: 55, points: 165 },
  { label: "Hard × 5", count: 8, points: 40 },
  { label: "Contest Rating / 50", value: 1500, points: 30 },
  { label: "Streak × 2", count: 7, points: 14 },
];

export default function Ranking() {
  const [leetcodeId, setLeetcodeId] = useState("skill_user_01");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Competitive Ranking</h1>
        <p className="text-muted-foreground text-sm">LeetCode-based tier system with fair division matching.</p>
      </div>

      {/* LeetCode ID Input */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-xl p-5">
        <p className="text-sm font-medium mb-3">LeetCode Username</p>
        <div className="flex gap-3">
          <input
            value={leetcodeId}
            onChange={(e) => setLeetcodeId(e.target.value)}
            className="flex-1 h-10 px-4 rounded-lg bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Enter your LeetCode ID"
          />
          <Button variant="hero" size="sm">Sync Data</Button>
        </div>
      </motion.div>

      {/* Current Tier + Score */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className={`bg-card border ${userTier.border} rounded-xl p-6 glow-green-sm`}>
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl ${userTier.bg} flex items-center justify-center`}>
              <userTier.icon className={`w-8 h-8 ${userTier.color}`} />
            </div>
            <div>
              <p className={`text-sm font-medium ${userTier.color}`}>Current Tier</p>
              <p className="text-3xl font-bold">{userTier.name}</p>
              <p className="text-xs text-muted-foreground">Score Range: {userTier.range}</p>
            </div>
          </div>
          <div className="mt-5">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Score Progress</span>
              <span className="font-bold text-primary">{userScore} / 500</span>
            </div>
            <Progress value={(userScore / 500) * 100} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2">130 points to reach <span className="text-orange-400 font-medium">Expert</span></p>
          </div>
        </motion.div>

        {/* Score Breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><Zap className="w-4 h-4 text-primary" /> Score Breakdown</h3>
          <div className="space-y-3">
            {scoreBreakdown.map((item) => (
              <div key={item.label} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-bold text-primary">+{item.points}</span>
              </div>
            ))}
            <div className="border-t border-border pt-3 flex justify-between font-bold">
              <span>Total Score</span>
              <span className="text-primary">{userScore}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tier System Visual */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-semibold mb-5">Tier System</h3>
        <div className="grid grid-cols-5 gap-3">
          {tiers.map((tier) => {
            const isActive = tier.name === userTier.name;
            return (
              <div key={tier.name} className={`rounded-xl p-4 text-center border transition-all ${isActive ? `${tier.bg} ${tier.border} ring-1 ring-primary/50 ring-offset-2 ring-offset-background` : "bg-muted/30 border-border opacity-60"}`}>
                <tier.icon className={`w-6 h-6 mx-auto mb-2 ${tier.color}`} />
                <p className={`text-sm font-bold ${tier.color}`}>{tier.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{tier.range}</p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Division Leaderboard */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-semibold">Your Division</h3>
            <p className="text-xs text-muted-foreground">Competing with users scored 280 – 420</p>
          </div>
          <Badge variant="outline" className="text-primary border-primary/30">🟣 Advanced Division</Badge>
        </div>
        <div className="space-y-2">
          {divisionPeers.map((peer) => (
            <div key={peer.rank} className={`flex items-center gap-3 p-3 rounded-lg transition-all ${peer.isYou ? "bg-primary/10 border border-primary/30" : "bg-muted/20 hover:bg-muted/40"}`}>
              <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold">{peer.rank}</span>
              <span className={`flex-1 font-medium text-sm ${peer.isYou ? "text-primary" : ""}`}>{peer.name}</span>
              <span className={`text-xs font-medium ${peer.change.startsWith("+") ? "text-primary" : "text-destructive"}`}>
                <TrendingUp className="w-3 h-3 inline mr-1" />{peer.change}
              </span>
              <span className="text-sm font-bold w-12 text-right">{peer.score}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Badges */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-semibold mb-5 flex items-center gap-2"><Medal className="w-4 h-4 text-secondary" /> Badges & Achievements</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div key={badge.name} className={`rounded-xl p-4 border text-center transition-all ${badge.earned ? "bg-primary/5 border-primary/20 glow-green-sm" : "bg-muted/20 border-border opacity-50"}`}>
              <badge.icon className={`w-8 h-8 mx-auto mb-2 ${badge.earned ? "text-primary" : "text-muted-foreground"}`} />
              <p className="text-sm font-bold">{badge.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{badge.desc}</p>
              {badge.earned && <Badge className="mt-2 bg-primary/20 text-primary border-0 text-[10px]">Earned ✓</Badge>}
            </div>
          ))}
        </div>
      </motion.div>

      {/* XP Progress */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-semibold mb-4">XP & Level</h3>
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/30 flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-primary">12</p>
            <p className="text-[10px] text-muted-foreground">LEVEL</p>
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">2,450 / 3,000 XP</span>
              <span className="font-medium text-primary">Level 13</span>
            </div>
            <Progress value={82} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2">Solve 5 more medium problems to level up!</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
