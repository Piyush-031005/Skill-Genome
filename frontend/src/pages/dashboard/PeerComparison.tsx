import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Trophy } from "lucide-react";

const peerData = [
  { name: "DSA", you: 65, peers: 78 },
  { name: "Dev", you: 60, peers: 68 },
  { name: "Projects", you: 40, peers: 55 },
  { name: "Design", you: 35, peers: 60 },
  { name: "Solving", you: 70, peers: 72 },
];

const leaderboard = [
  { rank: 1, name: "Alex K.", score: 88 },
  { rank: 2, name: "Priya S.", score: 85 },
  { rank: 3, name: "Jordan M.", score: 82 },
  { rank: 4, name: "You", score: 54, isYou: true },
  { rank: 5, name: "Sam T.", score: 50 },
];

export default function PeerComparison() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Peer Comparison</h1>
        <p className="text-muted-foreground text-sm">See how you stack up against peers.</p>
      </div>

      {/* Percentile */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-primary/20 rounded-xl p-6 glow-green-sm">
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8 text-primary" />
          <div>
            <p className="text-2xl font-bold">Top 32%</p>
            <p className="text-sm text-muted-foreground">Among peers preparing for Product-Based Companies</p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold mb-4">Skills Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={peerData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
              <Legend />
              <Bar dataKey="you" fill="#22C55E" radius={[4, 4, 0, 0]} name="You" />
              <Bar dataKey="peers" fill="#FACC15" radius={[4, 4, 0, 0]} name="Peer Avg" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold mb-4">Leaderboard</h3>
          <div className="space-y-3">
            {leaderboard.map((l) => (
              <div key={l.rank} className={`flex items-center gap-3 p-3 rounded-lg ${l.isYou ? "bg-primary/10 border border-primary/30" : "bg-muted/30"}`}>
                <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold">{l.rank}</span>
                <span className={`flex-1 font-medium text-sm ${l.isYou ? "text-primary" : ""}`}>{l.name}</span>
                <span className="text-sm font-bold">{l.score}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
