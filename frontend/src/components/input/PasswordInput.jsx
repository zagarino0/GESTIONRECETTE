// PasswordInput.js

import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordInput = ({ label, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        {label}
      </label>
      <div className="flex items-center">
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={value}
          onChange={onChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Entrez votre mot de passe..."
        />
        <div className="absolute right-0 pr-3">
          {showPassword ? (
            <FaEye onClick={togglePasswordVisibility} className="cursor-pointer" />
          ) : (
           
            <FaEyeSlash onClick={togglePasswordVisibility} className="cursor-pointer" />
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;
