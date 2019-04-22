const router = require('express').Router()
const Stripe = require('stripe')
module.exports = router
const apiKeySecret = process.env.STRIPE_SECRET_KEY
const stripe = Stripe(apiKeySecret)

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     next()
//   } else {
//     console.error('Bad Request')
//     res.redirect('/')
//   }
// }

router.use('/users', require('./users'))
router.use('/orders', require('./orders'))
router.use('/products', require('./products'))

router.post('/checkout', async (req, res, next) => {
  const {currency, email, tokenId, totalPrice, name} = req.body
  try {
    const customer = await stripe.customers.create({
      email,
      name,
      source: tokenId,
      description: 'this is a test',
      metadata: {
        userId: req.user.id
      }
    })

    const charge = await stripe.charges.create({
      amount: totalPrice,
      currency,
      customer: customer.id,
      description: 'this is a test'
    })
    res.status(201).json(charge)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
