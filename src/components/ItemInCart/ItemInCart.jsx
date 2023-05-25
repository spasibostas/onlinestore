import React  from 'react'
import DeleteButton from '../DeleteButton/DeleteButton';
import CountInCart from '../CountInCart/CountInCart';
import './ItemInCart.scss'

const ItemInCart = ({item, increase, decrease, handleDelete}) => {

  const {img, desc, id, priceTotal, quantity, title} = item
    
  return (
    <div className="order">
        <div className="order-item">
            <div className="order-item__cover">
                <img src={process.env.REACT_APP_UPLOAD_URL + img} />
            </div>
            <div className="order-card">
                <div className="order-item__title">
                    <span> {title} </span>
                </div>
                <div className="order-item__desc">
                    <span> {desc} </span>
                </div>
                <div className="order-item__price">
                    <h3>${(item.price + 19.99).toFixed(2)}</h3>
                    <h3>${priceTotal - 0.01}</h3>
                </div>
                <CountInCart quantity={quantity} increase={increase} decrease={decrease} id={id}/>
            </div>
            <DeleteButton handleDelete={handleDelete} id={id}/>
        </div>
    </div>
  );
}

export default ItemInCart