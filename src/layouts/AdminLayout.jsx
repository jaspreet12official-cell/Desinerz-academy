import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function AdminLayout({ theme, setTheme, children }) {
  return (
    <div className="theme-shell min-h-screen" style={{ background: "#F7F8FA" }}>
      <Sidebar />
      <TopBar theme={theme} setTheme={setTheme} />
      <main className="ml-60 pt-14 min-h-screen">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
