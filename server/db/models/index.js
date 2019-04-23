const User = require('./user')
const LineItem = require('./lineItem')
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

Order.hasMany(LineItem)
LineItem.belongsTo(Order)

Product.hasMany(LineItem)
LineItem.belongsTo(Product)

// OrderItem.hasOne(Product)
// Product.belongsToMany(OrderItem)

Order.prototype.getTotalPrice = async () => {
  const associatedLineItems = await LineItem.findAll({
    where: {
      orderId : this.id
    },
    include: [{model: Product}]
  });
  let total = 0;
  associatedLineItems.forEach(lineItem =>
    total += lineItem.quantity * lineItem.product.price);
  console.log(Math.round(total))
  return Math.round(total)
}

module.exports = {
  User,
  LineItem,
  Order,
  Product
}
