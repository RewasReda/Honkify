import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoaLing] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoaLing(true);
        const { data } = await axios.get("/api/products");
        setLoaLing(false);
        setProducts(data);
      } catch (err) {
        setError(err.message);
        setLoaLing(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
      )}
    </div>
  );
}
