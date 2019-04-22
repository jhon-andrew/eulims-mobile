import React from 'react'
import Store from '../../store'
import { ScrollView, AsyncStorage } from 'react-native'
import { SafeAreaView, DrawerItems } from 'react-navigation'
import theme from '../../../native-base-theme/variables/eulims'
import { Text, View, Button } from 'native-base'

class DrawerContent extends React.Component {
  constructor (props) {
    super(props)
  }

  async logout () {
    await AsyncStorage.clear()
    this.props.navigation.navigate('auth')
  }

  render () {
    return (
      <ScrollView>
        <View style={{height: 140, backgroundColor: theme.brandPrimary }}>
          <Text>EULIMS</Text>
        </View>
        <DrawerItems {...this.props} />
        <Button onPress={() => this.logout()}>
          <Text>Logout</Text>
        </Button>
      </ScrollView>
    )
  }
}

export default Store.withStore(DrawerContent)
