import { useState } from "react";
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

const pages = {
  dashboard: DashboardPage,
  "home-page": HomePage,
  about: AboutPage,
  universities: UniversitiesPage,
  "contact-us": ContactPage,
  gallery: GalleryPage,
  terms: () => <TermsPage title="Terms & Conditions" />,
  privacy: PrivacyPage,
  events: EventsPage,
  courses: CoursesPage,
  enrollment: EnrollmentPage,
  certificate: CertificatePage,
  subjects: SubjectsPage,
  "fee-structure": FeeStructurePage,
  "fee-collection": FeeCollectionPage,
  council: CouncilPage,
  "get-in-touch": GetInTouchPage,
  "enrollment-req": EnrollmentRequestPage,
};

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [theme, setTheme] = useTheme();
  const Page = pages[page] || DashboardPage;

  return (
    <AdminLayout page={page} setPage={setPage} theme={theme} setTheme={setTheme}>
      <Page />
    </AdminLayout>
  );
}
