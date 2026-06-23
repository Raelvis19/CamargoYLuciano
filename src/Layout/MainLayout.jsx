import Sidebar from "../components/Sidebar";
import TopBar from "../components/Topbar";

export default function MainLayout({ children }) {
  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-section">
        <TopBar />

        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
}