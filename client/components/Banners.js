import React from 'react'
import {Link} from 'react-router-dom'

export default function Banners() {
  return (
    <div className="front-page">
      <div className="banners">
        <Link to="/products?house=stark">
          <img src="/Stark.jpg" />
        </Link>
        <Link to="/products?house=targaryan">
          <img src="/Targaryen.jpg" />
        </Link>
        <Link to="/products?house=lannister">
          <img src="/Lannister.jpg" />
        </Link>
        <Link to="/products?house=tyrell">
          <img src="/Tyrell.jpg" />
        </Link>
        <Link to="/products?house=baratheon">
          <img src="/Baratheon.jpg" />
        </Link>
        <Link to="/products?house=greyjoy">
          <img src="/Greyjoy.jpg" />
        </Link>
        <Link to="/products?house=tully">
          <img src="/Martell.jpg" />
        </Link>
      </div>
    </div>
  )
}
