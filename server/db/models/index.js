const User = require('./user')
const OrderItem = require('./orderItems')
const Order = require('./orders')
const Product = require('./products')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(OrderItem)
OrderItem.belongsTo(Order)

Product.hasMany(OrderItem)
OrderItem.belongsTo(Product)

// OrderItem.hasOne(Product)
// Product.belongsToMany(OrderItem)

module.exports = {
  User,
  OrderItem,
  Order,
  Product
}
