import { ICONS } from "./icons";

export const PAGE_MGMT_IDS = ["home-page", "about", "universities", "contact-us", "gallery", "terms", "privacy", "events"];
export const STUDENT_IDS = ["enrollment", "certificate"];

export const navGroups = [
  { label: "Overview", items: [{ id: "dashboard", label: "Dashboard", icon: ICONS.dashboard }] },
  {
    label: "Content",
    items: [
      {
        id: "page-management",
        label: "Page Management",
        icon: ICONS.pages,
        sub: [
          { id: "home-page", label: "Home Page", icon: ICONS.home },
          { id: "about", label: "About Us", icon: ICONS.about },
          { id: "universities", label: "Universities", icon: ICONS.university },
          { id: "contact-us", label: "Contact Us", icon: ICONS.contact },
          { id: "gallery", label: "Gallery", icon: ICONS.gallery },
          { id: "terms", label: "Terms & Conditions", icon: ICONS.terms },
          { id: "privacy", label: "Privacy Policy", icon: ICONS.terms },
          { id: "events", label: "Events", icon: ICONS.events },
        ],
      },
    ],
  },
  {
    label: "Academics",
    items: [
      { id: "courses", label: "Courses", icon: ICONS.courses },
      {
        id: "students",
        label: "Students",
        icon: ICONS.students,
        sub: [
          { id: "enrollment", label: "Enrollment", icon: ICONS.enrollment },
          { id: "certificate", label: "Certificate", icon: ICONS.certificate },
        ],
      },
      { id: "subjects", label: "Subjects", icon: ICONS.subjects },
    ],
  },
  {
    label: "Operations",
    items: [
      { id: "fee-structure", label: "Fee Structure", icon: ICONS.fee },
      { id: "fee-collection", label: "Fee Collection", icon: ICONS.feeCollection },
      { id: "council", label: "Council List", icon: ICONS.council },
      { id: "get-in-touch", label: "Get In Touch", icon: ICONS.touch },
      { id: "enrollment-req", label: "Enrollment Request", icon: ICONS.enrollment },
    ],
  },
];

export const pageTitles = {
  dashboard: "Dashboard",
  "home-page": "Home Page",
  about: "About Us",
  universities: "Universities",
  "contact-us": "Contact Us",
  gallery: "Gallery",
  terms: "Terms & Conditions",
  privacy: "Privacy Policy",
  events: "Events",
  courses: "Courses",
  enrollment: "Enrollment",
  certificate: "Certificate",
  subjects: "Subjects",
  "fee-structure": "Fee Structure",
  "fee-collection": "Fee Collection",
  council: "Council List",
  "get-in-touch": "Get In Touch",
  "enrollment-req": "Enrollment Requests",
};
