import { createStackNavigator } from 'react-navigation'
import Products from './Products'

export default createStackNavigator({
  products: Products
}, { defaultNavigationOptions: { header: null } })
