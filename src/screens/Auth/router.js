import { createStackNavigator } from 'react-navigation'
import Login from './Login'
import ServerSelection from './ServerSelection'
import CustomerRegistration from './CustomerRegistration'

export default createStackNavigator(
  {
    login: Login,
    serverSelection: ServerSelection,
    customerRegistration: CustomerRegistration
  },
  { defaultNavigationOptions: { header: null } }
)
