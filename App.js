import React from 'react'
import { Font, SplashScreen } from 'expo'
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
      bootupComplete: false
    }
  }

  async componentDidMount () {
    /**
     * Load initial assets.
     */

    // Fonts
    await Font.loadAsync({
      'Segoe UI': require('./assets/fonts/SegoeUI.ttf'),
      'Segoe UI Bold': require('./assets/fonts/SegoeUIBold.ttf')
    })

    this.setState({ bootupComplete: true })
  }

  render () {
    return (
      <Store.Container>
        <StyleProvider style={getTheme(eulimsTheme)}>
          <Boot bootupComplete={this.state.bootupComplete} />
        </StyleProvider>
      </Store.Container>
    )
  }
}
