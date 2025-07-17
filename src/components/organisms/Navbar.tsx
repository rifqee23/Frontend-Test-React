import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5';
import { FaShop } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'text-brand-yellow font-semibold' : 'hover:text-brand-yellow';

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className="text-brand-gray body-font border-b border-gray-200">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <div className="flex justify-between items-center w-full md:w-auto">
          <Link
            to={'/'}
            className="flex title-font font-medium items-center text-brand-gray"
          >
            <FaShop size={30} />
            <span className="ml-3 text-xl">Tailblocks</span>
          </Link>

          <button
            className="md:hidden text-brand-gray focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? <IoClose size={30} /> : <RxHamburgerMenu size={30} />}
            </svg>
          </button>
        </div>

        <nav className="hidden md:ml-auto md:flex md:flex-wrap items-center text-base justify-center gap-6">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>
        </nav>

        {isOpen && (
          <nav className="lg:hidden mt-4 flex flex-col gap-2 w-full">
            <NavLink to="/" className={navLinkClass} onClick={toggleMenu}>
              Home
            </NavLink>
            <NavLink to="/about" className={navLinkClass} onClick={toggleMenu}>
              About
            </NavLink>
            <NavLink
              to="/products"
              className={navLinkClass}
              onClick={toggleMenu}
            >
              Products
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}
