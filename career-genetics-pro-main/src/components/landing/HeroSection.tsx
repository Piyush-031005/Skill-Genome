import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const radarData = [
  { skill: "DSA", value: 75 },
  { skill: "Dev", value: 60 },
  { skill: "Projects", value: 45 },
  { skill: "Design", value: 55 },
  { skill: "Solving", value: 70 },
];

const barData = [
  { name: "DSA", you: 65, peers: 78 },
  { name: "Dev", you: 60, peers: 68 },
  { name: "Projects", you: 40, peers: 55 },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid-pattern">
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              Skill Intelligence Platform
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Decode Your{" "}
              <span className="text-gradient-green">Skill Genome</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
              Understand your real skill level, compare with peers, and build a roadmap to top tech companies.
            </p>
            <div className="flex gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <Link to="/dashboard">Explore Platform</Link>
              </Button>
            </div>
          </motion.div>

          {/* Right - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass rounded-2xl p-6 glow-green-sm"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Radar Chart */}
              <div className="bg-background/50 rounded-xl p-4 border border-border/50">
                <p className="text-xs text-muted-foreground mb-2 font-medium">Skill Distribution</p>
                <ResponsiveContainer width="100%" height={180}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="skill" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                    <Radar dataKey="value" stroke="#22C55E" fill="#22C55E" fillOpacity={0.2} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Chart */}
              <div className="bg-background/50 rounded-xl p-4 border border-border/50">
                <p className="text-xs text-muted-foreground mb-2 font-medium">You vs Peers</p>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={barData} barGap={2}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                    <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                    <Bar dataKey="you" fill="#22C55E" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="peers" fill="#FACC15" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Progress Bars */}
              <div className="col-span-2 bg-background/50 rounded-xl p-4 border border-border/50">
                <p className="text-xs text-muted-foreground mb-3 font-medium">Skill Progress</p>
                <div className="space-y-3">
                  {[{ name: "DSA", value: 65 }, { name: "Development", value: 55 }, { name: "Projects", value: 40 }].map((s) => (
                    <div key={s.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-foreground">{s.name}</span>
                        <span className="text-muted-foreground">{s.value}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${s.value}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
