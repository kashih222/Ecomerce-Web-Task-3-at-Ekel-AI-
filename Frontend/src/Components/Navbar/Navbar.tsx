import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from '../../assets/Logo.png'





const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [OpenLogin, setOpenLogin] = useState(false); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [openSignup, setOpenSignup] = useState(false);
  const [name, setName] = useState("");
  

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
  }


  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">

        
        <NavLink to="/" className="">
          <img src={logo} alt="logo" className="w-[100px] hover:scale-95 duration-400 sm:w-[150px]  md:w-190px lg:w-200px xl:w-[200px]"  />
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 text-lg font-medium">
          <li><NavLink to="/" className="hover:text-black  duration-200">Home</NavLink></li>
          <li><NavLink to="/products" className="hover:text-black duration-200">Products</NavLink></li>
          <li><NavLink to="/about" className="hover:text-black duration-200">About</NavLink></li>
          <li><NavLink to="/contact" className="hover:text-black duration-200">Contact</NavLink></li>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4">
          <button className="px-5 py-2 border border-black text-black rounded-full hover:bg-black hover:scale-95 hover:text-white duration-300"
          onClick={() => setOpenLogin(true)}>
            Login

          </button>
          <button className="px-5 py-2 bg-black text-white rounded-full hover:scale-95 duration-300"
          onClick={() => setOpenSignup(true)}>
          
            Sign Up
          </button>
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={30} /> : <Menu size={30} />}
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-md py-4 px-6 space-y-6">
          <ul className="flex flex-col gap-4 text-gray-700 font-medium">
            <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
            <li><Link to="/products" onClick={() => setOpen(false)}>Products</Link></li>
            <li><Link to="/about" onClick={() => setOpen(false)}>About</Link></li>
            <li><Link to="/contact" onClick={() => setOpen(false)}>Contact</Link></li>
          </ul>

          {/* Mobile Buttons */}
          <div className="flex flex-col gap-3 pt-4">
            <button className="px-5 py-2 border border-black text-black rounded-full hover:scale-90 hover:text-white duration-300"
            onClick={() => setOpenLogin(true)}>
              Login
            </button>
            <button className="px-5 py-2 bg-black text-white rounded-full hover:scale-90 duration-300"
            onClick={() => setOpenSignup(true)}>
              Sign Up
            </button>
          </div>
        </div>
      )}

     
      {OpenLogin && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          {/* Modal Box */}
          <div className="bg-white rounded-lg w-11/12 sm:w-96 p-6 relative shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => setOpenLogin(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-900"
            >
              ✕
            </button>

            {/* Modal Content */}
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
              />
              <button
                type="submit"
                className="bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700 transition"
              >
                Login
              </button>
            </form>

            {/* Extra Links */}
            <p className="text-sm text-gray-500 mt-4 text-center">
              Don't have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => {
                  setOpenLogin(false);
                  setOpenSignup(true);}}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      )}

     
     
      {openSignup && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          {/* Modal Box */}
          <div className="bg-white rounded-lg w-11/12 sm:w-96 p-6 relative shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => setOpenSignup(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-900"
            >
              ✕
            </button>

            {/* Modal Content */}
            <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
            <form onSubmit={handleSignup} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
              />
              <button
                type="submit"
                className="bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700 transition"
              >
                Sign Up
              </button>
            </form>

            {/* Extra Links */}
            <p className="text-sm text-gray-500 mt-4 text-center">
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => {
                  setOpenLogin(true);
                  setOpenSignup(false);
                  
                }}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      )}
     
    </nav>
  );
};

export default Navbar;
