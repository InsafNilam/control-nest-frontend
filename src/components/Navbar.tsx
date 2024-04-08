import { useState } from "react";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

import logo from "../assets/Logo.png";

export const Navbar = () => {
  const token = sessionStorage.getItem("token");
  const [burgerStatus, setBurgerStatus] = useState(false);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.pathname = "/auth/login";
  };

  return (
    <nav className="fixed overflow-hidden h-[60px] w-full bg-gray-900 border-gray-600 z-10">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
        <Link
          to="/dashboard"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-8" alt="ControlNest Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            ControlNest
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-9 h-9 justify-center text-sm rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2  text-gray-400 bg-gray-700 focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className="hidden w-full sm:flex-1 sm:block sm:w-auto"
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col justify-end pr-10 mt-4 border  rounded-lg sm:flex-row sm:space-x-8 rtl:space-x-reverse sm:mt-0 sm:border-0  bg-gray-800 sm:bg-gray-900 border-gray-700">
            <li>
              <Link
                to="/dashboard"
                className={({ isActive }) =>
                  `block p-0 bg-transparent ${
                    isActive
                      ? "hover:text-gray-700 text-blue-500"
                      : "hover:text-blue-500 text-white"
                  }`
                }
                aria-current="page"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/location"
                className={({ isActive }) =>
                  `block p-0 bg-transparent ${
                    isActive
                      ? "hover:text-gray-700 text-blue-500"
                      : "hover:text-blue-500 text-white"
                  }`
                }
              >
                Locations
              </Link>
            </li>
            <li>
              <Link
                to="/device"
                className={({ isActive }) =>
                  `block p-0 bg-transparent ${
                    isActive
                      ? "hover:text-gray-700 text-blue-500"
                      : "hover:text-blue-500 text-white"
                  }`
                }
              >
                Devices
              </Link>
            </li>
          </ul>
        </div>
        <button className="hidden relative sm:inline-flex items-center justify-center overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
          <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            {token ? "Logout" : "Login"}
          </span>
        </button>
      </div>
    </nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  overflow: hidden;
  height: 60px;
  width: 100%;
  background: #5161ce;
  display: flex;
  align-items: center;
  padding: 0 16px;
  overflow-x: hidden;
  z-index: 5;
`;

const Logo = styled.img`
  cursor: pointer;
  height: 40px;
`;

const NavMenu = styled.div`
  display: flex;
  padding: 0 32px;
  flex: 1;

  a {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;

    span {
      position: relative;
      font-size: 16px;
      margin: 0 5px;
      letter-spacing: 1.42px;

      &:after {
        position: absolute;
        background: white;
        content: "";
        height: 2px;
        bottom: -6px;
        right: 0px;
        left: 0px;
        transform-origin: center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
      }
    }

    &:hover {
      span:after {
        transform: scaleX(1);
      }
    }

    @media (max-width: 900px) {
      display: none;
    }
  }
`;

const BurgerNav = styled.div`
  position: relative;
  display: none;
  position: fixed;
  top: 60px;
  bottom: 0;
  right: 0;
  width: 200px;
  background: orange;
  transform-origin: right;
  transition: transform 0.2s ease-in;
  z-index: 10;

  li {
    list-style: none;
    padding: 8px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);

    a {
      cursor: pointer;
      display: flex;
      align-items: center;
      flex: 1;

      span {
        padding: 12px;
      }
    }
  }

  @media (max-width: 900px) {
    display: block;
  }
`;

const RightMenu = styled.div`
  display: none;
  @media (max-width: 900px) {
    display: block;
  }
`;

const Button = styled.div`
  background: transparent;
  border-radius: 24px;
  border: 2px solid #50c878;
  width: 110px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease 0s;
  span {
    font-size: 20px;
    padding-bottom: 2px;
  }

  @media (max-width: 900px) {
    display: none;
  }
  &:hover {
    border: none;
    box-shadow: 0 0 0 2px #909090;
    background: linear-gradient(
      246deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(80, 200, 120, 0.969625350140056) 35%,
      rgba(0, 212, 255, 1) 100%
    );
  }
`;

const BurgerNavButton = styled.div`
  margin: 0 10px;
  height: 50px;
  position: absolute;
  bottom: 24px;
  right: 0;
  left: 0;
  display: flex;
  border: 2px solid #50c878;
  border-radius: 24px;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease 0s;

  span {
    font-size: 20px;
  }

  &:hover {
    border: none;
    box-shadow: 0 0 0 2px #909090;
    background: linear-gradient(
      246deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(80, 200, 120, 0.969625350140056) 35%,
      rgba(0, 212, 255, 1) 100%
    );
  }
`;

const NavContainer = styled(Link)`
  padding: 10px;
  margin: 10px 10px 0px;
  height: 50px;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

  &.active {
    border-top: 1px solid white;
    border-radius: 10px 10px 0 0;
    color: orange;
    // background: linear-gradient(to top left, #7c9e62, #400e33);

    &:after,
    &:before {
      content: "";
      height: 41px;
      width: 40px;
      border: 1px solid white;
      border-top: 0;
      position: absolute;
      bottom: 0;
    }
    &:after {
      right: -41px;
      border-right: 0;
      border-bottom-left-radius: 18px;
    }
    &:before {
      left: -41px;
      border-left: 0;
      border-bottom-right-radius: 18px;
    }
  }
`;
