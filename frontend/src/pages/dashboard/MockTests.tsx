import { motion } from "framer-motion";
import { BookOpen, Clock, BarChart3, Play, Lock, CheckCircle2, Building2, Code, Server, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const companies = [
  { name: "Google", tests: 12, completed: 3 },
  { name: "Amazon", tests: 15, completed: 5 },
  { name: "Microsoft", tests: 10, completed: 2 },
  { name: "Meta", tests: 8, completed: 0 },
];

const topics = [
  { name: "DSA", icon: Code, tests: 25, avgScore: 72, color: "text-primary" },
  { name: "System Design", icon: Server, tests: 15, avgScore: 45, color: "text-secondary" },
  { name: "CS Fundamentals", icon: BookOpen, tests: 20, avgScore: 68, color: "text-blue-400" },
  { name: "Behavioral", icon: MessageSquare, tests: 10, avgScore: 80, color: "text-purple-400" },
];

const mockTests = [
  { id: 1, title: "Google SDE-1: Arrays & Strings", company: "Google", topic: "DSA", difficulty: "Medium", duration: "45 min", questions: 3, completed: true, score: 78 },
  { id: 2, title: "Amazon: System Design Basics", company: "Amazon", topic: "System Design", difficulty: "Hard", duration: "60 min", questions: 2, completed: true, score: 62 },
  { id: 3, title: "Google SDE-1: Trees & Graphs", company: "Google", topic: "DSA", difficulty: "Hard", duration: "60 min", questions: 3, completed: false },
  { id: 4, title: "Microsoft: OOP Concepts", company: "Microsoft", topic: "CS Fundamentals", difficulty: "Easy", duration: "30 min", questions: 5, completed: false },
  { id: 5, title: "Amazon: Dynamic Programming", company: "Amazon", topic: "DSA", difficulty: "Hard", duration: "60 min", questions: 3, completed: true, score: 55 },
  { id: 6, title: "Meta: React Frontend Challenge", company: "Meta", topic: "DSA", difficulty: "Medium", duration: "45 min", questions: 2, locked: true },
];

function getDifficultyColor(d: string) {
  if (d === "Easy") return "bg-primary/10 text-primary border-primary/30";
  if (d === "Medium") return "bg-secondary/10 text-secondary border-secondary/30";
  return "bg-red-400/10 text-red-400 border-red-400/30";
}

export default function MockTests() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Mock Preparation</h1>
        <p className="text-muted-foreground text-sm">Company-specific mock tests with adaptive difficulty.</p>
      </div>

      {/* Company Targets */}
      <div className="grid sm:grid-cols-4 gap-4">
        {companies.map((c, i) => (
          <motion.div key={c.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <p className="font-semibold text-sm">{c.name}</p>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold text-primary">{c.completed}</p>
                <p className="text-xs text-muted-foreground">of {c.tests} tests</p>
              </div>
              <Progress value={(c.completed / c.tests) * 100} className="w-20 h-2" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Topic Overview */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-semibold mb-4">Topic-wise Performance</h3>
        <div className="grid sm:grid-cols-4 gap-4">
          {topics.map((t) => (
            <div key={t.name} className="bg-muted/20 rounded-lg p-4">
              <t.icon className={`w-5 h-5 ${t.color} mb-2`} />
              <p className="text-sm font-medium">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.tests} tests available</p>
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Avg Score</span>
                  <span className="font-medium">{t.avgScore}%</span>
                </div>
                <Progress value={t.avgScore} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Test List */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-semibold mb-5">Available Tests</h3>
        <div className="space-y-3">
          {mockTests.map((test) => (
            <div key={test.id} className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${test.locked ? "bg-muted/10 border-border opacity-60" : test.completed ? "bg-primary/5 border-primary/20" : "bg-muted/20 border-border hover:border-primary/30"}`}>
              <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                {test.locked ? <Lock className="w-4 h-4 text-muted-foreground" /> :
                  test.completed ? <CheckCircle2 className="w-4 h-4 text-primary" /> :
                    <Play className="w-4 h-4 text-foreground" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{test.title}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{test.duration}</span>
                  <span className="text-xs text-muted-foreground">{test.questions} questions</span>
                  <Badge variant="outline" className={`text-[10px] ${getDifficultyColor(test.difficulty)}`}>{test.difficulty}</Badge>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {test.completed && test.score !== undefined && (
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{test.score}%</p>
                    <p className="text-[10px] text-muted-foreground">Score</p>
                  </div>
                )}
                <Button variant={test.completed ? "ghost" : "hero"} size="sm" disabled={test.locked}>
                  {test.locked ? "Locked" : test.completed ? "Retry" : "Start"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
