import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";
import { Auth0Menu } from "./Auth0Menu";
import { useContext } from 'react';
import { CartContext } from '../../lib/context/CartContext';

const NavbarLink: React.FC<{
  children: any;
  href: string;
}> = ({ children, href }) => {
  return (
    <Link href={href} passHref>
      <div className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer">{children}</div>
    </Link>
  );
};

export const Navbar = ({ setIsCartOpen }) => {
  const { state } = useContext(CartContext);
  const cartItemsCount = state.cartItems.length;
  const { user, isAuthenticated } = useAuth0();
  const isAdmin = user ? user['https://your-namespace.com/roles'].includes('admin') : false;

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="logo.png"
              alt=""
            />
          </a>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <NavbarLink href="/">Home</NavbarLink>
          <NavbarLink href="/games">Games</NavbarLink>
          {isAuthenticated && isAdmin && <NavbarLink href="/admin">Admin</NavbarLink>}
        </div>
        <div className="flex lg:flex-1 lg:justify-end">
          <button onClick={handleOpenCart} type="button" className="inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.5rem] w-[3.875rem] rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 mr-4">
            <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M5.071 1.243a.5.5 0 0 1 .858.514L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 6h1.717L5.07 1.243zM3.5 10.5a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3z"/>
            </svg>
            ({cartItemsCount})
          </button>
          <Auth0Menu />
        </div>
      </nav>
    </header>
  );
};
