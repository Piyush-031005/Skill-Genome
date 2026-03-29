import { motion } from "framer-motion";
import { Upload, FileText, CheckCircle2, AlertTriangle, TrendingUp, BarChart3, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const mockAnalysis = {
  atsScore: 72,
  sections: [
    { name: "Contact Info", score: 100, status: "pass" },
    { name: "Work Experience", score: 85, status: "pass" },
    { name: "Technical Skills", score: 65, status: "warning" },
    { name: "Projects", score: 55, status: "warning" },
    { name: "Education", score: 90, status: "pass" },
    { name: "Achievements", score: 30, status: "fail" },
  ],
  missingSkills: ["System Design", "Docker", "CI/CD", "GraphQL", "TypeScript"],
  suggestions: [
    "Add quantifiable achievements to work experience (metrics, percentages)",
    "Include 2-3 more technical projects with GitHub links",
    "Add System Design knowledge — required for 78% of target roles",
    "Include certifications or relevant coursework",
    "Optimize keywords for ATS: add 'REST API', 'Microservices', 'Agile'",
  ],
  strengths: ["Strong DSA section", "Good project descriptions", "Clean formatting"],
};

export default function ResumeAnalyzer() {
  const [uploaded, setUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleUpload = () => {
    setUploaded(true);
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Resume Analyzer</h1>
        <p className="text-muted-foreground text-sm">AI-powered resume analysis with ATS scoring and improvement suggestions.</p>
      </div>

      {/* Upload Zone */}
      {!uploaded && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          onClick={handleUpload}
          className="bg-card border-2 border-dashed border-primary/30 rounded-xl p-12 text-center cursor-pointer hover:border-primary/60 hover:bg-primary/5 transition-all"
        >
          <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
          <p className="text-lg font-semibold mb-2">Drop your resume here</p>
          <p className="text-sm text-muted-foreground mb-4">PDF, DOC, or DOCX • Max 10MB</p>
          <Button variant="hero" size="sm">Browse Files</Button>
        </motion.div>
      )}

      {/* Analyzing */}
      {analyzing && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border border-primary/20 rounded-xl p-12 text-center glow-green-sm">
          <Sparkles className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-lg font-semibold mb-2">Analyzing your resume...</p>
          <p className="text-sm text-muted-foreground">Scanning for ATS compatibility, skills, and improvements</p>
        </motion.div>
      )}

      {/* Results */}
      {analyzed && (
        <>
          {/* ATS Score */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-primary/20 rounded-xl p-6 glow-green-sm">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl bg-primary/10 border border-primary/30 flex flex-col items-center justify-center">
                <p className="text-4xl font-bold text-primary">{mockAnalysis.atsScore}</p>
                <p className="text-[10px] text-muted-foreground">ATS Score</p>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">Good Resume — Room for Improvement</h3>
                <p className="text-sm text-muted-foreground mb-3">Your resume passes most ATS filters but missing key elements for top companies.</p>
                <Progress value={mockAnalysis.atsScore} className="h-3" />
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Section Scores */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-primary" /> Section Analysis</h3>
              <div className="space-y-4">
                {mockAnalysis.sections.map((sec) => (
                  <div key={sec.name}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="flex items-center gap-2">
                        {sec.status === "pass" ? <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> :
                          sec.status === "warning" ? <AlertTriangle className="w-3.5 h-3.5 text-secondary" /> :
                            <AlertTriangle className="w-3.5 h-3.5 text-destructive" />}
                        {sec.name}
                      </span>
                      <span className="font-medium">{sec.score}%</span>
                    </div>
                    <Progress value={sec.score} className="h-2" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Missing Skills */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-secondary" /> Missing Skills</h3>
              <p className="text-sm text-muted-foreground mb-4">Skills required by your target companies that are missing from your resume:</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {mockAnalysis.missingSkills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-secondary border-secondary/30">{skill}</Badge>
                ))}
              </div>

              <h4 className="font-medium text-sm mb-3 flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Strengths</h4>
              <ul className="space-y-2">
                {mockAnalysis.strengths.map((s) => (
                  <li key={s} className="text-sm text-muted-foreground flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-primary shrink-0" /> {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* AI Suggestions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" /> AI Improvement Suggestions</h3>
            <div className="space-y-3">
              {mockAnalysis.suggestions.map((sug, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                  <p className="text-sm">{sug}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="flex gap-3">
            <Button variant="hero" size="sm" onClick={() => { setUploaded(false); setAnalyzed(false); }}>
              <FileText className="w-4 h-4 mr-2" /> Upload New Resume
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
