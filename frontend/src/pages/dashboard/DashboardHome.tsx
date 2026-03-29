import { motion } from "framer-motion";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";
import { AlertTriangle } from "lucide-react";

const radarData = [
  { skill: "DSA", value: 65 },
  { skill: "Development", value: 55 },
  { skill: "Projects", value: 40 },
  { skill: "System Design", value: 35 },
  { skill: "Problem Solving", value: 70 },
];

const peerData = [
  { name: "DSA", you: 65, peers: 78 },
  { name: "Dev", you: 60, peers: 68 },
  { name: "Projects", you: 40, peers: 55 },
  { name: "Design", you: 35, peers: 60 },
  { name: "Solving", you: 70, peers: 72 },
];

const progressSkills = [
  { name: "DSA", value: 65, recommended: 80 },
  { name: "Development", value: 55, recommended: 70 },
  { name: "Projects", value: 40, recommended: 65 },
  { name: "System Design", value: 35, recommended: 60 },
];

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Your Skill Genome at a glance.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Radar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h3 className="font-semibold mb-4">Skill Radar</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="skill" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <Radar dataKey="value" stroke="#22C55E" fill="#22C55E" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Peer Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h3 className="font-semibold mb-4">You vs Peers</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={peerData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Legend />
              <Bar dataKey="you" fill="#22C55E" radius={[4, 4, 0, 0]} name="You" />
              <Bar dataKey="peers" fill="#FACC15" radius={[4, 4, 0, 0]} name="Peers" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <h3 className="font-semibold mb-4">Skill Progress</h3>
        <div className="space-y-4">
          {progressSkills.map((s) => (
            <div key={s.name}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium">{s.name}</span>
                <span className="text-muted-foreground">{s.value}% <span className="text-secondary">/ {s.recommended}% recommended</span></span>
              </div>
              <div className="h-2.5 bg-muted rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${s.value}%` }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
                <div
                  className="absolute top-0 h-full w-0.5 bg-secondary"
                  style={{ left: `${s.recommended}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Skill Gap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card border border-secondary/30 rounded-xl p-6"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Skill Gap Detected: System Design</h3>
            <p className="text-sm text-muted-foreground">
              Study system design fundamentals and build backend architecture projects to close this gap.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
