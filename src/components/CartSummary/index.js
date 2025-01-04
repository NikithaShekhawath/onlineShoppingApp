// Write your code here

import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import {IoIosClose} from 'react-icons/io'

import {Component} from 'react'

import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

import './index.css'

class CartSummary extends Component {
  state = {orderPlaced: false, paymentModeSelected: false}

  placeOrder = () => {
    this.setState({orderPlaced: true})
  }

  selectPayment = () => {
    this.setState(prevState => ({
      paymentModeSelected: !prevState.paymentModeSelected,
    }))
  }

  render() {
    const {orderPlaced, paymentModeSelected} = this.state
    return (
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
              <Popup
                modal
                trigger={
                  <button type="button" className="checkout-butn">
                    Checkout
                  </button>
                }
              >
                {close => (
                  <>
                    <div className="popCont">
                      <button
                        type="button"
                        className="close-button"
                        onClick={() => close()}
                      >
                        <IoIosClose className="close" />
                      </button>
                      <h1 className="popup-heading">Choose Payment Mode</h1>
                      <ul className="payment-options-list">
                        <li className="mode-item">
                          <input
                            type="radio"
                            id="netbanking"
                            name="payment"
                            disabled
                          />
                          <label htmlFor="netbanking" className="payment-label">
                            Net Banking
                          </label>
                        </li>
                        <li className="mode-item">
                          <input
                            type="radio"
                            id="card"
                            name="payment"
                            disabled
                          />
                          <label htmlFor="card" className="payment-label">
                            Card
                          </label>
                        </li>
                        <li className="mode-item">
                          <input
                            type="radio"
                            id="upi"
                            name="payment"
                            disabled
                          />
                          <label htmlFor="upi" className="payment-label">
                            UPI
                          </label>
                        </li>
                        <li className="mode-item">
                          <input
                            type="radio"
                            id="wallet"
                            name="payment"
                            disabled
                          />
                          <label htmlFor="wallet" className="payment-label">
                            Wallet
                          </label>
                        </li>
                        <li className="mode-item">
                          <input
                            type="radio"
                            id="cash"
                            name="payment"
                            onClick={this.selectPayment}
                          />
                          <label htmlFor="cash" className="payment-label">
                            Cash on Delivery
                          </label>
                        </li>
                      </ul>
                      <div className="amount-cont">
                        <h1 className="cart_amount_title">Order Total:</h1>
                        <h1 className="cart_amount"> Rs{add}/-</h1>
                      </div>
                      <p className="total-count">{totalCount} Items in cart</p>
                      <button
                        type="button"
                        className="checkout-butn"
                        onClick={this.placeOrder}
                        disabled={!paymentModeSelected}
                      >
                        Confirm Order
                      </button>
                      {orderPlaced && (
                        <p className="order-placed">
                          Your order has been placed successfully
                        </p>
                      )}
                    </div>
                  </>
                )}
              </Popup>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartSummary
