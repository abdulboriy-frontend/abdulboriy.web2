import React, { useEffect, useState } from "react";
import {
  Filter,
  ArrowUpDown,
  Plus,
  X,
  Trash2,
  Pencil,
  Eye,
  ShoppingBag
} from "lucide-react";

import "./mahsulot.css";

const Mahsulot = () => {
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(false);

  const [data, setData] = useState({
    name: "",
    price: "",
    imageUrl: "",
    category: "",
    minOrderQuantity: 1
  });

  async function getProducts() {
    try {
      const response = await fetch(
        "https://uzum-api.onrender.com/api/products"
      );

      

      const result = await response.json();
      setProducts(result.data || []);
    } catch (error) {
      console.log( error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  function changeInput(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  async function saveProduct(e) {
    e.preventDefault();

    const productData = {
      name: data.name,
      price: Number(data.price),
      imageUrl: data.imageUrl,
      category: data.category,
      minOrderQuantity: Number(data.minOrderQuantity),
      seller: "6a48bf6f633925fbd368a17e"
    };

    try {
      const response = await fetch(  
          "https://uzum-api.onrender.com/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(productData)
        }
      );

      if (response.ok) {
        alert("Mahsulot saqlandi");
        await getProducts();
        setModal(false);
        setData({
          name: "",
          price: "",
          imageUrl: "",
          category: "",
          minOrderQuantity: 1
        });
      }
    } catch (error) {
      console.log( error);
    }
  }

  async function deleteProduct(id) {
    try {
      const response = await fetch(
        `https://uzum-api.onrender.com/api/products/${id}`,
        {
          method: "DELETE"
        }
      );

      if (response.ok) {
        getProducts();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mahsulotlar-page">
      <div className="mahsulotlar-top">
        <div className="mahsulotlar-tabs">
          <div className="m-tab m-tab-active">
            Barchasi ({products.length})
          </div>
          <div className="m-tab">Faol</div>
          <div className="m-tab">Qoralama</div>
        </div>

        <div className="mahsulotlar-actions">
          <button className="filter-btn">
            <Filter size={15} /> Filter
          </button>
          <button className="filter-btn">
            <ArrowUpDown size={15} /> Saralash
          </button>
        </div>
      </div>

      <div className="mahsulotlar-list">
        {products.map((item) => {
          const productId = item._id || item.id;

          return (
            <div className="product-card" key={productId}>
              <img src={item.imageUrl} alt={item.name} />

              <div className="product-info">
                <div className="product-header">
                  <span className="status-badge status-active">FAOL</span>
                  <span className="sku-text">
                    SKU: {item.sku || "MB-TSH-001"}
                  </span>
                </div>

                <h3 className="product-title">{item.name}</h3>

                <p className="product-price">
                  {Number(item.price).toLocaleString()} UZS
                </p>

                <div className="product-meta">
                  <span>
                    <ShoppingBag size={14} /> MOQ: {item.minOrderQuantity || 1} dona
                  </span>
                  <span>
                    <Eye size={14} /> 1.2k ko'rilgan
                  </span>
                </div>
              </div>

              <div className="card-icons">
                <button className="action-icon-btn">
                  <Pencil size={16} />
                </button>
                <button
                  className="action-icon-btn delete"
                  onClick={() => deleteProduct(productId)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <button className="fab-btn" onClick={() => setModal(true)}>
        <Plus size={16} /> Yangi mahsulot
      </button>

      {modal && (
        <div className="modal">
          <div className="modal-box">
            <button type="button" className="close" onClick={() => setModal(false)} >   <X />   </button>

            <h2>Yangi mahsulot</h2>

            <form onSubmit={saveProduct}>
              <input name="name" placeholder="Mahsulot nomi" value={data.name} onChange={changeInput} reqired />

              <input name="price" type="number" placeholder="Narxi" value={data.price} onChange={changeInput} required />

              <input name="imageUrl" placeholder="Rasm linki" value={data.imageUrl} onChange={changeInput} required />

              <input name="category" placeholder="Kategoriya" value={data.category} onChange={changeInput} required />

              <input name="minOrderQuantity" type="number" placeholder="Minimal buyurtma" value={data.minOrderQuantity} onChange={changeInput} />

              <button type="submit" className="save">
                Saqlash
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mahsulot;