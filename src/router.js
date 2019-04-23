import Store from './store'
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation'
import Boot from './boot'
import Login from './screens/Login'
import ServerSelection from './screens/ServerSelection'
import DrawerContent from './screens/SampleTagging/DrawerContent'
import RecentScans from './screens/SampleTagging/RecentScans'
import CodeScanner from './screens/SampleTagging/CodeScanner'

let rootNav = createSwitchNavigator(
  {
    // Boot Config
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
    app: createStackNavigator(
      {
        // Sample Tagging Module
        sampleTagging: createDrawerNavigator({
          'Recent Scans': {
            screen: RecentScans
          }
        }, { contentComponent: DrawerContent }),
        // Code Scanner Module
        codeScanner: CodeScanner
      },
      {
        initialRouteName: 'sampleTagging',
        defaultNavigationOptions: {
          header: null
        }
      }
    )
  },
  // SwitchNavigator Config
  {
    initialRouteName: 'boot',
    defaultNavigationOptions: {
      header: null
    }
  }
)

export default Store.withStore(createAppContainer(rootNav))
