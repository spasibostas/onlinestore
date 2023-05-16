import React from 'react'
import Card from '../Card/Card'
import './FeaturedProducts.scss'
import useFetch from '../../hooks/useFetch'


const FeaturedProducts = ({ type }) => {

  const {data, loading, error} = useFetch(
    `/products?populate=*&[filters][type][$eq]=${type}`
  )

  return (
    <div className='featuredProducts'>
        <div className="top">
            <h1>{type} products</h1>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
            suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
            lacus vel facilisis labore et dolore magna aliqua. Quis ipsum
            suspendisse ultrices gravida. Risus commodo viverra maecenas.
            </p>
        </div>
        <div className='bottom'>
            {error 
              ? "Something went wrong!"
              :loading 
              ? 'loading' 
              : data.map(item => <Card item={item} key={item.id}/>
            )}
        </div>
    </div>
  )
}

export default FeaturedProducts;

 // const  data = [
  //   {
  //       id: 1,
  //       title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  //       oldPrice: 21,
  //       price: 19,
  //       isNew: true,
  //       description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  //       category: "men's clothing",
  //       image: "https://images.pexels.com/photos/852860/pexels-photo-852860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //       image2: "https://images.pexels.com/photos/4046317/pexels-photo-4046317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //       rating: {
  //       rate: 3.9,
  //       count: 120
  //       }
  //       },
  //       {
  //       id: 2,
  //       title: "Mens Casual Premium Slim Fit T-Shirts ",
  //       oldPrice: 25,
  //       price: 22,
  //       isNew: true,
  //       description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
  //       category: "men's clothing",
  //       image: "https://images.pexels.com/photos/8764414/pexels-photo-8764414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //       image2: "https://images.pexels.com/photos/3708113/pexels-photo-3708113.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //       rating: {
  //       rate: 4.1,
  //       count: 259
  //       }
  //       },
  //       {
  //       id: 3,
  //       title: "Mens Cotton Jacket",
  //       oldPrice: 14,
  //       price: 10,
  //       description: "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
  //       category: "men's clothing",
  //       image: "https://images.pexels.com/photos/4937223/pexels-photo-4937223.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //       image2: "https://images.pexels.com/photos/8387834/pexels-photo-8387834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //       rating: {
  //       rate: 4.7,
  //       count: 500
  //       }
  //       },
  //       {
  //       id: 4,
  //       title: "Mens Casual Slim Fit",
  //       oldPrice: 31,
  //       price: 24,
  //       description: "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
  //       category: "men's clothing",
  //       image: "https://images.pexels.com/photos/3708115/pexels-photo-3708115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //       image2: "https://images.pexels.com/photos/9558777/pexels-photo-9558777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //       rating: {
  //       rate: 2.1,
  //       count: 430
  //       }
  //       },
  // ]