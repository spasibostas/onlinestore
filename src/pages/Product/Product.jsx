import React, { useState } from 'react'
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import { useParams } from 'react-router-dom';
import useFetch from './../../hooks/useFetch';
import { addToCart } from '../../redux/cartReducer';
import { useDispatch } from 'react-redux'
import './Product.scss'

const Product = () => {

  const id = useParams().id;
  const [selectedImg, setSelectedImg] = useState("img");
  
  const dispatch = useDispatch();
  const { data, loading } = useFetch(`/products/${id}?populate=*`);

  return (
    <div className="product">
      {loading ? (
        "loading..."
      ) : (
        <>
          <div className="left">
            <div className="images">
              <img
                src={process.env.REACT_APP_UPLOAD_URL + data?.attributes?.img?.data?.attributes?.url}
                alt=""
                onClick={() => setSelectedImg("img")}
              />
              <img
                src={process.env.REACT_APP_UPLOAD_URL + data?.attributes?.img2?.data?.attributes?.url}
                alt=""
                onClick={() => setSelectedImg("img2")}
              />
            </div>
            <div className="mainImg">
              <img src={process.env.REACT_APP_UPLOAD_URL + data?.attributes?.[selectedImg]?.data?.attributes?.url} alt="" />
            </div>
          </div>
          <div className="right">
            <h1>{data?.attributes?.title}</h1>
            <div className='prices'>
                <h3>${(data?.attributes?.price + 19.99).toFixed(2)}</h3>
                <h3>${(data?.attributes?.price - 0.01).toFixed(2)}</h3>
            </div>
            <p>
              {data?.attributes?.desc}
            </p>
            <button className="add" onClick={() => dispatch(addToCart({
              id: data.id,
              title: data.attributes.title,
              desc: data.attributes.desc,
              price: data.attributes.price,
              priceTotal: data.attributes.priceTotal,
              img: data.attributes.img.data.attributes.url,
              quantity: data.attributes.quantity,
            }))}>
              <AddShoppingCartIcon /> ADD TO CART
            </button>
            <div className="links">
              <div className="item">
                <FavoriteBorderIcon /> ADD TO WISHLIST
              </div>
              <div className="item">
                <BalanceIcon /> ADD TO COMPARE
              </div>
            </div>
            <div className="info">
              <span>Product Type: {data?.attributes?.type}</span>
              <span>Tag: {data?.attributes?.categories?.data[0].attributes.title}, {data?.attributes?.sub_categories.data[0].attributes.title}</span>
            </div>
            <hr />
            <div className="info">
              <span>DESCRIPTION</span>
              <hr />
              <span>ADDITIONAL INFORMATION</span>
              <hr />
              <span>FAQ</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Product;