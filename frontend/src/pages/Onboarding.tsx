import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dna, Code, Server, Globe, Database, Brain, Cpu, Building2, Rocket, Briefcase, Loader2 } from "lucide-react";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";

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

  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [year, setYear] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");

  const [currentUser, setCurrentUser] = useState<any>(null);

useEffect(() => {
  if (currentUser) {
    setName(currentUser.displayName || "");
  }
}, [currentUser]);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setCurrentUser(user);
  });
  return () => unsubscribe();
}, []);

  const [skillLevels, setSkillLevels] = useState<Record<string, number>>(
    Object.fromEntries(skills.map((s) => [s, 50]))
  );

  const [projectsCount, setProjectsCount] = useState(3);
  const [languages, setLanguages] = useState("JavaScript, Python");
  const [platforms, setPlatforms] = useState("LeetCode, HackerRank");

  const navigate = useNavigate();
  const totalSteps = 4;

  // ✅ SAVE FUNCTION
const saveUserData = async () => {
  if (isLoading) return;

  setIsLoading(true);
  console.log("Analyze clicked 🔥");

  try {
    const user = currentUser;
    console.log("USER:", user);

    if (!user) {
      alert("Login first");
      setIsLoading(false);
      return;
    }

  const formData = {
  name: name || user.displayName || "User",
  email: user.email,
  photoURL: user.photoURL,

  college,
  year,

  role,
  company,

  skills: {
    dsa: skillLevels["Data Structures & Algorithms"],
    dev: skillLevels["Web Development"],
    systemDesign: skillLevels["System Design"],
    projects: skillLevels["Projects"],
    problemSolving: skillLevels["Problem Solving"],
    communication: skillLevels["Communication Skills"],
  },

  experience: {
    projectsCount,
    languages,
    platforms,
  },
};

    console.log("Saving data:", formData);

    await setDoc(doc(db, "users", user.uid), formData);

    console.log("✅ Data saved");

    // 🔥 FIX: FIRST stop loading
    setIsLoading(false);

    // 🔥 THEN navigate
    navigate("/dashboard");

  } catch (err: any) {
    console.error("🔥 ERROR:", err);
    alert(err.message);

    setIsLoading(false);
  }
};

  const next = () => {
    if (step < totalSteps - 1) setStep(step + 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-grid-pattern relative">
      <div className="glass rounded-2xl p-8 w-full max-w-2xl">

        <AnimatePresence mode="wait">

          {/* ROLE */}
          {step === 0 && (
            <StepWrapper>
              <h2 className="text-2xl font-bold mb-4">Select Role</h2>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((r) => (
                  <button
                    key={r.label}
                    onClick={() => setRole(r.label)}
                    className={`p-4 rounded-xl border ${
                      role === r.label ? "border-primary bg-primary/10" : ""
                    }`}
                  >
                    <r.icon className="mb-2 text-primary" />
                    {r.label}
                  </button>
                ))}
              </div>
            </StepWrapper>
          )}

          {/* COMPANY */}
          {step === 1 && (
            <StepWrapper>
              <h2 className="text-2xl font-bold mb-4">Select Company</h2>
              <div className="grid grid-cols-2 gap-3">
                {companies.map((c) => (
                  <button
                    key={c.label}
                    onClick={() => setCompany(c.label)}
                    className={`p-4 rounded-xl border ${
                      company === c.label ? "border-primary bg-primary/10" : ""
                    }`}
                  >
                    <c.icon className="mb-2 text-primary" />
                    {c.label}
                  </button>
                ))}
              </div>
            </StepWrapper>
          )}

          {/* SKILLS */}
          {step === 2 && (
            <StepWrapper>
              <h2 className="text-2xl font-bold mb-4">Rate your skills</h2>
              {skills.map((s) => (
                <div key={s} className="mb-4">
                  <p>{s}: {skillLevels[s]}</p>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={skillLevels[s]}
                    onChange={(e) =>
                      setSkillLevels((prev) => ({
                        ...prev,
                        [s]: +e.target.value,
                      }))
                    }
                    className="w-full"
                  />
                </div>
              ))}
            </StepWrapper>
          )}



          {/* EXPERIENCE */}
{step === 3 && (
  <StepWrapper>
    <h2 className="text-2xl font-bold mb-4">Experience</h2>

    <input
  type="text"
  placeholder="Your Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="w-full mb-3 p-2 rounded-lg border bg-background"
/>

<input
  type="text"
  placeholder="College / University"
  value={college}
  onChange={(e) => setCollege(e.target.value)}
  className="w-full mb-3 p-2 rounded-lg border bg-background"
/>

<input
  type="text"
  placeholder="Year (e.g. 2nd, 3rd)"
  value={year}
  onChange={(e) => setYear(e.target.value)}
  className="w-full mb-3 p-2 rounded-lg border bg-background"
/>

    <input
      type="number"
      value={projectsCount}
      onChange={(e) => setProjectsCount(+e.target.value)}
      className="w-full mb-3 p-2 rounded-lg border border-border bg-background text-foreground"
    />

    <input
      type="text"
      value={languages}
      onChange={(e) => setLanguages(e.target.value)}
      className="w-full mb-3 p-2 rounded-lg border border-border bg-background text-foreground"
    />

    <input
      type="text"
      value={platforms}
      onChange={(e) => setPlatforms(e.target.value)}
      className="w-full p-2 rounded-lg border border-border bg-background text-foreground"
    />
  </StepWrapper>
)}

          {/* LOADING */}
          {step === totalSteps && (
            <StepWrapper>
              <div className="text-center">
                <Loader2 className="animate-spin mx-auto mb-4" />
                <p>Analyzing...</p>
              </div>
            </StepWrapper>
          )}

        </AnimatePresence>

        {/* BUTTON */}
        <div className="mt-6 flex justify-end pointer-events-auto relative z-[999]">
  {step === totalSteps - 1 ? (
  <button
  onClick={saveUserData}
  disabled={isLoading}
  className="bg-green-500 px-4 py-2 rounded text-black font-bold disabled:opacity-50"
>
  {isLoading ? "Saving..." : "Analyze"}
</button>
) : (
  <Button onClick={next}>
    Continue
  </Button>
)}
</div>
            
        </div>

      </div>
  );
}

function StepWrapper({ children }: { children: React.ReactNode }) {
  return <motion.div>{children}</motion.div>;
}