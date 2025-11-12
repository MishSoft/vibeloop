"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Plus, LibraryBig } from "lucide-react";
import Item from "./Item";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSideBar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <aside
        className={`fixed  ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } top-15 bg-background w-75  h-[90vh] lg:translate-x-0 duration-200 p-2 overflow-y-auto`}
      >
        <div className="flex justify-between text-primary items-center p-2 mb-4">
          <h2 className="font-semibold text-sm">Your Library</h2>
          <Link
            className="hover:bg-color-hover p-1 rounded-full"
            href={"upload-song"}
          >
            <Plus size={15} />
          </Link>
        </div>
        <div>
          <Item />
          <Item />
          <Item />
          <Item />
        </div>
      </aside>
      <button
        onClick={handleSideBar}
        className="fixed lg:hidden bottom-5 left-5 bg-background w-10 h-10 grid place-items-center text-white rounded-full z-50 cursor-pointer"
      >
        <LibraryBig size={15} />
      </button>
    </div>
  );
}
