import React from 'react'
import { Link } from 'react-router-dom'
import './Card.scss'

const Card = ({item}) => {

  return (
    <Link className="link" to={`/product/${item.id}`}>
      <div className="card">
        <div className="image">
          {item?.attributes?.isNew && <span>New Season</span>}
          <img
            src={
              process.env.REACT_APP_UPLOAD_URL +
              item.attributes?.img?.data?.attributes?.url
            }
            alt=""
            className="mainImg"
          />
          <img
            src={
              process.env.REACT_APP_UPLOAD_URL +
              item.attributes?.img2?.data?.attributes?.url
            }
            alt=""
            className="secondImg"
          />
        </div>
        <h2>{item?.attributes?.title}</h2>
        <span>{item?.attributes?.type}</span>
        <span>
          {item?.attributes?.categories?.data[0].attributes.title},
          {item?.attributes?.sub_categories.data[0].attributes.title}
        </span>
        <div className="prices">
          <h3>${(item?.attributes?.price + 19.99).toFixed(2)}</h3>
          <h3>${(item?.attributes?.price - 0.01).toFixed(2)}</h3>
        </div>
      </div>
    </Link>
  );
}

export default Card