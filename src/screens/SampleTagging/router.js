import { createStackNavigator } from 'react-navigation'
import RecentScans from './RecentScans'
import Analysis from './Analysis/Analysis'
import Search from './Analysis/Search'
import Tagging from './Analysis/Tagging'

const sampleTaggingRouter = createStackNavigator(
  {
    recentScans: RecentScans,
    search: Search,
    analysis: Analysis,
    tagging: Tagging
  },
  { defaultNavigationOptions: { header: null } }
)

sampleTaggingRouter.navigationOptions = ({ navigation }) => {
  return {
    drawerLockMode: (navigation.state.index > 1) ? 'locked-closed' : 'unlocked'
  }
}

export default sampleTaggingRouter
