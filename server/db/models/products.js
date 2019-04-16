const Sequelize = require('sequelize')
const db = require('../db')

const Products = db.define('products', {
  name: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.DECIMAL,
    validate: {
      notEmpty: true,
      min: 0
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://s3.amazonaws.com/peoplepng/wp-content/uploads/2018/03/25053846/Jet-PNG-Image.png'
  },
  house: {
    type: Sequelize.STRING
  },
  productCategory: {
    type: Sequelize.STRING
  }
})

//Custom methods

module.exports = Products
