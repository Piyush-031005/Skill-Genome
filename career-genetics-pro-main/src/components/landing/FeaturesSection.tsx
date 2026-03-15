import { motion } from "framer-motion";
import { Brain, Users, Search, Map, BookOpen, BarChart3 } from "lucide-react";

const features = [
  { icon: Brain, title: "Skill Analysis", desc: "Analyze your current technical skill levels with precision." },
  { icon: Users, title: "Peer Benchmarking", desc: "Compare your skills with students targeting similar roles." },
  { icon: Search, title: "Skill Gap Detection", desc: "Identify missing skills required by top companies." },
  { icon: Map, title: "Personalized Roadmap", desc: "Generate a structured learning path tailored to you." },
  { icon: BookOpen, title: "Resource Recommendations", desc: "Get curated learning resources and project ideas." },
  { icon: BarChart3, title: "Growth Tracking", desc: "Monitor your skill growth over time with analytics." },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-card/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to <span className="text-gradient-green">Level Up</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive skill intelligence toolkit designed for students preparing for tech careers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group glass rounded-xl p-6 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:glow-green-sm transition-all">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
