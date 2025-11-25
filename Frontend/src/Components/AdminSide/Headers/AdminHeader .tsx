import { Menu, Bell, User, LogOut, Settings } from "lucide-react";
interface SidebarProps {
  sidebarOpen: boolean;   
  toggleSidebar: () => void;
}
const AdminHeader:React.FC<SidebarProps> = ({ toggleSidebar }) => {
  return (
    <header className="w-full bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="flex justify-between items-center px-2 py-3">

        {/* LEFT — Menu + Title */}
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Menu size={22} />
          </button>

          <h1 className="text-xl font-semibold text-gray-700 hidden ">
            Admin Dashboard
          </h1>
        </div>

        {/* RIGHT — Icons */}
        <div className="flex items-center ">

          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <Bell size={22} />
          </button>

          {/* Profile Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 p-2 rounded-lg hover:bg-gray-100 transition">
              <User size={22} />
              <span className="font-medium">Admin</span>
            </button>

            <div className="absolute right-0 mt-2 w-44 bg-white shadow-md rounded-lg py-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition">
              <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                <Settings size={18} /> Settings
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-red-500">
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
