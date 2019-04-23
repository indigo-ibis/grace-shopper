const Sequelize = require('sequelize')
const LineItem = require('./lineItem')
const Product = require('./products')
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
    },
    get() {
      let total = 0
      LineItem.findAll({
        where: {orderId: this.id},
        include: [{model: Product}]
      }).then(lineItems => {
        lineItems.forEach(lineItem => {
          total += lineItem.quantity * lineItem.product.price
        })
        return total
      })
    }
  },
  discountAmount: {
    type: Sequelize.INTEGER
  }
})

//Custom methods

module.exports = Orders
