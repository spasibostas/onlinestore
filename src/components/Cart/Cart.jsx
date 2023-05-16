import React from 'react'
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
import {useSelector} from 'react-redux'
import { useDispatch } from "react-redux";
import { removeItem, resetCart } from '../../redux/cartReducer';
import {loadStripe} from '@stripe/stripe-js';
import { makeRequest } from './../../makeRequest';
import './Cart.scss'


const Cart = () => {

  const products = useSelector((state) => state.cart.products)
  const dispatch = useDispatch()

  const totalPrice = () => {
    let total = 0;
    products.forEach(item => {
      total += item.quantity * item.price
    });
    return total.toFixed(2);
  }

  const stripePromise = loadStripe(
    'pk_test_51Myvg3BjF97bv0UeSxalOPgjh72KJy75yZe7tPNqtgGybofN0BZQEJcNe7U3omqidQrFPbWEUhsvMW9VuozvDxVm00bmhDScMe'
  );

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const res = await makeRequest.post("/orders", {
        products
      })
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='cart'>
        <h1>Products in your cart</h1>
        {products?.map(item => (
            <div className="item" key={item.id}>
                <img src={process.env.REACT_APP_UPLOAD_URL + item.img} alt="" />
                <div className="details">
                    <h2>{item.title}</h2>
                    <p>{item.description?.substring(0,100)}</p>
                    <div className="price">{item.quantity} * ${item.price}</div>
                </div>
                <DeleteOutlinedIcon className='delete' onClick={() => dispatch(removeItem(item.id))}/>
            </div>
        ))}
        <div className="total">
            <span>SUBTOTAL</span>
            <span>${totalPrice()}</span>
        </div>
        <button onClick={handlePayment}>PROCEED TO CHECKOUT</button>
        <span className='reset' onClick={() => dispatch(resetCart())}>Reset Cart</span>
    </div>
  )
}

export default Cart



//const data = [
  //   {
  //     id: 1,
  //     title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  //     oldPrice: 21,
  //     price: 19,
  //     isNew: true,
  //     description:
  //       "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  //     category: "men's clothing",
  //     image:
  //       "https://images.pexels.com/photos/852860/pexels-photo-852860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     image2:
  //       "https://images.pexels.com/photos/4046317/pexels-photo-4046317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     rating: {
  //       rate: 3.9,
  //       count: 120,
  //     },
  //   },
  //   {
  //     id: 2,
  //     title: "Mens Casual Premium Slim Fit T-Shirts ",
  //     oldPrice: 25,
  //     price: 22,
  //     isNew: true,
  //     description:
  //       "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
  //     category: "men's clothing",
  //     image:
  //       "https://images.pexels.com/photos/8764414/pexels-photo-8764414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     image2:
  //       "https://images.pexels.com/photos/3708113/pexels-photo-3708113.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     rating: {
  //       rate: 4.1,
  //       count: 259,
  //     },
  //   },
  // ]