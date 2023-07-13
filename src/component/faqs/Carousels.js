import React from "react";
import firstSlide from "./CuImg/firstSlide.jpg";
import secondSlide from "./CuImg/secondSlide.jpg";
import thirdSlide from "./CuImg/thirdSlide.jpg";


import Carousel from 'react-bootstrap/Carousel';

function Carousels() {
  const slideImg = [thirdSlide,secondSlide,firstSlide]
  return (
    <Carousel >
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src={thirdSlide}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src={firstSlide}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src={secondSlide}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousels;  
