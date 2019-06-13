import { createStackNavigator } from 'react-navigation'
import Booking_Index from './Booking/Index'
import Tracking_Index from './Tracking/Index'
import Tracking_Completed from './Tracking/Completed'
import Tracking_Request from './Tracking/Tracks'
import Wallet_Index from './Wallet/Index'
const CustomerRouter = createStackNavigator({
  booking: Booking_Index, //this should be routers
  tracking: Tracking_Index,
  completed: Tracking_Completed,
  wallet: Wallet_Index,
  tracks: Tracking_Request
}, { defaultNavigationOptions: { header: null } })

// CustomerRouter.navigationOptions = ({ navigation }) => ({
//   drawerLockMode: (navigation.state.index > 0) ? 'locked-closed' : 'unlocked'
// })

export default CustomerRouter
