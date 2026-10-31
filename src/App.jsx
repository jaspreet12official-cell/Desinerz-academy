import { Routes, Route, Navigate } from "react-router-dom";
import useTheme from "./hooks/useTheme";
import AdminLayout from "./layouts/AdminLayout";

import DashboardPage from "./pages/dashboard/DashboardPage";
import HomePage from "./pages/page-management/HomePage";
import AboutPage from "./pages/page-management/AboutPage";
import UniversitiesPage from "./pages/page-management/UniversitiesPage";
import ContactPage from "./pages/page-management/ContactPage";
import GalleryPage from "./pages/page-management/GalleryPage";
import TermsPage from "./pages/page-management/TermsPage";
import PrivacyPage from "./pages/page-management/PrivacyPage";
import EventsPage from "./pages/page-management/EventsPage";
import CoursesPage from "./pages/courses/CoursesPage";
import EnrollmentPage from "./pages/students/EnrollmentPage";
import CertificatePage from "./pages/students/CertificatePage";
import SubjectsPage from "./pages/subjects/SubjectsPage";
import FeeStructurePage from "./pages/fees/FeeStructurePage";
import FeeCollectionPage from "./pages/fees/FeeCollectionPage";
import CouncilPage from "./pages/operations/CouncilPage";
import GetInTouchPage from "./pages/operations/GetInTouchPage";
import EnrollmentRequestPage from "./pages/operations/EnrollmentRequestPage";

const routes = [
  { path: "dashboard", element: <DashboardPage /> },
  { path: "home-page", element: <HomePage /> },
  { path: "about", element: <AboutPage /> },
  { path: "universities", element: <UniversitiesPage /> },
  { path: "contact-us", element: <ContactPage /> },
  { path: "gallery", element: <GalleryPage /> },
  { path: "terms", element: <TermsPage title="Terms & Conditions" /> },
  { path: "privacy", element: <PrivacyPage /> },
  { path: "events", element: <EventsPage /> },
  { path: "courses", element: <CoursesPage /> },
  { path: "enrollment", element: <EnrollmentPage /> },
  { path: "certificate", element: <CertificatePage /> },
  { path: "subjects", element: <SubjectsPage /> },
  { path: "fee-structure", element: <FeeStructurePage /> },
  { path: "fee-collection", element: <FeeCollectionPage /> },
  { path: "council", element: <CouncilPage /> },
  { path: "get-in-touch", element: <GetInTouchPage /> },
  { path: "enrollment-req", element: <EnrollmentRequestPage /> },
];

export default function App() {
  const [theme, setTheme] = useTheme();

  return (
    <AdminLayout theme={theme} setTheme={setTheme}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        {routes.map((r) => (
          <Route key={r.path} path={`/${r.path}`} element={r.element} />
        ))}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}