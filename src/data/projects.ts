export type Project = {
  id: string;
  title: string;
  type: string;
  category: "Web Application" | "IoT";
  context?: string;
  description: string;
  contribution: string;
  techStack: readonly string[];
  highlights: readonly string[];
  github?: string;
  demo?: string;
  accent: "blue" | "violet" | "cyan" | "emerald";
};

export const projects: readonly Project[] = [
  {
    id: "impastay",
    title: "ImpaStay",
    type: "Multi-Tenant Accommodation Booking Platform",
    category: "Web Application",
    description:
      "A Laravel-based accommodation booking and messaging platform supporting property management, bookings, user management, and multi-tenant functionality.",
    contribution: "Developed the majority of the platform.",
    techStack: ["Laravel", "PHP", "MySQL / SQLite", "Tailwind CSS", "Alpine.js"],
    highlights: [
      "Accommodation management",
      "Booking workflows",
      "Messaging",
      "User management",
      "Multi-tenant functionality",
    ],
    accent: "blue",
  },
  {
    id: "geolocation-attendance",
    title: "Student Geolocation Attendance System",
    type: "BSIT Capstone Project",
    category: "IoT",
    context: "Bukidnon State University",
    description:
      "An IoT-powered attendance monitoring system combining RFID identification, GPS geolocation, and connected devices to support location-aware attendance verification.",
    contribution:
      "Developed and integrated major system features, with significant involvement in the IoT integration.",
    techStack: [
      "ESP32-C3",
      "GPS",
      "RFID",
      "React.js",
      "Flutter",
      "Node.js",
      "MongoDB Atlas",
      "Arduino",
    ],
    highlights: [
      "RFID attendance",
      "GPS geolocation",
      "ESP32 device integration",
      "Attendance monitoring",
      "Backend services",
    ],
    accent: "violet",
  },
  {
    id: "impasugong-tourism",
    title: "Impasug-ong Tourism Management Web Application",
    type: "Full-Stack Web Application",
    category: "Web Application",
    description:
      "A tourism management system supporting visitor booking, administration, analytics, and reporting for the Municipality of Impasug-ong.",
    contribution: "Contributed to the development of the application.",
    techStack: [
      "Laravel",
      "Blade",
      "Tailwind CSS",
      "Bootstrap",
      "MySQL",
      "Chart.js",
      "DomPDF",
    ],
    highlights: [
      "Visitor booking",
      "Administration tools",
      "Analytics",
      "Reporting",
    ],
    accent: "emerald",
  },
  {
    id: "buksu-guidance",
    title: "BukSU Guidance Counseling Record Management System",
    type: "Full-Stack Web Application",
    category: "Web Application",
    description:
      "A web-based system for managing guidance counseling records and related administrative workflows.",
    contribution:
      "Developed the application across its frontend, backend, database, authentication, and core management features.",
    techStack: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB / Mongoose",
      "Tailwind CSS",
    ],
    highlights: [
      "Counseling record management",
      "Authentication",
      "Administrative workflows",
      "REST API backend",
    ],
    accent: "cyan",
  },
] as const;

export const projectCategories = ["All", "Web Application", "IoT"] as const;
