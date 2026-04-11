import { motion } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Radar as RadarShape } from "recharts";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";

export default function SkillAnalysis() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        setUserData(snap.data());
      }
    };

    fetchData();
  }, []);

  // ✅ Radar data
  const radarData = userData
    ? [
        { skill: "DSA", value: userData.skills.dsa },
        { skill: "Web Dev", value: userData.skills.dev },
        { skill: "Projects", value: userData.skills.projects },
        { skill: "System Design", value: userData.skills.systemDesign },
        { skill: "Problem Solving", value: userData.skills.problemSolving },
        { skill: "Communication", value: userData.skills.communication },
      ]
    : [];

  // ✅ Skills breakdown
  const skills = userData
    ? [
        { name: "DSA", level: userData.skills.dsa },
        { name: "Web Development", level: userData.skills.dev },
        { name: "Projects", level: userData.skills.projects },
        { name: "System Design", level: userData.skills.systemDesign },
        { name: "Problem Solving", level: userData.skills.problemSolving },
        { name: "Communication", level: userData.skills.communication },
      ]
    : [];

  // ✅ Category logic
  const getCategory = (level: number) => {
    if (level >= 70) return "Strong";
    if (level >= 50) return "Moderate";
    return "Weak";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Skill Analysis</h1>
        <p className="text-muted-foreground text-sm">Deep dive into your skill distribution.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Radar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold mb-4">Skill Distribution</h3>
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="skill" />
              <RadarShape dataKey="value" stroke="#22C55E" fill="#22C55E" fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold mb-4">Detailed Breakdown</h3>
          <div className="space-y-4">
            {skills.map((s) => {
              const category = getCategory(s.level);

              return (
                <div key={s.name}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium">{s.name}</span>
                    <span className={
                      category === "Strong"
                        ? "text-primary"
                        : category === "Weak"
                        ? "text-secondary"
                        : "text-muted-foreground"
                    }>
                      {s.level}% · {category}
                    </span>
                  </div>

                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        category === "Weak" ? "bg-secondary" : "bg-primary"
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${s.level}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}