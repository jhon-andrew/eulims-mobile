import { createStackNavigator } from 'react-navigation'
import RecentScans from './RecentScans'
import Analysis from './Analysis/Analysis'
import Search from './Analysis/Search'
import Tagging from './Analysis/Tagging'

export default createStackNavigator(
  {
    recentScans: RecentScans,
    search: Search,
    analysis: Analysis,
    tagging: Tagging
  },
  { defaultNavigationOptions: { header: null } }
)
