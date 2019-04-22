const {Order, LineItem} = require('../db/models')

function gatewayCreator(condition) {
  return (req, res, next) => {
    try {
      if (condition(req)) {
        next()
      } else {
        res.send('no')
      }
    } catch (err) {
      next(err)
    }
  }
}

const adminGateway = gatewayCreator(req => req.user && req.user.isAdmin)
const userGateway = gatewayCreator(
  req => req.user && req.user.id === req.params.userId
)
const userOrAdminGateway = gatewayCreator(
  req => req.user && (req.user.isAdmin || req.user.id === req.params.userId)
)

/* async function orderGateway(req, res, next) {
  try {
    const order = await Order.findByPk(req.params.orderId, {
      include: [{model: LineItem, order:[['createdAt', 'asc']]}]
    })
    if (order && order.userId === req.user.id) {
      next(order)
    }
  } catch (err) {
    next(err)
  }
} */

module.exports = {adminGateway, userGateway, userOrAdminGateway}
