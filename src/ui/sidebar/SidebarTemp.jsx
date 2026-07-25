import React from "react";
import "./sidebar.css";
import {
  Store,
  LayoutGrid,
  Archive,
  ShoppingCart,
  MessageSquare,
  BarChart2,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="menu-side">
      <div className="menu-head">
        <div className="menu-logo">
          <Store size={20} color="#fff" />
        </div>

        <div className="menu-info">
          <h2>Minibaba Seller</h2>
          <p>Wholesale Panel</p>
        </div>
      </div>

      <div className="menu-list">
        <div className="menu-btn" onClick={() => navigate("/asosiypanel")}>
          <LayoutGrid size={18} />
          <span>Asosiy panel</span>
        </div>

        <div className="menu-btn" onClick={() => navigate("/")}>
          <Archive size={18} />
          <span>Mahsulotlar</span>
        </div>

        <div className="menu-btn" onClick={() => navigate("/buyurtmalar")}>
          <ShoppingCart size={18} />
          <span>Buyurtmalar</span>
        </div>

        <div className="menu-btn" onClick={() => navigate("/habarlar")}>
          <MessageSquare size={18} />
          <span>Xabarlar</span>
        </div>

        <div className="menu-btn" onClick={() => navigate("/statistika")}>
          <BarChart2 size={18} />
          <span>Statistika</span>
        </div>
      </div>

      <div className="menu-foot">
        <div className="menu-btn">
          <Settings size={18} />
          <span>Sozlamalar</span>
        </div>

        <div className="menu-profile">
          <div className="menu-img"></div>

          <div className="menu-info">
            <h2>Alijon Valiyev</h2>
            <p>Premium account</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;