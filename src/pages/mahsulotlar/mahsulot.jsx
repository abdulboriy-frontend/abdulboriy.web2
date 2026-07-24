import React, { useEffect, useState } from "react";
import { Filter, ArrowUpDown, Plus, X } from "lucide-react";
import "./mahsulot.css";
import Card from "../../ui/card/card";

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
      const res = await fetch(
        "https://uzum-api.onrender.com/api/products"
      );

      const result = await res.json();

      setProducts(result.data || []);

    } catch (err) {
      console.log(err);
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

      const res = await fetch(
        "https://uzum-api.onrender.com/api/products",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(productData)
        }
      );


      const result = await res.json();


 


      if(res.ok){

        alert("Mahsulot saqlandi");

        getProducts();

        setModal(false);


        setData({
          name:"",
          price:"",
          imageUrl:"",
          category:"",
          minOrderQuantity:1
        });


      } else {

        alert(JSON.stringify(result));

      }


    } catch(error){

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

          <div className="m-tab">
            Faol
          </div>

          <div className="m-tab">
            Qoralama
          </div>

        </div>



        <div className="mahsulotlar-actions">

          <button className="filter-btn">
            <Filter size={15}/>
            Filter
          </button>

          <button className="filter-btn">
            <ArrowUpDown size={15}/>
            Saralash
          </button>

        </div>


      </div>




      <div className="mahsulotlar-list">

        {
          products.map(item=>(
            <Card
              key={item.id}
              a={item}
            />
          ))
        }

      </div>




      <button
        className="fab-btn"
        onClick={()=>setModal(true)}
      >

        <Plus size={16}/>
        Yangi mahsulot

      </button>






      {
        modal && (

          <div className="modal">

            <div className="modal-box">


              <button
                className="close"
                onClick={()=>setModal(false)}
              >
                <X/>
              </button>


              <h2>
                Yangi mahsulot
              </h2>



              <form onSubmit={saveProduct}>


                <input
                  name="name"
                  placeholder="Mahsulot nomi"
                  value={data.name}
                  onChange={changeInput}
                  required
                />


                <input
                  name="price"
                  type="number"
                  placeholder="Narxi"
                  value={data.price}
                  onChange={changeInput}
                  required
                />


                <input
                  name="imageUrl"
                  placeholder="Rasm linki"
                  value={data.imageUrl}
                  onChange={changeInput}
                  required
                />


                <input
                  name="category"
                  placeholder="Kategoriya"
                  value={data.category}
                  onChange={changeInput}
                  required
                />


                <input
                  name="minOrderQuantity"
                  type="number"
                  placeholder="Minimal buyurtma"
                  value={data.minOrderQuantity}
                  onChange={changeInput}
                />



                <button
                  type="submit"
                  className="save"
                >
                  Saqlash
                </button>


              </form>


            </div>

          </div>

        )
      }



    </div>

  );
};


export default Mahsulot;