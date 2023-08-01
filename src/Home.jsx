import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Search from "../components/Search";
import "../styles/pages/home.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const obtainProducts = async () => {
    try {
      const endpoint = `https://itx-frontend-test.onrender.com/api/product`;
      let response = await axios.get(endpoint);
      setProducts(response.data);
      // response.data.forEach(product => {
      //   localStorage.setItem(product.id, product.model);
      // });
      console.log(response.data);
    } catch (error) {
      console.log("There was an error:", error);
    }
  };

  useEffect(() => {
    obtainProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {products.length ? (
        <section className="all-products-container">
          <Search onSearch={setSearchTerm} />
          <section className="all-products">
            {filteredProducts.map((product, index) => {
              return (
                <article key={index} className="product-card">
                  <Link key={product.id} to={`/${product.id}`}>
                    <div className="product-padding">
                      <div className="product-card-image">
                        <img src={product.imgUrl} alt="Product" />
                      </div>
                      <div className="product-card-text">
                        <p>{product.brand}</p>
                        <h3>{product.model}</h3>
                        <p>{product.price ? product.price + " €" : "-"}</p>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </section>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
}
