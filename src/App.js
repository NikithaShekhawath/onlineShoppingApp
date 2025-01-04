import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const {quantity} = product
    const productPresent = cartList.find(each => each.id === product.id)
    console.log(productPresent)
    if (productPresent !== undefined) {
      const UpdatedList = cartList.map(each => {
        if (each.id === product.id) {
          return {...each, quantity: each.quantity + quantity}
        } else {
          return each
        }
      })
      this.setState({cartList: UpdatedList})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredCartList = cartList.filter(each => each.id !== id)
    this.setState({cartList: filteredCartList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = cartItemDetails => {
    const {quantity} = cartItemDetails
    const {id} = cartItemDetails
    const {cartList} = this.state

    const UpdatedList = cartList.map(each => {
      if (each.id === id) {
        return {...each, quantity: quantity + 1}
      } else {
        return each
      }
    })
    this.setState({cartList: UpdatedList})
  }

  decrementCartItemQuantity = cartItemDetails => {
    const {quantity} = cartItemDetails
    const {cartList} = this.state
    const {id} = cartItemDetails
    if (quantity === 1 && cartList.length === 1) {
      this.setState({cartList: []})
    } else {
      const UpdatedList = cartList.map(each => {
        if (each.id === id) {
          return {...each, quantity: quantity - 1}
        } else {
          return each
        }
      })
      this.setState({cartList: UpdatedList})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
