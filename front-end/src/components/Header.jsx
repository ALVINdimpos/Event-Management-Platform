import { Outlet, Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div>
          <h1 className="text-white text-3xl font-bold">Eventify</h1>
        </div>
        <ul className="flex items-center space-x-6">
          <li>
            <Link
              to="/"
              className="text-white hover:text-gray-200 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/events"
              className="text-white hover:text-gray-200 transition duration-300"
            >
              Find Events
            </Link>
          </li>
          <li>
            <Link
             to="/login"
              className="bg-white text-purple-600 py-2 px-4 rounded-lg shadow-md hover:bg-gray-200 transition duration-300"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
