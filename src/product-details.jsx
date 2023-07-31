import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import "../styles/pages/product-details.css";

export default function ProductDetails() {
  const { product_id } = useParams();
  const [productDetails, setProductDetails] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [basketCount, setBasketCount] = useState(localStorage.getItem("basketCount") || 0);

  console.log(product_id)
  console.log(selectedColor);
  console.log(selectedStorage);

  const obtainProductDetails = async () => {
    try {
      const endpoint = `https://itx-frontend-test.onrender.com/api/product/${product_id}`;
      let response = await axios.get(endpoint);
      setProductDetails(response.data);
      console.log(response.data);

      if (response.data.options?.colors?.length >= 1) {
        setSelectedColor(response.data.options.colors[0].code);
      }

      if (response.data.options?.storages?.length >= 1) {
        setSelectedStorage(response.data.options.storages[0].code);
      }
    } catch (error) {
      console.log("There was an error:", error);
    }
  };

  const handleAddProduct = async () => {
    try {
      const endpoint = `https://itx-frontend-test.onrender.com/api/cart`;
      const data = {
        id: product_id,
        colorCode: selectedColor,
        storageCode: selectedStorage,
      };
      let response = await axios.post(endpoint, data);
      setBasketCount(response.data);
      console.log(response.data);
      localStorage.setItem("basketCount", response.data);
    } catch (error) {
      console.log("There was an error:", error);
    }
  };

  useEffect(() => {
    obtainProductDetails();
  }, [product_id]);

  return (
    <div className="product-detail">
      {productDetails ? (
        <div className="product-detail-container">
          <div className="product-detail-image">
            <img src={productDetails.imgUrl} alt={productDetails.model} />
          </div>
          <div className="product-detail-data">
            <div className="product-detail-product-data">
              {/* Product Description */}
              <div className="main-data">
                <h3>Product</h3>
                <h1>
                  <span className="data-title">Brand:</span>&nbsp;
                  {productDetails.brand}
                </h1>
                <h2>
                  <span className="data-title">Model:</span>&nbsp;
                  {productDetails.model}
                </h2>
                <p>
                  <span className="data-title">Price:</span>&nbsp;
                  {productDetails.price ? productDetails.price + " €" : "-"}
                </p>
              </div>
              <div className="specs-data">
                <h3>Specs</h3>
                <p>
                  <span className="data-title">CPU:</span>&nbsp;
                  {productDetails.cpu ? productDetails.cpu : "-"}
                </p>
                <p>
                  <span className="data-title">RAM:</span>&nbsp;
                  {productDetails.ram ? productDetails.ram : "-"}
                </p>
                <p>
                  <span className="data-title">Operating System:</span>&nbsp;
                  {productDetails.os ? productDetails.os : "-"}
                </p>
                <p>
                  <span className="data-title">Display Resolution:</span>
                  &nbsp;
                  {productDetails.displayResolution
                    ? productDetails.displayResolution
                    : "-"}
                </p>
                <p>
                  <span className="data-title">Battery:</span>&nbsp;
                  {productDetails.battery ? productDetails.battery : "-"}
                </p>
                {Array.isArray(productDetails.primaryCamera) ? (
                  <p>
                    <span className="data-title">Primary Camera:</span>
                    {productDetails.primaryCamera.map((element, index) => (
                      <span key={index}> {element}</span>
                    ))}
                  </p>
                ) : (
                  <p>
                    <span className="data-title">Primary Camera:</span>&nbsp;
                    {productDetails.primaryCamera
                      ? productDetails.primaryCamera
                      : "-"}
                  </p>
                )}
                {Array.isArray(productDetails.secondaryCmera) ? (
                  <p>
                    <span className="data-title">Secondary Camera:</span>
                    {productDetails.secondaryCmera.map((element, index) => (
                      <span key={index}> {element}</span>
                    ))}
                  </p>
                ) : (
                  <p>
                    <span className="data-title">Secondary Camera: </span>
                    {productDetails.secondaryCmera
                      ? productDetails.secondaryCmera
                      : "-"}
                  </p>
                )}
                <p>
                  <span className="data-title">Dimensions: </span>
                  {productDetails.dimentions ? productDetails.dimentions : "-"}
                </p>
                <p>
                  <span className="data-title">Weight: </span>
                  {productDetails.weight ? productDetails.weight + "g" : "-"}
                </p>
              </div>
            </div>

            {/* Product Actions */}
            <div className="product-detail-product-actions">
              <div className="color-action">
                <label htmlFor="color">Color: </label>
                <select name="color" id="select-colors" onChange={(e) => setSelectedColor(e.target.value)}>
                  {productDetails.options?.colors?.map((colorOption, index) => {
                    return (
                      <option key={index} value={colorOption.code}>
                        {colorOption.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="storage-action">
                <label htmlFor="storage">Storage: </label>
                <select name="storage" id="select-storage" onChange={(e) => setSelectedStorage(e.target.value)}>
                  {productDetails.options?.storages?.map((storagesOption, index) => {
                    return (
                      <option key={index} value={storagesOption.code}>
                        {storagesOption.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button onClick={handleAddProduct}>Add product</button>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
