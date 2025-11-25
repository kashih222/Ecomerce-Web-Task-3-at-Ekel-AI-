import { LayoutDashboard, Users, Package, Settings, LogOut, PlusCircle } from "lucide-react";
import { NavLink } from "react-router-dom";
interface SidebarProps {
  sidebarOpen: boolean;
}
const AdminSidebar:React.FC<SidebarProps> = ({ sidebarOpen }) => {
  return (
    <aside
      className={`${
        sidebarOpen ? "w-64" : "w-22"
      } bg-black text-white h-screen transition-all duration-300 sticky left-0 top-0`}
    >
      <div className="ml-2 px-5 py-6 font-bold text-xl transition-all duration-300">
  {sidebarOpen ? "Admin" : "A"}
</div>


      <nav className="mt-4">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-6 py-3 hover:bg-gray-700 transition"
        >
          <LayoutDashboard size={20} />
          {sidebarOpen && <span>Dashboard</span>}
        </NavLink>

        <a
          href="#"
          className="flex items-center gap-3 px-6 py-3 hover:bg-gray-700 transition"
        >
          <Users size={20} />
          {sidebarOpen && <span>Users</span>}
        </a>

        <NavLink
          to="/add-product"
          className="flex items-center gap-3 px-6 py-3 hover:bg-gray-700 transition"
        >
          <PlusCircle size={20} />
          {sidebarOpen && <span>Add Product</span>}
        </NavLink>

        <a
          href="#"
          className="flex items-center gap-3 px-6 py-3 hover:bg-gray-700 transition"
        >
          <Package size={20} />
          {sidebarOpen && <span>Products</span>}
        </a>

        <a
          href="#"
          className="flex items-center gap-3 px-6 py-3 hover:bg-gray-700 transition"
        >
          <Settings size={20} />
          {sidebarOpen && <span>Settings</span>}
        </a>

        <div className="border-t border-gray-700 mt-4"></div>

        <a
          href="#"
          className="flex items-center gap-3 px-6 py-3 text-red-400 hover:bg-gray-700 transition"
        >
          <LogOut size={20} />
          {sidebarOpen && <span>Logout</span>}
        </a>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
