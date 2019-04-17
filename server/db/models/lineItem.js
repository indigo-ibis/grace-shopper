const Sequelize = require('sequelize')
const db = require('../db')

const LineItem = db.define('lineItem', {
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
    type: Sequelize.INTEGER
  }
})

//Custom methods

module.exports = LineItem
