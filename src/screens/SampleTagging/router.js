import { createStackNavigator } from 'react-navigation'
import Analysis from './Analysis'
import Search from './Search'
import Tagging from './Tagging'

const sampleTaggingRouter = createStackNavigator(
  {
    search: Search,
    analysis: Analysis,
    tagging: Tagging
  },
  { defaultNavigationOptions: { header: null } }
)

sampleTaggingRouter.navigationOptions = ({ navigation }) => {
  return {
    drawerLockMode: (navigation.state.index > 0) ? 'locked-closed' : 'unlocked'
  }
}

export default sampleTaggingRouter
