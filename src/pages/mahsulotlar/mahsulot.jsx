import React, { useEffect, useState } from "react";
import axios from "axios";
import { Filter, ArrowUpDown, Plus, X, Trash2, Pencil, Eye, ShoppingBag } from "lucide-react";
import "./mahsulot.css";

const Mahsulot = () => {
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const [data, setData] = useState({
    name: "",
    price: "",
    imageUrl: "",
    category: "",
    minOrderQuantity: 1,
  });

  useEffect(() => { getProducts(); }, []);

  async function getProducts() {
    try {
      const { data } = await axios.get("https://uzum-api.onrender.com/api/products");
      setProducts(data.data || []);
    } catch (error) {
      console.log(error);
    }
  }

  function changeInput(e) {
    const { name, value } = e.target;
    setData(old => ({ ...old, [name]: value }));
  }

  async function saveProduct(e) {
    e.preventDefault();

    try {
      await axios.post("https://uzum-api.onrender.com/api/products", {
        name: data.name,
        price: Number(data.price),
        imageUrl: data.imageUrl,
        category: data.category,
        minOrderQuantity: Number(data.minOrderQuantity),
        seller: "6a48bf6f633925fbd368a17e",
      });

      await getProducts();
      setModal(false);
      setData({ name: "", price: "", imageUrl: "", category: "", minOrderQuantity: 1 });
      alert("Mahsulot muvaffaqiyatli saqlandi!");
    } catch (error) {
      console.log(error);
      alert("Mahsulotni saqlashda xatolik!");
    }
  }

  function openDeleteModal(id) {
    setSelectedProductId(id);
    setDeleteModal(true);
  }

  async function confirmDelete() {
    if (!selectedProductId) return;

    const idToDelete = selectedProductId;

    setProducts(prevProducts => prevProducts.filter(item => (item._id || item.id) !== idToDelete));
    setDeleteModal(false);
    setSelectedProductId(null);

    try {
      await axios({ 
        method: "DELETE", 
        url: `https://uzum-api.onrender.com/api/products/${idToDelete}` 
      });
    } catch (error) {
      console.log(error);
      alert("Mahsulotni serverdan o'chirishda xatolik yuz berdi!");
      getProducts(); 
    }
  }

  function closeModal() {
    setModal(false);
    setData({ name: "", price: "", imageUrl: "", category: "", minOrderQuantity: 1 });
  }

  return (
    <div className="mahsulotlar-page">

      <div className="mahsulotlar-top">
        <div className="mahsulotlar-tabs">
          <div className="m-tab m-tab-active">Barchasi ({products.length})</div>
          <div className="m-tab">Faol</div>
          <div className="m-tab">Qoralama</div>
        </div>

        <div className="mahsulotlar-actions">
          <button className="filter-btn"><Filter size={15} /> Filter</button>
          <button className="filter-btn"><ArrowUpDown size={15} /> Saralash</button>
        </div>
      </div>

      <div className="mahsulotlar-list">
        {products.length === 0 ? (
          <h3 className="empty-text">Hozircha mahsulot yo'q</h3>
        ) : (
          products.map((item) => {
            const productId = item._id || item.id;
            const image = item.imageUrl || item.image || item.imageURL || "https://placehold.co/300x300?text=No+Image";

            return (
              <div className="product-card" key={productId}>
                <img src={image} alt={item.name || "Mahsulot"} onError={(e) => e.currentTarget.src = "https://placehold.co/300x300?text=No+Image"} />

                <div className="product-info">
                  <div className="product-header">
                    <span className="status-badge status-active">FAOL</span>
                    <span className="sku-text">SKU: {item.sku || "MB-TSH-001"}</span>
                  </div>

                  <h3 className="product-title">{item.name}</h3>

                  <p className="product-price">{Number(item.price || 0).toLocaleString()} UZS</p>

                  <div className="product-meta">
                    <span><ShoppingBag size={14} /> MOQ: {item.minOrderQuantity}</span>
                    <span><Eye size={14} /> 1.2k ko'rilgan</span>
                  </div>
                </div>

                <div className="card-icons">
                  <button className="action-icon-btn"><Pencil size={16} /></button>

                  <button className="action-icon-btn delete" onClick={() => openDeleteModal(productId)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <button className="fab-btn" onClick={() => setModal(true)}>
        <Plus size={16} /> Yangi mahsulot
      </button>

      {modal && (
        <div className="modal">
          <div className="modal-box">
            <button className="close" onClick={closeModal}>
              <X size={22} />
            </button>

            <h2>Yangi mahsulot</h2>

            <form onSubmit={saveProduct}>
              <input name="name" type="text" placeholder="Mahsulot nomi" value={data.name} onChange={changeInput} required />
              <input name="price" type="number" placeholder="Narxi" value={data.price} onChange={changeInput} min="0" required />
              <input name="imageUrl" type="url" placeholder="Rasm URL" value={data.imageUrl} onChange={changeInput} required />
              <input name="category" type="text" placeholder="Kategoriya" value={data.category} onChange={changeInput} required />
              <input name="minOrderQuantity" type="number" placeholder="Minimal buyurtma" value={data.minOrderQuantity} onChange={changeInput} min="1" required />

              <button type="submit" className="save">
                Saqlash
              </button>
            </form>
          </div>
        </div>
      )}

      {deleteModal && (
        <div className="modal">
          <div className="modal-box delete-modal-box">
            <button className="close" onClick={() => setDeleteModal(false)}>
              <X size={22} />
            </button>

            <h2>Mahsulotni o'chirish</h2>
            <p>Haqiqatan ham ushbu mahsulotni o'chirmoqchimisiz?</p>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setDeleteModal(false)}>
                Yo'q
              </button>
              <button className="btn-delete" onClick={confirmDelete}>
                Ha, o'chirish
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Mahsulot;