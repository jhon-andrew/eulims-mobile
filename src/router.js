import Store from './store'
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation'
import Boot from './boot'
import Auth from './screens/Auth/router'
import DrawerContent from './screens/DrawerContent'
import CodeScanner from './screens/CodeScanner'
import SampleTagging from './screens/SampleTagging/router'

const rootNav = createSwitchNavigator({
  boot: Boot,
  auth: Auth,
  app: createDrawerNavigator(
    {
      // Module Routers
      codeScanner: CodeScanner,
      sampleTagging: SampleTagging
    },
    {
      // Drawer Configuration
      initialRouteName: 'sampleTagging',
      contentComponent: DrawerContent
    }
  )
}, { defaultNavigationOptions: { header: null } })

export default Store.withStore(createAppContainer(rootNav))
