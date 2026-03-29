import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "@/lib/theme";
import { Search, Filter, TrendingUp, Users, Eye, Dna, Sun, Moon, ArrowUpRight, Star, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

const candidates = [
  {
    id: 1, name: "Aarav Sharma", role: "Full Stack Developer", score: 82, tier: "Expert",
    skills: { dsa: 85, dev: 90, projects: 75, design: 60, solving: 80 },
    location: "Bangalore", preference: "FAANG", projects: 8, verified: true,
  },
  {
    id: 2, name: "Priya Patel", role: "Backend Developer", score: 76, tier: "Advanced",
    skills: { dsa: 78, dev: 85, projects: 70, design: 45, solving: 82 },
    location: "Hyderabad", preference: "Product-based", projects: 6, verified: true,
  },
  {
    id: 3, name: "Jordan Mitchell", role: "Frontend Developer", score: 71, tier: "Advanced",
    skills: { dsa: 60, dev: 88, projects: 80, design: 85, solving: 55 },
    location: "Remote", preference: "Startups", projects: 12, verified: false,
  },
  {
    id: 4, name: "Ananya Gupta", role: "AI Engineer", score: 88, tier: "Elite",
    skills: { dsa: 92, dev: 70, projects: 85, design: 50, solving: 95 },
    location: "Delhi", preference: "FAANG", projects: 5, verified: true,
  },
  {
    id: 5, name: "Sam Torres", role: "Software Engineer", score: 65, tier: "Intermediate",
    skills: { dsa: 70, dev: 65, projects: 55, design: 40, solving: 68 },
    location: "Mumbai", preference: "Product-based", projects: 3, verified: false,
  },
];

const roleFilters = ["All Roles", "Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer", "AI Engineer"];
const prefFilters = ["All Preferences", "FAANG", "Product-based", "Startups", "Service"];

function CandidateRadar({ skills }: { skills: Record<string, number> }) {
  const data = [
    { skill: "DSA", value: skills.dsa },
    { skill: "Dev", value: skills.dev },
    { skill: "Projects", value: skills.projects },
    { skill: "Design", value: skills.design },
    { skill: "Solving", value: skills.solving },
  ];
  return (
    <ResponsiveContainer width="100%" height={140}>
      <RadarChart data={data}>
        <PolarGrid stroke="hsl(var(--border))" />
        <PolarAngleAxis dataKey="skill" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} />
        <Radar dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.15} strokeWidth={1.5} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

function getTierColor(tier: string) {
  switch (tier) {
    case "Elite": return "text-red-400 bg-red-400/10 border-red-400/30";
    case "Expert": return "text-orange-400 bg-orange-400/10 border-orange-400/30";
    case "Advanced": return "text-purple-400 bg-purple-400/10 border-purple-400/30";
    case "Intermediate": return "text-blue-400 bg-blue-400/10 border-blue-400/30";
    default: return "text-green-400 bg-green-400/10 border-green-400/30";
  }
}

export default function CompanyDashboard() {
  const { theme, toggle } = useTheme();
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [prefFilter, setPrefFilter] = useState("All Preferences");
  const [search, setSearch] = useState("");

  const filtered = candidates.filter((c) => {
    if (roleFilter !== "All Roles" && c.role !== roleFilter) return false;
    if (prefFilter !== "All Preferences" && c.preference !== prefFilter) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Top Nav */}
      <header className="border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <Dna className="w-6 h-6 text-primary" />
            <span>Skill Genome</span>
            <Badge variant="outline" className="ml-2 text-xs text-secondary border-secondary/30">Employer</Badge>
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={toggle} className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Button variant="hero" size="sm" asChild>
              <Link to="/login">Recruiter Login</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8 space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-2">Talent Discovery</h1>
          <p className="text-muted-foreground">Browse pre-assessed candidates with verified skill genomes.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: "Active Candidates", value: "2,340", icon: Users, change: "+12%" },
            { label: "Avg Genome Score", value: "68", icon: TrendingUp, change: "+5%" },
            { label: "Verified Profiles", value: "1,890", icon: Eye, change: "+18%" },
          ].map((stat) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between">
                <stat.icon className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs text-primary font-medium">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-border rounded-xl p-5">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search candidates..." className="w-full h-10 pl-9 pr-4 rounded-lg bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="h-10 px-3 rounded-lg bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
                {roleFilters.map((r) => <option key={r}>{r}</option>)}
              </select>
              <select value={prefFilter} onChange={(e) => setPrefFilter(e.target.value)} className="h-10 px-3 rounded-lg bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
                {prefFilters.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Candidate Cards */}
        <div className="grid lg:grid-cols-2 gap-5">
          {filtered.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }} className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all group">
              <div className="flex gap-5">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg">{c.name}</h3>
                    {c.verified && <Badge className="bg-primary/20 text-primary border-0 text-[10px]">✓ Verified</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1"><Briefcase className="w-3 h-3" /> {c.role}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" /> {c.location} • {c.preference}</p>

                  <div className="mt-4 flex items-center gap-4">
                    <div>
                      <p className="text-3xl font-bold text-primary">{c.score}</p>
                      <p className="text-[10px] text-muted-foreground">Genome Score</p>
                    </div>
                    <Badge variant="outline" className={`${getTierColor(c.tier)} text-xs`}>{c.tier}</Badge>
                    <div className="text-xs text-muted-foreground">
                      <Star className="w-3 h-3 inline text-secondary" /> {c.projects} projects
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary group-hover:bg-primary/10">
                      View Full Profile <ArrowUpRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
                <div className="w-40 shrink-0">
                  <CandidateRadar skills={c.skills} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
