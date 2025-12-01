import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">FraudShield AI</h2>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        {isDark ? <MdLightMode size={24} /> : <MdDarkMode size={24} />}
      </button>
    </nav>
  );
};

export default Navbar;