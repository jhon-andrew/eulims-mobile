import Store from './store'
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation'
import Boot from './boot'
import Login from './screens/Login'
import ServerSelection from './screens/ServerSelection'
import DrawerContent from './screens/SampleTagging/DrawerContent'
import RecentScans from './screens/SampleTagging/RecentScans'
import CodeScanner from './screens/SampleTagging/CodeScanner'
import Search from './screens/SampleTagging/Analysis/Search'
import Analysis from './screens/SampleTagging/Analysis/Analysis'
import Tagging from './screens/SampleTagging/Analysis/Tagging'

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
          'Recent Scans': RecentScans,
          'Analysis': createStackNavigator(
            {
              Search, Analysis, Tagging
            },
            {
              defaultNavigationOptions: {
                header: null
              }
            }
          )
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
