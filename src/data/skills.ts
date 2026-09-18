export type SkillCategory = {
  title: string;
  icon: "code" | "layout" | "server" | "database" | "cpu" | "wrench";
  skills: readonly string[];
};

export const skillCategories: readonly SkillCategory[] = [
  {
    title: "Programming",
    icon: "code",
    skills: ["JavaScript", "PHP", "Python"],
  },
  {
    title: "Frontend",
    icon: "layout",
    skills: ["React.js", "Tailwind CSS", "HTML/CSS"],
  },
  {
    title: "Backend",
    icon: "server",
    skills: ["Laravel", "Node.js", "Express.js", "REST APIs"],
  },
  {
    title: "Databases",
    icon: "database",
    skills: ["MongoDB", "MySQL"],
  },
  {
    title: "IoT & Networking",
    icon: "cpu",
    skills: ["ESP32", "GPS", "RFID/NFC", "Switching & Routing"],
  },
  {
    title: "Tools",
    icon: "wrench",
    skills: ["Git", "GitHub"],
  },
] as const;
