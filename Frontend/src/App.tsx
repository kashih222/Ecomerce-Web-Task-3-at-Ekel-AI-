import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanelLayout from "./Components/AdminSide/AdminPanelLayout";
import DashboardHome from "./Components/AdminSide/DashboardHome/DashboardHome";
import AddProductPage from "./Components/AdminSide/AddProduct/AddProductPage";

const App = () => {
  return (
    <Router>
      <AdminPanelLayout>
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/add-product" element={<AddProductPage />} />
        </Routes>
      </AdminPanelLayout>
    </Router>
  );
};

export default App;
