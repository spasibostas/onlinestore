import React from 'react'
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import './CountInCart.scss'

const CountInCart = ({quantity, increase, decrease, id}) => {

  return (
    <div className="quantity">
      <button onClick={() => decrease(id) }>-</button>
        {quantity}
      <button onClick={() => increase(id)}>+</button>
      <button className="add" onClick={() => {}}>
        <AddShoppingCartIcon />
      </button>
    </div>
  );
}

export default CountInCart