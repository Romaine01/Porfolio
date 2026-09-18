export const experience = [
  {
    role: "On-Call Computer & Printer Technician",
    organization: "Freelance / On-Call",
    period: "2023 – Present",
    current: true,
    responsibilities: [
      "Diagnose and troubleshoot computer, printer, connectivity, and peripheral issues.",
      "Perform equipment installation, configuration, maintenance, and software troubleshooting.",
      "Provide technical support to restore computers and printing equipment to working condition.",
    ],
  },
] as const;

export const education = [
  {
    degree: "Bachelor of Science in Information Technology",
    school: "Bukidnon State University",
    period: "Expected Graduation: June 2027",
    current: true,
    coursework: [
      "Software Development",
      "Database Systems",
      "Web Development",
      "Networking",
      "Object-Oriented Programming",
      "Capstone Development",
    ],
  },
] as const;

export type Certification = {
  title: string;
  issuer: string;
  detail?: string;
  meta: readonly { label: string; value: string }[];
  kind: "certification" | "training";
  /** Scan of the issued certificate, shown in the certifications section. */
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export const certifications: readonly Certification[] = [
  {
    title: "Computer Systems Servicing NC II",
    issuer: "Technical Education and Skills Development Authority (TESDA)",
    kind: "certification",
    meta: [
      { label: "Issued", value: "February 16, 2024" },
      { label: "Valid until", value: "February 15, 2029" },
    ],
    image: {
      src: "/certificates/tesda-css-nc2.jpg",
      alt: "TESDA National Certificate II in Computer Systems Servicing awarded to Yanrey Romaine L. Estrada, issued February 16, 2024 and valid until February 15, 2029.",
      width: 1000,
      height: 1416,
    },
  },
  {
    title: "CCNA: Switching, Routing, and Wireless Essentials",
    issuer: "Cisco Networking Academy",
    detail: "Bukidnon State University · 70 hours",
    kind: "training",
    meta: [{ label: "Completed", value: "January 13, 2026" }],
    image: {
      src: "/certificates/ccna-switching-routing.jpg",
      alt: "Cisco Networking Academy certificate for completing CCNA: Switching, Routing, and Wireless Essentials, awarded to Yanrey Romaine Estrada on 13 January 2026.",
      width: 1400,
      height: 948,
    },
  },
] as const;
