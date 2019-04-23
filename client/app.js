import React from 'react'
import Navbar from './components/navbar'
import Routes from './routes'
import Banners from './components/Banners'

const App = () => {
  return (
    <div>
      <Navbar />
      <Banners />
      <Routes />
    </div>
  )
}

export default App
