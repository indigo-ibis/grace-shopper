const db = require('./server/db')
const {green, red} = require('chalk')

const Users = require('./server/db/models/user')
const Products = require('./server/db/models/products')
const LineItems = require('./server/db/models/lineItem')
const Orders = require('./server/db/models/orders')

const productsArr = [
  {
    name: 'John Snow Figurine',
    price: 34,
    imageUrl: 'https://i.redd.it/dk04q9buhkqy.png',
    house: 'Stark',
    productCategory: 'figurine'
  },
  {
    name: 'Needle Replica',
    price: 154,
    imageUrl: 'https://i.redd.it/dk04q9buhkqy.png',
    house: 'Stark',
    productCategory: 'replica'
  },
  {
    name: 'Podrick Figurine',
    price: 34,
    imageUrl: 'https://i.redd.it/dk04q9buhkqy.png',
    house: 'Tyrell',
    productCategory: 'figurine'
  },
  {
    name: 'Danaerys Stormborn first of her name, plush pillow',
    price: 24,
    imageUrl: 'https://i.redd.it/dk04q9buhkqy.png',
    house: 'Targaryan',
    productCategory: 'memoribilia'
  },
  {
    name: 'Life Size Iron Throne Replica',
    price: 3299,
    imageUrl: 'https://i.redd.it/dk04q9buhkqy.png',
    house: 'Stark',
    productCategory: 'figurine'
  }
]

const ordersArr = [
  {
    fullfillmentStatus: 'Unfullfilled',
    totalPrice: 300,
    discountAmount: 1,
    userId: 1
  },
  {
    fullfillmentStatus: 'Unfullfilled',
    totalPrice: 500,
    discountAmount: 1,
    userId: 2
  },
  {
    fullfillmentStatus: 'Delivered',
    totalPrice: 400,
    discountAmount: 1,
    userId: 1
  },
  {
    fullfillmentStatus: 'inCart',
    totalPrice: 300,
    discountAmount: 1,
    userId: 1
  },
  {
    fullfillmentStatus: 'inCart',
    totalPrice: 500,
    discountAmount: 1,
    userId: 2
  },
  {
    fullfillmentStatus: 'Delivered',
    totalPrice: 400,
    discountAmount: 1,
    userId: 1
  }
]

const usersArr = [
  {
    email: 'admin@email.com',
    firstName: 'test',
    lastName: 'last',
    password: '123',
    isAdmin: true,
    isBanned: false
  },
  {
    email: 'admin2@email.com',
    firstName: 'test',
    lastName: 'last',
    password: '123',
    isAdmin: true,
    isBanned: false
  },
  {
    email: 'user@email.com',
    firstName: 'test',
    lastName: 'last',
    password: '123',
    isAdmin: false,
    isBanned: false
  }
]

const lineItemsArr = [
  {
    quantity: 2,
    discountAmount: 0,
    productId: 1,
    orderId: 1
  },
  {
    quantity: 2,
    discountAmount: 0,
    productId: 2,
    orderId: 4
  },
  {
    quantity: 1,
    discountAmount: 0,
    productId: 3,
    orderId: 4
  }
]

const seed = async () => {
  try {
    await db.sync({force: true})

    await Promise.all(
      usersArr.map(el => {
        return Users.create(el)
      })
    )

    await Promise.all(
      productsArr.map(el => {
        return Products.create(el)
      })
    )

    await Promise.all(
      ordersArr.map(el => {
        return Orders.create(el)
      })
    )
    await Promise.all(
      lineItemsArr.map(el => {
        return LineItems.create(el)
      })
    )

    console.log(green('Seeding success!'))
    db.close()
  } catch (err) {
    console.error(red('Oh dear!!!!! Something went awry :/!'))
    console.error(err)
    db.close()
  }
}

seed()
