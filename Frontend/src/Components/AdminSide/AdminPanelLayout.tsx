import  { useState, type ReactNode } from "react";
import AdminSidebar from "../AdminSide/Sidebar/AdminSidebar";
import AdminHeader from "../AdminSide/Headers/AdminHeader ";

interface AdminPanelLayoutProps {
  children: ReactNode;
}

const AdminPanelLayout = ({ children }: AdminPanelLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <AdminHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={false} />

        {/* Content */}
        <main className="p-6 overflow-y-auto h-[calc(100vh-70px)]">
          {children}
        </main>

      </div>
    </div>
  );
};

export default AdminPanelLayout;
