import React from 'react'
import {Link} from 'react-router-dom'

export default function Banners() {
  return (
    <div className="front-page">
      <div className="banners">
        <Link to="/products?house=stark">
          <img src="/Stark.png" />
        </Link>
        <Link to="/products?house=targaryan">
          <img src="/Targaryen.png" />
        </Link>
        <Link to="/products?house=lannister">
          <img src="/Lannister.png" />
        </Link>
        <Link to="/products?house=tyrell">
          <img src="/Tyrell.png" />
        </Link>
        <Link to="/products?house=baratheon">
          <img src="/Baratheon.png" />
        </Link>
        <Link to="/products?house=greyjoy">
          <img src="/Greyjoy.png" />
        </Link>
        <Link to="/products?house=tully">
          <img src="/Martell.png" />
        </Link>
      </div>
    </div>
  )
}
