// Write your code here
import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const sumList = cartList.map(each => each.price * each.quantity)
      console.log(sumList)
      let add = 0
      for (let each of sumList) {
        add += each
      }
      console.log(add)
      const totalCount = cartList.length

      return (
        <div className="checkout-cont">
          <div className="amount-cont">
            <h1 className="cart_amount_title">Order Total:</h1>
            <h1 className="cart_amount"> Rs{add}/-</h1>
          </div>
          <p className="total-count">{totalCount} Items in cart</p>
          <button className="checkout-butn">Checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
