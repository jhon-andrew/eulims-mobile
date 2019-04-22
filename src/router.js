import Store from './store'
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation'
import Boot from './boot'
import Login from './screens/Login'
import ServerSelection from './screens/ServerSelection'
import DrawerContent from './screens/SampleTagging/DrawerContent'
import RecentScans from './screens/SampleTagging/RecentScans'

let rootNav = createSwitchNavigator(
  {
    // Boot Configuration
    boot: Boot,
    // Login & Server Selection Modules
    auth: createStackNavigator(
      {
        login: Login,
        serverSelection: ServerSelection
      },
      {
        defaultNavigationOptions: {
          header: null
        }
      }
    ),
    // Sample Tagging Module
    sampleTagging: createDrawerNavigator({
      recentScans: {
        screen: RecentScans,
        navigationOptions: () => ({
          title: 'Recent Scans'
        })
      }
    }, {
      contentComponent: DrawerContent
    })
  },
  {
    initialRouteName: 'boot',
    defaultNavigationOptions: {
      header: null
    }
  }
)

export default Store.withStore(createAppContainer(rootNav))
