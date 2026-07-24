import React from "react";
import "./card.css";
import { Pencil, Trash2, RefreshCw } from "lucide-react";

const Card = ({ a }) => {
  return (
    <div className="item-card">
      <img
        className="item-photo"
        src={a.imageUrl}
        alt={a.name}
      />

      <div className="item-info">
        <div className="item-head">
          <span className="item-code">
            SKU: {a.slug}
          </span>
        </div>

        <h3 className="item-title">{a.name}</h3>

        <p className="item-cost">
          {a.discountedPrice} - {a.price} {a.currnecy}
        </p>

        <div className="item-detail">
          <span>
            <RefreshCw size={13} />
            MOQ: {a.minOrderQuantity}
          </span>
        </div>
      </div>

      <div className="item-buttons">
        <button className="edit-btn">
          <Pencil size={16} />
        </button>

        <button className="delete-btn">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default Card;