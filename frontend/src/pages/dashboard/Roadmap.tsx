import { motion } from "framer-motion";
import { CheckCircle2, Circle, BookOpen, Clock } from "lucide-react";
import { useState } from "react";

const stages = [
  {
    title: "DSA Fundamentals",
    status: "completed",
    tasks: [
      { label: "Arrays & Strings", done: true },
      { label: "Linked Lists", done: true },
      { label: "Stacks & Queues", done: true },
    ],
    resources: ["LeetCode Easy Set", "NeetCode 150"],
  },
  {
    title: "Intermediate Algorithms",
    status: "in-progress",
    tasks: [
      { label: "Binary Search", done: true },
      { label: "Two Pointers", done: false },
      { label: "Sliding Window", done: false },
    ],
    resources: ["Grokking Algorithms", "AlgoExpert"],
  },
  {
    title: "Backend Project Development",
    status: "upcoming",
    tasks: [
      { label: "REST API Project", done: false },
      { label: "Database Design", done: false },
      { label: "Authentication System", done: false },
    ],
    resources: ["Full Stack Open", "Node.js Best Practices"],
  },
  {
    title: "System Design Basics",
    status: "upcoming",
    tasks: [
      { label: "Load Balancing", done: false },
      { label: "Caching Strategies", done: false },
      { label: "Database Scaling", done: false },
    ],
    resources: ["System Design Primer", "Designing Data-Intensive Apps"],
  },
  {
    title: "Mock Interviews",
    status: "upcoming",
    tasks: [
      { label: "Behavioral Prep", done: false },
      { label: "Technical Mock", done: false },
      { label: "System Design Mock", done: false },
    ],
    resources: ["Pramp", "Interviewing.io"],
  },
];

export default function Roadmap() {
  const [taskStates, setTaskStates] = useState(
    stages.map((s) => s.tasks.map((t) => t.done))
  );

  const toggleTask = (si: number, ti: number) => {
    setTaskStates((prev) => {
      const n = prev.map((s) => [...s]);
      n[si][ti] = !n[si][ti];
      return n;
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Roadmap</h1>
        <p className="text-muted-foreground text-sm">Your personalized learning path.</p>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

        <div className="space-y-8">
          {stages.map((stage, si) => (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: si * 0.1 }}
              className="relative pl-14"
            >
              {/* Node */}
              <div className={`absolute left-3.5 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                stage.status === "completed"
                  ? "bg-primary border-primary glow-green-sm"
                  : stage.status === "in-progress"
                  ? "bg-primary/20 border-primary animate-pulse-glow"
                  : "bg-muted border-border"
              }`}>
                {stage.status === "completed" && <CheckCircle2 className="w-3 h-3 text-primary-foreground" />}
              </div>

              <div className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-primary">Stage {si + 1}</span>
                  {stage.status === "in-progress" && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">In Progress</span>
                  )}
                </div>
                <h3 className="font-semibold text-lg mb-3">{stage.title}</h3>

                <div className="space-y-2 mb-4">
                  {stage.tasks.map((t, ti) => (
                    <button
                      key={t.label}
                      onClick={() => toggleTask(si, ti)}
                      className="flex items-center gap-2 text-sm w-full text-left hover:bg-muted/50 rounded px-2 py-1 transition-colors"
                    >
                      {taskStates[si][ti] ? (
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-muted-foreground shrink-0" />
                      )}
                      <span className={taskStates[si][ti] ? "line-through text-muted-foreground" : ""}>{t.label}</span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <BookOpen className="w-3 h-3" />
                  {stage.resources.join(" · ")}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
