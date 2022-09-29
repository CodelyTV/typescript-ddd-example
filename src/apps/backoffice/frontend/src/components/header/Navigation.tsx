import React from 'react';
import logo from './logo.svg';
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-900 p-5">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
            <NavLink to="/">
                <img src={logo} alt="" width="150px" />
            </NavLink>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
                <NavLink to="#" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                    Usuarios
                </NavLink>
                <NavLink to="/courses" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                    Cursos
                </NavLink>
                <NavLink to="#" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                    Vídeos
                </NavLink>
            </div>
            <div>
                <NavLink to="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
                    Entrar
                </NavLink>
            </div>
        </div>
    </nav>
  );
}

export default Navigation;
