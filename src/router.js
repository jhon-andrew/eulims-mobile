import Store from './store'
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation'
import Boot from './boot'
import Auth from './screens/Auth/router'
import CodeScanner from './screens/CodeScanner'
import RecentScans from './screens/RecentScans'
import DrawerContent from './screens/DrawerContent'
import sampleTaggingRouter from './screens/SampleTagging/router'
import inventoryRouter from './screens/Inventory/router'
import customerRouter from './screens/Customer/router'
import topManagement from './screens/PKI/router'

const rootNav = createSwitchNavigator({
  boot: Boot,
  auth: Auth,
  app: createStackNavigator(
    {
      codeScanner: CodeScanner,
      screens: createDrawerNavigator(
        {
          recentScans: RecentScans,
          sampleTagging: sampleTaggingRouter,
          inventory: inventoryRouter,
          customer: customerRouter,
          topManagement: topManagement
        },
        { // `screens` route config
          contentComponent: DrawerContent
        }
      )
    },
    { // `app` route config
      initialRouteName: 'screens',
      defaultNavigationOptions: { header: null }
    }
  )
})

export default Store.withStore(createAppContainer(rootNav))
