import React, { useState } from 'react'
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
import { useDispatch, useSelector } from 'react-redux';
import ItemInCart from '../../components/ItemInCart/ItemInCart';
import { makeRequest } from '../../makeRequest';
import { loadStripe } from '@stripe/stripe-js';
import { removeItem, resetCart } from '../../redux/cartReducer';
import './Cart.scss'


const Cart = () => {

    const dispatch = useDispatch()
    const products = useSelector(state => state.cart.products)

    const [cart, setCart] = useState(products);

    const handleDelete = (id) => {
      dispatch(removeItem(id));
      setCart((cart) => cart.filter((product)=> id !== product.id));
    }

    const handleResetCart = () => {
      dispatch(resetCart())
      setCart([])
    }

    const totalPrice = () => {
      let total = 0;
      cart.forEach(item => {
        total += item.quantity * (item.price - 0.01).toFixed(2)
      });
      return total.toFixed(2)
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

      const increase = (id) => {
        setCart((cart) => {
          return cart.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                quantity: item.quantity + 1,
                priceTotal: (item.quantity + 1) * item.price,
              };
            }
            return item
          })
        })
      }
    
      const decrease = (id) => {
        setCart((cart) => {
          return cart.map((item) => {
            if (item.id === id) {
    
              const newCount = item.quantity - 1 > 1 ? item.quantity - 1 : 1;
    
              return {
                ...item,
                quantity: newCount,
                priceTotal: newCount * item.price,
              };
            }
            return item
          })
        })
      }

      const productsInCart = cart.map((item) => {
        return <ItemInCart item={item} key={item.id} handleDelete={handleDelete} increase={increase} decrease={decrease}/>
      })

      if (cart.length < 1) return <h1 className='empty-cart'>Your cart is empty</h1>

    return (
        <div className='order-page'>
            <div className='order-page__left'>
                {productsInCart}
            </div>
            <div className="order-page__right">
                <div className="order-page__total-price">
                    <span>Total price: ${totalPrice()}</span>
                </div> 
                <button onClick={handlePayment}>PROCEED TO CHECKOUT</button>
                <div className='reset'>
                  <div>Reset Cart</div>
                  <DeleteOutlinedIcon className='delete' onClick={() => handleResetCart()} />
                </div>
            </div>
        </div>
    )
}

export default Cart