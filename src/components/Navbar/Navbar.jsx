import React, {useState} from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux'
import Profile from './../Profile/Profile';
import "./Navbar.scss"


export const ProfileContext = React.createContext()

const Navbar = () => {

  const products = useSelector((state) => state.cart.products)
  const [openCart, setOpenCart] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const toggleProfile = () => setOpenProfile(prev => !prev)

  return (
    <div className='navbar'>
      <div className='wrapper'>
        <div className='left'>
          <div className='item'>
            <img src="/img/en.png" alt="" />
            <KeyboardArrowDownIcon />
          </div>
          <div className='item'>
            <span>USD</span>
            <KeyboardArrowDownIcon />
          </div>
          <div className='item'>
            <Link className='link' to='/products/1'>Men</Link>
          </div>
          <div className='item'>
            <Link className='link' to='/products/2'>Women</Link>
          </div>
        </div>
        <div className='center'>
          <Link className='link' to="/">ONLINESTORE</Link>
        </div>
        <div className='right'>
          <div className='item'><Link to='/' className='link'>Homepage</Link></div>
          <div className='item'><Link to='/' className='link'>About</Link></div>
          <div className='item'><Link to='/' className='link'>Contact</Link></div>
          <div className='item'><Link to='/' className='link'>Stores</Link></div>
          <div className='icons'>
            <FavoriteBorderOutlinedIcon />
            <PersonOutlineOutlinedIcon className='profileIcon' onClick={() => setOpenProfile(!openProfile)}/>
            <div className='cartIcon' >
              <Link className='link' onClick={() => setOpenCart(!openCart)} to="/basket"><ShoppingCartOutlinedIcon /></Link>
              <span>{products.length}</span>
            </div>
          </div>
        </div>
      </div>
      <ProfileContext.Provider value={openProfile}>
        {openProfile && <Profile toggle={toggleProfile}/>}
      </ProfileContext.Provider>
    </div>
  )
}

export default Navbar