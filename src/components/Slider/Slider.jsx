import React, { useEffect, useRef, useState } from 'react'
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import './Slider.scss'

const Slider = () => {

    const delay = 3000;

    const [currentSlide, setCurrentSlide] = useState(0);
    const timeoutRef = useRef(null);

    const data = [
        'https://images.unsplash.com/photo-1520048480367-7a6a4b6efb2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1164&q=80',
        "https://images.unsplash.com/photo-1617896840444-04fe57adbe2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1148&q=80",
        "https://images.unsplash.com/photo-1647517368034-4389fcb678f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      ];

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? 2 : (prev) => prev - 1)
    }

    const nextSlide = () => {
        setCurrentSlide(currentSlide === 2 ? 0 : (prev) => prev + 1)
    }

    function resetTimeout() {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
          () =>
            setCurrentSlide((prev) =>
              prev === data.length - 1 ? 0 : prev + 1
            ),
          delay
        );
    
        return () => {
            resetTimeout();
        };
      }, [currentSlide]);

    return (
        <div className='slider'>
            <div className='container' style={{transform: `translateX(-${currentSlide * 100}vw)`}}>
                <img src={data[0]} alt="" />
                <img src={data[1]} alt="" />
                <img src={data[2]} alt="" />
            </div>
            <div className='icons'>
                <div className='icon' onClick={prevSlide}>
                    <WestOutlinedIcon style={{color: 'white', fontSize: '50px'}}/>
                </div>
                <div className='icon' onClick={nextSlide}>
                    <EastOutlinedIcon style={{color: 'white', fontSize: '50px'}}/>
                </div>
            </div>
        </div>
  )
}

export default Slider;