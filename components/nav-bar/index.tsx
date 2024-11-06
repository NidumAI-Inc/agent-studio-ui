"use client";

import { LuMenu, LuX } from "react-icons/lu";

function NavBar() {

  function handleOpenSidebar() {
    document.querySelector(".app-container")?.classList.toggle("open")
  }

  return (
    <nav className="navbar df justify-between px-4 py-2">
      <div className="df w-44 md:[.minimise_&]:w-10 text-nowrap overflow-hidden transition-all duration-300">
        <img
          src="/logo.png"
          alt="Nidum-logo"
          className="h-9"
        />
        <p className=" text-lg font-bold tracking-widest">Voice Agent</p>
      </div>

      <button
        className="md:hidden p-1.5 text-lg bg-white/5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg outline outline-1 outline-white/10"
        onClick={handleOpenSidebar}
      >
        <LuX className="hidden [.open_&]:block" />
        <LuMenu className="[.open_&]:hidden" />
      </button>
    </nav>
  )
}

export default NavBar
