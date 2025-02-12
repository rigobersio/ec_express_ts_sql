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
    <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-[#5D9C59] text-yellow-50 transition">
      <ul className="text-center text-xl p-1">
        <li className="my-4 py-4 border-slate-400 hover:bg-slate-400 hover:rounded">
          <LinkRouter to="/" onClick={handleClick}>
            Inicio
          </LinkRouter>
        </li>
        <li className="my-4 py-4 border-slate-400 hover:bg-slate-400 hover:rounded">
          <LinkRouter to="/products" onClick={handleClick}>
            Productos
          </LinkRouter>
        </li>
        <li className="my-4 py-4 border-slate-400 hover:bg-slate-400 hover:rounded">
          <LinkRouter to="/about" onClick={handleClick}>
            Nosotros
          </LinkRouter>
        </li>
        <li className="my-4 py-4 border-slate-400 hover:bg-slate-400 hover:rounded">
          <LinkScroll to="contact" smooth={true} duration={500} onClick={handleClick}>
            Contacto
          </LinkScroll>
        </li>
        {user ? (
          <>
            <li className="my-4 py-4 border-slate-400 hover:bg-slate-400 hover:rounded">
              <span>Hola, {user}</span>
            </li>
            {role === 'admin' && (
              <li className="my-4 py-4 border-slate-400 hover:bg-slate-400 hover:rounded">
                <LinkRouter to="/admin" onClick={handleClick}>
                  Admin
                </LinkRouter>
              </li>
            )}
            <li className="my-4 py-4 border-slate-400 hover:bg-slate-400 hover:rounded">
              <button onClick={handleLogout}>Cerrar Sesión</button>
            </li>
          </>
        ) : (
          <li className="my-4 py-4 border-slate-400 hover:bg-slate-400 hover:rounded">
            <LinkRouter to="/login" onClick={handleClick}>
              Iniciar Sesión
            </LinkRouter>
          </li>
        )}
        <li className="my-4 py-4 border-slate-400 hover:bg-slate-400 hover:rounded">
          <LinkRouter to="/cart" onClick={handleClick}>
            Carrito
          </LinkRouter>
        </li>
        <li className="my-4 py-4 border-slate-400 hover:bg-slate-400 hover:rounded">
          <button>EN</button>
        </li>
      </ul>
    </div>
  );

  return (
    <nav>
      <div className="h-10vh flex justify-between z-50 bg-[#5D9C59] text-yellow-50 lg:py-5 pl-20 pr-1 py-4">
        <div className="flex items-center justify-between w-[40%]">
          <span className="text-3xl font-bold mr-3 lg:mr-0"><MdOutlineAddReaction /></span>
          <div className="lg:hidden flex items-center ml-3 space-x-4">
            <button className="w-8 h-8">
              <img src="/flag-chile.svg" alt="Chile Flag" className="w-full h-full object-cover" />
            </button>
            <button className="w-8 h-8">
              <img src="/flag-united-kingdom.svg" alt="UK Flag" className="w-full h-full object-cover" />
            </button>
          </div>
        </div>
        <div className="lg:flex items center justify-end font-normal hidden text-2xl">
          <div className="flex">
            <ul className="flex gap-8 text-[18]">
              <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                <LinkRouter to="/">Inicio</LinkRouter>
              </li>
              <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                <LinkRouter to="/products">Productos</LinkRouter>
              </li>
              <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                <LinkRouter to="/about">Nosotros</LinkRouter>
              </li>
              <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                <LinkScroll to="contact" smooth={true} duration={500}>Contacto</LinkScroll>
              </li>
              {user ? (
                <>
                  <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                    <span>Hola, {user}</span>
                  </li>
                  {role === 'admin' && (
                    <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                      <LinkRouter to="/admin">Admin</LinkRouter>
                    </li>
                  )}
                  <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                  </li>
                </>
              ) : (
                <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                  <LinkRouter to="/login">Iniciar Sesión</LinkRouter>
                </li>
              )}
              <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                <LinkRouter to="/cart">Carrito</LinkRouter>
              </li>
              <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                <button>EN</button>
              </li>
            </ul>
          </div>
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          <button className="w-8 h-8">
            <img src="/flag-chile.svg" alt="Chile Flag" className="w-full h-full object-cover" />
          </button>
          <button className="w-8 h-8">
            <img src="/flag-united-kingdom.svg" alt="UK Flag" className="w-full h-full object-cover" />
          </button>
        </div>
        <div>{click && content}</div>
        <button className="block lg:hidden transition pr-4" onClick={handleClick}>{click ? <FaTimes /> : <CiMenuFries />}</button>
      </div>
    </nav>
  );
};

export default NavBar;