import { createStackNavigator } from 'react-navigation'
import Documents from './Documents'
import Document from './Document'

const pkiRouter = createStackNavigator(
  {
    documents: Documents,
    document: Document
  },
  { defaultNavigationOptions: { header: null } }
)

pkiRouter.navigationOptions = ({ navigation }) => {
  return {
    drawerLockMode: (navigation.state.index > 0) ? 'locked-closed' : 'unlocked'
  }
}

export default pkiRouter
