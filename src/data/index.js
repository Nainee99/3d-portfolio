export const navLinks = [
  {
    id: "hero",
    title: "Hero",
  },
  {
    id: "portfolio",
    title: "Portfolio",
  },
  {
    id: "experience",
    title: "Experience",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const experiences = [
  {
    title: "Full Stack Development Intern",
    company_name: "CodeCraft Studios",
    date: "June 2024 - November 2024",
    details: [
      "Contributed to the development of a high-performing <span style='color: white;'>e-commerce platform</span>, boosting online sales.",
      "Implemented <span style='color: white;'>responsive design techniques</span>, increasing user engagement by 25%.",
      "Collaborated with senior developers to refine <span style='color: white;'>backend functionalities</span> for improved efficiency.",
    ],
  },
  {
    title: "Frontend Development Intern",
    company_name: "Sam's Developers",
    date: "October 2023 - March 2024",
    details: [
      "Assisted in <span style='color: white;'>redesigning websites</span> to enhance user experience and engagement.",
      "Optimized frontend performance, reducing <span style='color: white;'>load times by 20%</span>.",
      "Ensured <span style='color: white;'>accessibility compliance</span>, improving inclusivity for all users.",
    ],
  },
  {
    title: "Freelance Developer",
    company_name: "Self Employed",
    date: "2023 - Present",
    details: [
      "Developed custom <span style='color: white;'>web applications</span> for various clients, enhancing online presence.",
      "Built <span style='color: white;'>interactive and scalable solutions</span> using React.js, Next.js, and Tailwind CSS.",
      "Integrated <span style='color: white;'>secure authentication and real-time features</span> into client projects.",
    ],
  },
  {
    title: "Bachelor of Information Technology",
    company_name: "University of Punjab",
    date: "2025",
    details: [
      "Specialized in <span style='color: white;'>Full Stack Development</span> with a minor in Mathematics.",
      "Worked on AI-powered legal assistant project, <span style='color: white;'>LawBotics</span>, utilizing NLP and machine learning.",
      "Developed <span style='color: white;'>LiveDocs</span>, a real-time collaborative document editing platform.",
    ],
  },
];

const portfolio = [
  {
    name: "3legant",
    description:
      "3legant is a modern e-commerce platform built with the MERN stack, featuring a responsive React 19 frontend with Vite, Tailwind CSS, and Radix UI. It offers a seamless shopping experience with product filtering, a shopping cart, and user authentication, while the Node.js backend ensures secure API endpoints, JWT authentication, and full CRUD functionality.",
    image: "/project/3legant.jpeg",
  },
  {
    name: "Budgify",
    description:
      "Budgify is a modern personal finance dashboard built with Next.js, offering real-time financial tracking, analytics, and visualization. It features income & expense tracking, smart categorization, interactive charts, and multi-account support. With end-to-end encryption and biometric authentication, Budgify ensures secure and seamless personal finance management.",
    image: "/project/budgify.jpeg",
  },
  {
    name: "LiveDocs",
    description:
      "LiveDocs is a collaborative document editor inspired by Google Docs. Built with Next.js for the user interface, Liveblocks for real-time functionality, and styled using TailwindCSS, this project highlights the developer's expertise in building real-time, collaborative applications.",
    image: "/project/live-docs.jpeg",
  },
  {
    name: "Algorun",
    description:
      "Algorun is a powerful online IDE built with Next.js 15, Convex, Clerk, and TypeScript, offering a seamless multi-language coding experience. It provides smart output handling, customizable themes, and community-driven code-sharing, making it the perfect choice for developers looking for flexibility and efficiency.",
    image: "/project/algorun.jpeg",
  },
  {
    name: "CarePulse",
    description:
      "CarePulse is a modern doctor appointment scheduling platform built with Next.js, Tailwind CSS, and Appwrite. It provides seamless appointment booking for users, an admin panel for managing doctors and schedules, and a user-friendly experience for healthcare professionals.",
    image: "/project/care-pulse.jpeg",
  },
];

export { experiences, portfolio };
