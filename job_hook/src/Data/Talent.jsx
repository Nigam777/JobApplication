import {
  IconBriefcase,
  IconMapPin,
  IconRecharging,
  IconSearch,
  IconTools,
  IconCalendar,
} from "@tabler/icons-react";

const TalentData = [
  {
    title: "Job Title",
    icon: <IconSearch />,
    options: [
      "Designer",
      "Developer",
      "ProductManager",
      "Marketing",
      "Data Analyst",
      "Sales Executive",
      "Content Writer",
      "Customer Support",
    ],
  },
  {
    title: "Location",
    icon: <IconMapPin />,
    options: [
      "Delhi",
      "New York",
      "San Francisco",
      "London",
      "Berlin",
      "Tokyo",
      "Sydney",
      "Toronto",
    ],
  },
  {
    title: "Experience",
    icon: <IconBriefcase />,
    options: ["Entry Level", "Intermediate", "Expert"],
  },
  {
    title: "Job Type",
    icon: <IconRecharging />,
    options: ["Full Time", "Part Time", "Contract", "Freelance", "Internship"],
  },
  {
    title: "Skills",
    icon: <IconTools />,
    options: [
      "React",
      "Python",
      "AI",
      "Node.js",
      "Java",
      "Ruby",
      "JavaScript",
      "TypeScript",
      "CSS",
      "HTML",
      "MongoDB",
      "Express",
      "Django",
      "PostgreSQL",
      "Angular",
      "Vue.js",
      "Spring Boot",
      "PHP",
      "Kotlin",
      "Swift",
    ],
  },
  {
    title: "Availability",
    icon: <IconCalendar />,
    options: [
      "Immediate",
      "Open to offers",
    
    ],
  }
  
];

export { TalentData };
