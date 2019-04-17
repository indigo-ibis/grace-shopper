const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('orders', {
  fullfillmentStatus: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [
        [
          'inCart',
          'Unfullfilled',
          'Delivered',
          'Cancelled',
          'Refund Pending',
          'Refunded'
        ]
      ]
    }
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  discountAmount: {
    type: Sequelize.INTEGER
  }
})

//Custom methods

module.exports = Orders
