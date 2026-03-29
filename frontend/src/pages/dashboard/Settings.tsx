import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/lib/theme";
import { Sun, Moon } from "lucide-react";

export default function SettingsPage() {
  const { theme, toggle } = useTheme();
  const [name, setName] = useState("Student");
  const [email, setEmail] = useState("student@example.com");

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold mb-1">Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your account and preferences.</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h3 className="font-semibold">Profile</h3>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Email</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <Button variant="hero" size="sm">Save Changes</Button>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-semibold mb-4">Appearance</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Theme</p>
            <p className="text-xs text-muted-foreground">Toggle between dark and light mode.</p>
          </div>
          <button onClick={toggle} className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-semibold mb-4">Notifications</h3>
        <div className="space-y-3">
          {["Email notifications", "Roadmap reminders", "Peer updates"].map((n) => (
            <label key={n} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-primary w-4 h-4" />
              <span className="text-sm">{n}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
