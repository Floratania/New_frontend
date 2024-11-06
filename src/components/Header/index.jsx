// src/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="bg-yellow-500 text-black py-4">
      <ul className="flex justify-center space-x-8">
        <li>
          <Link 
            to="/horisontal" 
            className="hover:bg-blue-700 px-4 py-2 rounded transition duration-300"
          >
            Горизонтальний світлофор
          </Link>
        </li>
        <li>
          <Link 
            to="/vertikal" 
            className="hover:bg-blue-700 px-4 py-2 rounded transition duration-300"
          >
            Вертикальний світлофор
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
