export const profile = {
  name: "Yanrey Romaine Estrada",
  shortName: "Yanrey Estrada",
  title: "Full-Stack Software Developer | IT Technician",
  eyebrow: "Full-Stack Software Developer",
  location: "Impasug-ong, Bukidnon, Philippines",
  email: "yanreyestrada@gmail.com",
  phone: "0951 247 8197",
  phoneHref: "+639512478197",
  resumePath: "/resume.pdf",
  /**
   * Real photograph of Yanrey, generated into `public/` by
   * `scripts/prepare_images.py`. Never an AI-generated or stock portrait.
   */
  photo: "/profile.png",
  photoAlt: "Yanrey Romaine Estrada",
} as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
] as const;

export const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Yandrey11",
    icon: "github" as const,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/yanrey-romaine-estrada-4779503a/",
    icon: "linkedin" as const,
  },
  {
    name: "Facebook",
    href: "https://web.facebook.com/yanrey.estrada.2024/",
    icon: "facebook" as const,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/romaine.exe/",
    icon: "instagram" as const,
  },
] as const;

export const hero = {
  heading: "Hi, I'm Yanrey Romaine Estrada.",
  subheading:
    "I build practical software systems across web, backend, databases, and IoT.",
  supporting:
    "Full-stack software developer and BS Information Technology student at Bukidnon State University with hands-on experience in web development, backend systems, databases, REST APIs, and IoT technologies. Currently extending that foundation into AI and machine learning.",
} as const;

export const about = {
  paragraphs: [
    "I'm Yanrey Romaine Estrada, a Bachelor of Science in Information Technology student at Bukidnon State University focused on full-stack software development and practical technology solutions.",
    "I work across frontend, backend, databases, and IoT systems, with experience developing web applications and contributing to systems designed to solve real-world problems.",
    "I'm currently developing my skills in AI and machine learning, applying the same practical, systems-oriented approach I bring to web and IoT work.",
  ],
} as const;
