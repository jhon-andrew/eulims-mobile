import { createStackNavigator } from 'react-navigation'
import Booking from './Booking'
import BookingForm from './Booking/BookingForm'
import Tracking from './Tracking'
import TrackingCompleted from './Tracking/Completed'
import TrackingRequest from './Tracking/Tracks'
import Wallet from './Wallet'
import WalletTransaction from './Wallet/Transactions'

const CustomerRouter = createStackNavigator({
  booking: Booking,
  tracking: Tracking,
  completed: TrackingCompleted,
  wallet: Wallet,
  tracks: TrackingRequest,
  detailedwallet: WalletTransaction,
  bookingform: BookingForm
}, { defaultNavigationOptions: { header: null } })

// CustomerRouter.navigationOptions = ({ navigation }) => ({
//   drawerLockMode: (navigation.state.index > 0) ? 'locked-closed' : 'unlocked'
// })

export default CustomerRouter
