import { motion } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

const radarData = [
  { skill: "DSA", value: 65 },
  { skill: "Web Dev", value: 55 },
  { skill: "Projects", value: 40 },
  { skill: "System Design", value: 35 },
  { skill: "Problem Solving", value: 70 },
  { skill: "Communication", value: 60 },
];

const skills = [
  { name: "Data Structures & Algorithms", level: 65, category: "Strong" },
  { name: "Problem Solving", level: 70, category: "Strong" },
  { name: "Web Development", level: 55, category: "Moderate" },
  { name: "Communication Skills", level: 60, category: "Moderate" },
  { name: "Projects", level: 40, category: "Weak" },
  { name: "System Design", level: 35, category: "Weak" },
];

export default function SkillAnalysis() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Skill Analysis</h1>
        <p className="text-muted-foreground text-sm">Deep dive into your skill distribution.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold mb-4">Skill Distribution</h3>
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="skill" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <Radar dataKey="value" stroke="#22C55E" fill="#22C55E" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold mb-4">Detailed Breakdown</h3>
          <div className="space-y-4">
            {skills.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium">{s.name}</span>
                  <span className={s.category === "Strong" ? "text-primary" : s.category === "Weak" ? "text-secondary" : "text-muted-foreground"}>
                    {s.level}% · {s.category}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${s.category === "Weak" ? "bg-secondary" : "bg-primary"}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${s.level}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
