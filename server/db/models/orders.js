const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('orders', {
  fullfillmentStatus: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [
        ['Unfullfilled', 'Delivered', 'Cancelled', 'Refund Pending', 'Refunded']
      ]
    }
  },
  totalPrice: {
    type: Sequelize.DECIMAL, //DECIMAL?
    validate: {
      min: 0
    }
  },
  discountAmount: {
    type: Sequelize.DECIMAL
  }
})

//Custom methods

module.exports = Orders
