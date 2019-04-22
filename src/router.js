import Store from './store'
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation'
import Boot from './boot'
import Login from './screens/Login'
import ServerSelection from './screens/ServerSelection'

let rootNav = createSwitchNavigator(
  {
    boot: Boot,
    login: createStackNavigator(
      {
        login: Login,
        serverSelection: ServerSelection
      },
      {
        defaultNavigationOptions: {
          header: null
        }
      }
    )
  },
  {
    initialRouteName: 'boot',
    defaultNavigationOptions: {
      header: null
    }
  }
)

export default Store.withStore(createAppContainer(rootNav))
