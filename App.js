import React from 'react'
import { Font, SplashScreen } from 'expo'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { setCustomText, setCustomTextInput } from 'react-native-global-props'
import getTheme from './native-base-theme/components'
import eulimsTheme from './native-base-theme/variables/eulims'
import Store from './src/store'
import Boot from './src/boot'
import { StyleProvider } from 'native-base'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    SplashScreen.preventAutoHide()
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
      'Poppins': require('./assets/fonts/PoppinsLatin-Regular.ttf'),
      'Poppins Bold': require('./assets/fonts/PoppinsLatin-Bold.ttf'),
      ...MaterialCommunityIcons.font
    })

    // Global Component Styles
    setCustomText({
      style: {
        fontFamily: 'Poppins'
      }
    })

    this.setState({ assetsLoaded: true })
  }

  render () {
    if (this.state.assetsLoaded) {
      SplashScreen.hide()
      return (
        <Store.Container>
          <StyleProvider style={getTheme(eulimsTheme)}>
            <Boot />
          </StyleProvider>
        </Store.Container>
      )
    }

    return null
  }
}
