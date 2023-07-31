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
    <Link
      href={href}
      tw="flex items-center bg-white text-slate-400 uppercase transition-all px-4 py-2 border-b-2 border-slate-200 rounded-full hover:text-purple-400 hover:border-purple-400"
    >
      {children}
    </Link>
  );
};

export const Navbar = () => {
  const { state } = useContext(CartContext);
  const cartItemsCount = state.cartItems.length;
  const { user, isAuthenticated } = useAuth0();
  const isAdmin = user ? user['https://your-namespace.com/roles'].includes('admin') : false; // Asegúrate de que la ruta sea correcta para tu configuración

  console.log('User object:', user); // Esto imprimirá el objeto de usuario en la consola

  return (
    <nav tw="bg-white fixed top-0 w-full flex justify-center transition-all gap-5 py-5 border-b border-slate-200">
      <NavbarLink href="/">Home</NavbarLink>
      <NavbarLink href="/games">Games</NavbarLink>
      <NavbarLink href="/cart">Cart ({cartItemsCount})</NavbarLink>
      {isAuthenticated && isAdmin && <NavbarLink href="/admin">Admin</NavbarLink>} {/* Mostrar enlace de administración solo si está autenticado y es administrador */}
      <Auth0Menu />
    </nav>
  );
};
