import { motion } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { CheckCircle2, AlertTriangle, Star } from "lucide-react";

const radarData = [
  { skill: "DSA", value: 65 },
  { skill: "Dev", value: 55 },
  { skill: "Projects", value: 40 },
  { skill: "Design", value: 35 },
  { skill: "Solving", value: 70 },
  { skill: "Comm", value: 60 },
];

export default function Profile() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Profile</h1>
        <p className="text-muted-foreground text-sm">Your Skill Genome overview.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Score */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-primary/20 rounded-xl p-6 text-center glow-green-sm">
          <p className="text-5xl font-bold text-primary mb-2">54</p>
          <p className="text-sm text-muted-foreground">Genome Score</p>
          <p className="text-xs text-muted-foreground mt-1">Out of 100</p>
        </motion.div>

        {/* Strengths */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-primary" />
            <h3 className="font-semibold">Strengths</h3>
          </div>
          <ul className="space-y-2 text-sm">
            {["Problem Solving", "DSA", "Communication"].map((s) => (
              <li key={s} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" /> {s}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Weaknesses */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-secondary" />
            <h3 className="font-semibold">Weak Areas</h3>
          </div>
          <ul className="space-y-2 text-sm">
            {["System Design", "Projects"].map((s) => (
              <li key={s} className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-secondary" /> {s}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-semibold mb-4">Full Skill Genome</h3>
        <ResponsiveContainer width="100%" height={350}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis dataKey="skill" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
            <Radar dataKey="value" stroke="#22C55E" fill="#22C55E" fillOpacity={0.15} strokeWidth={2} />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
