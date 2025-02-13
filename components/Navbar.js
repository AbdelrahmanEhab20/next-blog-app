"use client";
import React, { useState } from "react";
import {
  AiOutlineHome,
  AiOutlinePlusCircle,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineCustomerService,
} from "react-icons/ai";
import { MdOutlinePostAdd } from "react-icons/md";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo/Brand Name */}
          <Link href="/">
            <div className="flex gap-2">
              <AiOutlineCustomerService size={24} />
              <h1 className="text-xl font-semibold">Blog Next</h1>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              {isOpen ? (
                <AiOutlineClose size={24} />
              ) : (
                <AiOutlineMenu size={24} />
              )}
            </button>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex md:items-center md:space-x-6">
            <li>
              <Link
                href="/"
                className="flex items-center hover:text-gray-300 transition duration-200"
              >
                <AiOutlineHome className="mr-2" />
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/posts"
                className="flex items-center hover:text-gray-300 transition duration-200"
              >
                <MdOutlinePostAdd className="mr-2" />
                Posts
              </Link>
            </li>
            <li>
              <Link
                href="/posts/create"
                className="flex items-center hover:text-gray-300 transition duration-200"
              >
                <AiOutlinePlusCircle className="mr-2" />
                Add New Post
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Menu */}
        <ul
          className={`md:hidden mt-4 space-y-3 ${
            isOpen ? "block" : "hidden"
          } transition-all duration-300`}
        >
          <li>
            <Link
              href="/"
              className="flex items-center p-2 hover:bg-gray-700 rounded transition duration-200"
              onClick={() => setIsOpen(false)}
            >
              <AiOutlineHome className="mr-2" />
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/posts"
              className="flex items-center p-2 hover:bg-gray-700 rounded transition duration-200"
              onClick={() => setIsOpen(false)}
            >
              <MdOutlinePostAdd className="mr-2" />
              Posts
            </Link>
          </li>
          <li>
            <Link
              href="/posts/create"
              className="flex items-center p-2 hover:bg-gray-700 rounded transition duration-200"
              onClick={() => setIsOpen(false)}
            >
              <AiOutlinePlusCircle className="mr-2" />
              Add New Post
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
