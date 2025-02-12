import React, { useState } from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import { Link as LinkScroll } from 'react-scroll';
import { FaTimes } from 'react-icons/fa';
import { CiMenuFries } from 'react-icons/ci';
import { MdOutlineAddReaction } from 'react-icons/md';
import { useStore } from '../store/store';

const NavBar: React.FC = () => {
  const [click, setClick] = useState(false);
  const user = useStore((state) => state.user);
  const role = useStore((state) => state.role);
  const setUser = useStore((state) => state.setUser);
  const setToken = useStore((state) => state.setToken);
  const setRole = useStore((state) => state.setRole);

  const handleClick = () => setClick(!click);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setRole(null);
    setClick(false);
  };

  const content = (
    <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-[#061609] text-white transition">
      <ul className="text-center text-xl p-1">
        <li className="my-4 py-4 border-gray-400 hover:bg-gray-400 hover:rounded">
          <LinkRouter to="/" onClick={handleClick}>
            Inicio
          </LinkRouter>
        </li>
        <li className="my-4 py-4 border-gray-400 hover:bg-gray-400 hover:rounded">
          <LinkRouter to="/products" onClick={handleClick}>
            Productos
          </LinkRouter>
        </li>
        <li className="my-4 py-4 border-gray-400 hover:bg-gray-400 hover:rounded">
          <LinkRouter to="/about" onClick={handleClick}>
            Nosotros
          </LinkRouter>
        </li>
        <li className="my-4 py-4 border-gray-400 hover:bg-gray-400 hover:rounded">
          <LinkScroll to="contact" smooth={true} duration={500} onClick={handleClick}>
            Contacto
          </LinkScroll>
        </li>
        {user ? (
          <>
            <li className="my-4 py-4 border-gray-400 hover:bg-gray-400 hover:rounded">
              <span>Hola, {user}</span>
            </li>
            {role === 'admin' && (
              <li className="my-4 py-4 border-gray-400 hover:bg-gray-400 hover:rounded">
                <LinkRouter to="/admin" onClick={handleClick}>
                  Admin
                </LinkRouter>
              </li>
            )}
            <li className="my-4 py-4 border-gray-400 hover:bg-gray-400 hover:rounded">
              <button onClick={handleLogout}>Cerrar Sesión</button>
            </li>
          </>
        ) : (
          <li className="my-4 py-4 border-gray-400 hover:bg-gray-400 hover:rounded">
            <LinkRouter to="/login" onClick={handleClick}>
              Iniciar Sesión
            </LinkRouter>
          </li>
        )}
        <li className="my-4 py-4 border-gray-400 hover:bg-gray-400 hover:rounded">
          <LinkRouter to="/cart" onClick={handleClick}>
            Carrito
          </LinkRouter>
        </li>
        <li className="my-4 py-4 border-gray-400 hover:bg-gray-400 hover:rounded">
          <button>EN</button>
        </li>
      </ul>
    </div>
  );

  return (
    <nav id="navbar" className="bg-[#061609] text-white fixed w-full z-10 top-0 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <LinkRouter to="/" className="nav-title">E-Commerce</LinkRouter>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8 nav-items">
              <LinkRouter to="/" className="nav-item">Inicio</LinkRouter>
              <LinkRouter to="/products" className="nav-item">Productos</LinkRouter>
              <LinkRouter to="/about" className="nav-item">Nosotros</LinkRouter>
              <LinkScroll to="contact" smooth={true} duration={500} className="nav-item">Contacto</LinkScroll>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <>
                <span className="nav-item">Hola, {user}</span>
                {role === 'admin' && (
                  <LinkRouter to="/admin" className="nav-item">Admin</LinkRouter>
                )}
                <button onClick={handleLogout} className="nav-item">Cerrar Sesión</button>
              </>
            ) : (
              <LinkRouter to="/login" className="nav-item">Iniciar Sesión</LinkRouter>
            )}
            <LinkRouter to="/cart" className="nav-item">Carrito</LinkRouter>
            <button className="nav-item">EN</button>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500" onClick={handleClick}>
              {click ? <FaTimes /> : <CiMenuFries />}
            </button>
          </div>
        </div>
      </div>
      {click && content}
    </nav>
  );
};

export default NavBar;