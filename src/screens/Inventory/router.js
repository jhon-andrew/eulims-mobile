import { createStackNavigator } from 'react-navigation'
import Products from './Products'
import Product from './Product'
import Entries from './Entries'

const inventoryRouter = createStackNavigator({
  products: Products,
  product: Product,
  entries: Entries
}, { defaultNavigationOptions: { header: null } })

inventoryRouter.navigationOptions = ({ navigation }) => ({
  drawerLockMode: (navigation.state.index > 0) ? 'locked-closed' : 'unlocked'
})

export default inventoryRouter
