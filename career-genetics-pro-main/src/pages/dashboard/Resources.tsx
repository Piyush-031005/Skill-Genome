import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen } from "lucide-react";

const categories = ["All", "DSA Practice", "System Design", "Project Ideas", "Interview Prep"];

const resources = [
  { title: "NeetCode 150", category: "DSA Practice", difficulty: "Medium", time: "40 hrs", desc: "Curated list of LeetCode problems." },
  { title: "System Design Primer", category: "System Design", difficulty: "Hard", time: "20 hrs", desc: "Learn scalable system design." },
  { title: "Full Stack Open", category: "Project Ideas", difficulty: "Medium", time: "60 hrs", desc: "Build modern full-stack apps." },
  { title: "Grokking the Interview", category: "Interview Prep", difficulty: "Medium", time: "30 hrs", desc: "Pattern-based problem solving." },
  { title: "LeetCode Patterns", category: "DSA Practice", difficulty: "Easy", time: "25 hrs", desc: "Common algorithm patterns." },
  { title: "Build a REST API", category: "Project Ideas", difficulty: "Easy", time: "15 hrs", desc: "End-to-end API project." },
];

const difficultyColor: Record<string, string> = {
  Easy: "bg-primary/10 text-primary",
  Medium: "bg-secondary/10 text-secondary",
  Hard: "bg-destructive/10 text-destructive",
};

export default function Resources() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Resources</h1>
        <p className="text-muted-foreground text-sm">Curated learning materials for your path.</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map((c) => (
          <button key={c} className="px-3 py-1.5 rounded-lg text-sm border border-border hover:border-primary/30 transition-colors">
            {c}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card border border-border rounded-xl p-5 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyColor[r.difficulty]}`}>
                {r.difficulty}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" /> {r.time}
              </span>
            </div>
            <h3 className="font-semibold mb-1">{r.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 flex-1">{r.desc}</p>
            <Button variant="outline" size="sm" className="w-full">
              <BookOpen className="w-4 h-4 mr-1" /> Start Learning
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
