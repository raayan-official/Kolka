import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import kolkaLogo from "../assets/kolka.png";
import avararImg from "../assets/hand.jpg";
import CartModel from "../pages/shop/CartModel";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const products = useSelector((state) => state.cart.products);
  const { user } = useSelector((state) => state.auth); // Access the user from auth state
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Get the profile picture from user or fallback to default
  const profilePic = user?.profilePic || avararImg;

 // Dropdown Menus for admin and regular user
const adminDropDownMenu = [
  { label: "Dashboard", path: "/dashboard/admin/Dashboard"}, // Main dashboard home page
  { label: "Manage Items", path: "/dashboard/admin/manage-products" }, // Manage products
  { label: "All Orders", path: "/dashboard/admin/manage-orders" }, // Manage orders
  { label: "Add New Post", path: "/dashboard/admin/add-new-post" } // Add a new post
];

  const userDropDownMenu = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "Payments", path: "/dashboard/payments" },
    { label: "Orders", path: "/dashboard/orders" }
  ];

  const dropDownMenus = user?.role === 'admin' ? adminDropDownMenu : userDropDownMenu;

  const handleDropDownToggle = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Failed to logout:", error.message || error);
    }
  };

  return (
    <header className="w-full bg-white shadow-lg z-50 relative">
      <nav className="max-w-screen-2xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={kolkaLogo}
            alt="Kolka Logo"
            className="h-10 w-auto md:h-14"
          />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6">
          {["Home", "Shop", "About Us", "Contact Us"].map((item, index) => (
            <li key={index}>
              <NavLink
                to={
                  item === "Home"
                    ? "/"
                    : `/${item.toLowerCase().replace(" ", "")}`
                }
                className={({ isActive }) =>
                  `hover:text-primary ${
                    isActive ? "text-primary" : "text-primary-dark"
                  }`
                }
              >
                {item}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <Link to="/search" aria-label="Search">
            <i className="ri-search-line text-xl md:text-2xl hover:text-primary"></i>
          </Link>
          <span>
            {user ? (
              <>
                <img
                  onClick={handleDropDownToggle}
                  src={profilePic} // Display profile pic or fallback
                  alt="User Avatar"
                  className="size-7 cursor-pointer rounded-full"
                />
                {isDropDownOpen && (
                  <div className="absolute bg-white shadow-lg z-50  p-2 rounded-md mt-2  right-0">
                    <ul className="space-y-2 p-2">
                      {dropDownMenus.map((menu, index) => (
                        <li key={index}>
                          <Link
                            onClick={() => setIsDropDownOpen(false)}
                            className="block text-primary px-4 py-2 hover:bg-primary-light rounded-md"
                            to={menu.path}
                          >
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                       <li><Link onClick={handleLogout} className="block text-primary px-4 py-2 hover:bg-primary-light rounded-md">Logout</Link></li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login" aria-label="Account">
                <i className="ri-account-circle-line text-xl md:text-2xl hover:text-primary"></i>
              </Link>
            )}
          </span>
          <button
            onClick={handleCartToggle}
            aria-label="Cart"
            className="relative"
          >
            <i className="ri-shopping-cart-2-line text-xl md:text-2xl hover:text-primary"></i>
            <sup className="absolute -top-1 -right-2 bg-primary text-white text-xs rounded-full px-1">
              {products?.length || 0}
            </sup>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="text-black md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <i className="ri-close-line text-2xl"></i>
            ) : (
              <i className="ri-menu-line text-2xl"></i>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute bg-white shadow-lg p-2 rounded-md mt-2 right-0">
          <ul className="space-y-2">
            {["Home", "Shop", "About Us", "Contact Us"].map((item, index) => (
              <li key={index}>
                <NavLink
                  to={
                    item === "Home"
                      ? "/"
                      : `/${item.toLowerCase().replace(" ", "")}`
                  }
                  className={({ isActive }) =>
                    `hover:text-primary-light block  px-4 py-2 rounded-md ${
                      isActive ? "text-primary" : "text-primary-dark"
                      }`
                  }
                  onClick={() => setIsMenuOpen(false)} // Close menu on link click
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Cart Modal */}
      {isCartOpen && (
        <CartModel
          products={products}
          isOpen={isCartOpen}
          onClose={handleCartToggle}
        />
      )}
    </header>
  );
};

export default Navbar;
