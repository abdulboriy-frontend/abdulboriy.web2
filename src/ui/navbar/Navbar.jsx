import React from "react";
import "./Navbar.css";
import { Search, Bell } from "lucide-react";

const Navbar = () => {
  return (
    <div className="header3">
      <div className="header-title3">Mahsulotlar</div>

      <div className="header-search3">
        <Search size={16} color="#9CA3AF" />
        
        <input type="text"  placeholder="Mahsulot nomi yoki SKU bo'yicha qidiruv..."/>
      </div>

      <div className="header-bell3">
        <Bell size={20} color="#374151" />
      </div>
    </div>
  );
};

export default Navbar;