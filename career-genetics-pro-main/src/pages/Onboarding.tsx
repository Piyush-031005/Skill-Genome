import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dna, Code, Server, Globe, Database, Brain, Cpu, Building2, Rocket, Briefcase, Loader2 } from "lucide-react";

const roles = [
  { label: "Software Engineer", icon: Code },
  { label: "Backend Developer", icon: Server },
  { label: "Frontend Developer", icon: Globe },
  { label: "Full Stack Developer", icon: Database },
  { label: "Data Scientist", icon: Brain },
  { label: "AI Engineer", icon: Cpu },
];

const companies = [
  { label: "FAANG", icon: Building2 },
  { label: "Product-based", icon: Briefcase },
  { label: "Startups", icon: Rocket },
  { label: "Service companies", icon: Building2 },
];

const skills = [
  "Data Structures & Algorithms",
  "Web Development",
  "System Design",
  "Projects",
  "Problem Solving",
  "Communication Skills",
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [skillLevels, setSkillLevels] = useState<Record<string, number>>(
    Object.fromEntries(skills.map((s) => [s, 50]))
  );
  const navigate = useNavigate();

  const totalSteps = 4;

  const next = () => {
    if (step < totalSteps - 1) setStep(step + 1);
    else {
      setStep(totalSteps); // loading
      setTimeout(() => navigate("/dashboard"), 2500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-grid-pattern relative">
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="glass rounded-2xl p-8 w-full max-w-2xl relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <Dna className="w-6 h-6 text-primary" />
          <span className="font-bold">Skill Genome</span>
          {step < totalSteps && (
            <span className="ml-auto text-sm text-muted-foreground">
              Step {step + 1} of {totalSteps}
            </span>
          )}
        </div>

        {/* Progress */}
        {step < totalSteps && (
          <div className="h-1 bg-muted rounded-full mb-8 overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 0 && (
            <StepWrapper key="role">
              <h2 className="text-2xl font-bold mb-2">What role are you preparing for?</h2>
              <p className="text-muted-foreground mb-6">Choose your target career path.</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {roles.map((r) => (
                  <button
                    key={r.label}
                    onClick={() => setRole(r.label)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      role === r.label
                        ? "border-primary bg-primary/10 glow-green-sm"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <r.icon className="w-5 h-5 text-primary mb-2" />
                    <span className="text-sm font-medium">{r.label}</span>
                  </button>
                ))}
              </div>
            </StepWrapper>
          )}

          {step === 1 && (
            <StepWrapper key="company">
              <h2 className="text-2xl font-bold mb-2">What type of companies?</h2>
              <p className="text-muted-foreground mb-6">Select your target company type.</p>
              <div className="grid grid-cols-2 gap-3">
                {companies.map((c) => (
                  <button
                    key={c.label}
                    onClick={() => setCompany(c.label)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      company === c.label
                        ? "border-primary bg-primary/10 glow-green-sm"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <c.icon className="w-5 h-5 text-primary mb-2" />
                    <span className="text-sm font-medium">{c.label}</span>
                  </button>
                ))}
              </div>
            </StepWrapper>
          )}

          {step === 2 && (
            <StepWrapper key="skills">
              <h2 className="text-2xl font-bold mb-2">Rate your skills</h2>
              <p className="text-muted-foreground mb-6">Drag sliders to self-assess.</p>
              <div className="space-y-5">
                {skills.map((s) => (
                  <div key={s}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">{s}</span>
                      <span className="text-primary font-bold">{skillLevels[s]}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={skillLevels[s]}
                      onChange={(e) => setSkillLevels((p) => ({ ...p, [s]: +e.target.value }))}
                      className="w-full accent-primary h-2 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                    />
                  </div>
                ))}
              </div>
            </StepWrapper>
          )}

          {step === 3 && (
            <StepWrapper key="experience">
              <h2 className="text-2xl font-bold mb-2">Experience Details</h2>
              <p className="text-muted-foreground mb-6">Tell us about your background.</p>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Number of Projects</label>
                  <input type="number" defaultValue={3} min={0} className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Programming Languages Known</label>
                  <input type="text" defaultValue="JavaScript, Python" className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Coding Platform Experience</label>
                  <input type="text" defaultValue="LeetCode, HackerRank" className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground" />
                </div>
              </div>
            </StepWrapper>
          )}

          {step === totalSteps && (
            <StepWrapper key="loading">
              <div className="text-center py-12">
                <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
                <h2 className="text-2xl font-bold mb-2">Analyzing your Skill Genome...</h2>
                <p className="text-muted-foreground">Building your personalized profile.</p>
              </div>
            </StepWrapper>
          )}
        </AnimatePresence>

        {step < totalSteps && (
          <div className="flex justify-between mt-8">
            <Button variant="ghost" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
              Back
            </Button>
            <Button variant="hero" onClick={next}>
              {step === totalSteps - 1 ? "Analyze" : "Continue"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function StepWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
