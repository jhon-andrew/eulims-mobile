import { createStackNavigator } from 'react-navigation'
import Products from './Products'
import Product from './Product'

const inventoryRouter = createStackNavigator({
  products: Products,
  product: Product
}, { defaultNavigationOptions: { header: null } })

inventoryRouter.navigationOptions = ({ navigation }) => ({
  drawerLockMode: (navigation.state.index > 0) ? 'locked-closed' : 'unlocked'
})

export default inventoryRouter
