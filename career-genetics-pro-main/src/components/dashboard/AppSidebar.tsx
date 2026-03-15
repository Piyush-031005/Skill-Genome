import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Brain, Users, Map, BookOpen, User, Settings, Dna } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Skill Analysis", path: "/dashboard/skills", icon: Brain },
  { label: "Peer Comparison", path: "/dashboard/peers", icon: Users },
  { label: "Roadmap", path: "/dashboard/roadmap", icon: Map },
  { label: "Resources", path: "/dashboard/resources", icon: BookOpen },
  { label: "Profile", path: "/dashboard/profile", icon: User },
  { label: "Settings", path: "/dashboard/settings", icon: Settings },
];

export default function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="w-60 shrink-0 min-h-screen bg-card border-r border-border flex flex-col">
      <Link to="/" className="flex items-center gap-2 px-5 h-16 border-b border-border">
        <Dna className="w-6 h-6 text-primary" />
        <span className="font-bold">Skill Genome</span>
      </Link>

      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
                active
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {active && <span className="absolute left-0 w-[3px] h-6 bg-primary rounded-r-full" />}
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
