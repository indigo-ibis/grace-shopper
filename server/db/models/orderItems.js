const Sequelize = require('sequelize')
const db = require('../db')

const OrdersItems = db.define('orderItems', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      notEmpty: true,
      min: 1
    }
  },
  discountAmount: {
    type: Sequelize.DECIMAL
  }
})

//Custom methods

module.exports = OrdersItems
