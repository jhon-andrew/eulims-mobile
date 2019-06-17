import { createStackNavigator } from 'react-navigation'
import Login from './Login'
import ServerSelection from './ServerSelection'

export default createStackNavigator(
  {
    login: Login,
    serverSelection: ServerSelection
  },
  { defaultNavigationOptions: { header: null } }
)
