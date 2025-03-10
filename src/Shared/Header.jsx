import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../Auth/useAuth';

const Header = () => {
  const {user, logOut} = useAuth();
  const handleLogout = () => {
    logOut()
};
    const links = <>
        <li className='font-semibold'>
            <NavLink className={({ isActive }) => isActive ? 'text-blue-500 bg-slate-200' : ''} to={`/`}>Home</NavLink>
        </li>
        <li className='font-semibold'>
            <NavLink className={({ isActive }) => isActive ? 'text-blue-500 bg-slate-200' : ''} to={`/registration`}>Registration</NavLink>
        </li>
        <li className='font-semibold'>
            <NavLink className={({ isActive }) => isActive ? 'text-blue-500 bg-slate-200' : ''} to={`/login`}>Login</NavLink>
        </li>
        <li className='font-semibold'>
            <NavLink className={({ isActive }) => isActive ? 'text-blue-500 bg-slate-200' : ''} to={`/form`}>Form</NavLink>
        </li>
        <li className='font-semibold'>
            <NavLink className={({ isActive }) => isActive ? 'text-blue-500 bg-slate-200' : ''} to={`/payment`}>Payment</NavLink>
        </li>
    </>
    return (
<div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {links}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
        {links}
    </ul>
  </div>
  <div className="navbar-end">
    <div className='mr-4'>
      {user?.email && <p>{user?.email}</p>}
    </div>
    {
      user?.email ? <a onClick={handleLogout} className="btn">Logout</a> : <Link className='btn' to={`/login`}>Login</Link>
    }
  </div>
</div>
    );
};

export default Header;