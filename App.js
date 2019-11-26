import React from 'react'
import * as Font from 'expo-font'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { setCustomText, setCustomTextInput } from 'react-native-global-props'
import getTheme from './native-base-theme/components'
import eulimsTheme from './native-base-theme/variables/eulims'
import Store from './src/store'
import Router from './src/router'
import { StyleProvider, Root } from 'native-base'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      assetsLoaded: false
    }
  }

  async componentDidMount () {
    /**
     * Load initial assets.
     */

    // Fonts
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Poppins': require('./assets/fonts/PoppinsLatin-Regular.ttf'),
      'Poppins Bold': require('./assets/fonts/PoppinsLatin-Bold.ttf'),
      ...MaterialCommunityIcons.font
    })

    // Global Component Styles
    setCustomText({ style: { fontFamily: 'Poppins' } })
    setCustomTextInput({ style: { fontFamily: 'Poppins' } })

    this.setState({ assetsLoaded: true })
  }

  render () {
    if (this.state.assetsLoaded) {
      return (
        <Root>
          <Store.Container>
            <StyleProvider style={getTheme(eulimsTheme)}>
              <Router />
            </StyleProvider>
          </Store.Container>
        </Root>
      )
    }

    return null
  }
}
