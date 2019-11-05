import React from 'react'
import Store from '../../store'
import { SplashScreen } from 'expo'
import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, Dimensions, Keyboard, Image, TouchableWithoutFeedback } from 'react-native'
import { Container, Content, View, H2, Text, Form, Item, Input, Icon, Button, Toast, Spinner, ActionSheet } from 'native-base'
import theme from '../../../native-base-theme/variables/eulims'
import API from '../../api'

const appPackage = require('../../../package.json')

const styles = StyleSheet.create({
  verticallyCentered: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  logo: {
    width: Dimensions.get('window').width * 0.8 - 20,
    resizeMode: 'contain',
    borderRadius: 2,
    alignSelf: 'center'
  },
  branding: {
    textAlign: 'center',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 8
  },
  formItem: {
    marginVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  footer: {
    fontSize: 10,
    fontWeight: '300',
    textAlign: 'center',
    marginTop: 32,
    color: 'rgba(0, 0, 0, 0.3)'
  }
})

class LoginScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dynamicHeight: Dimensions.get('window').height - Constants.statusBarHeight - theme.toolbarHeight - 20,
      prefServer: undefined,
      email: undefined,
      password: undefined,
      loggingIn: false
    }
  }

  componentDidMount () {
    SplashScreen.hide()

    const { navigation, store } = this.props

    this.listeners = [
      Keyboard.addListener('keyboardDidShow', ({ endCoordinates }) => {
        this.changeViewHeight(endCoordinates.height)
      }),
      Keyboard.addListener('keyboardDidHide', () => {
        this.changeViewHeight()
      }),
      navigation.addListener('didFocus', () => {
        this.setState({ prefServer: store.get('prefServer') })
      })
    ]

    if (navigation.getParam('message')) {
      Toast.show({
        text: navigation.getParam('message'),
        buttonText: 'Okay',
        duration: 3000
      })
    }
  }

  componentWillUnmount () {
    this.listeners.forEach((listener, index) => {
      listener.remove()
    })
  }

  changeViewHeight (offset = 0) {
    this.setState({
      dynamicHeight: Dimensions.get('window').height - Constants.statusBarHeight - theme.toolbarHeight - 20 - offset
    })
  }

  selectRole () {
    const roles = ['Customer', 'Analyst', 'Top Management', 'Cancel']
    ActionSheet.show(
      {
        title: 'Please choose a role to login',
        options: roles,
        cancelButtonIndex: roles.indexOf('Cancel')
      },
      role => {
        if (role !== roles.indexOf('Cancel')) {
          this.props.store.set('role')(roles[role])
        }
      }
    )
  }

  async login () {
    const { email, password } = this.state
    const { store, navigation } = this.props

    this.setState({
      emailError: !email,
      passwordError: !password,
      prefServerError: !store.get('prefServer'),
      roleError: !store.get('role')
    })

    if (!email || !password || !store.get('prefServer') || !store.get('role')) return false

    this.setState({ loggingIn: true })
    const api = new API(store)
    const login = await api.login(email, password)

    if (login && login.token) {
      // Emulate top-management login
      // login.user.type = 'top-management'

      store.set('token')(login.token)
      store.set('user')(login.user)

      let proceedTo = null
      switch (login.user.type) {
        case 'customer':
          proceedTo = 'customer'
          break
        case 'top-management':
          proceedTo = 'topManagement'
          break
        default:
          proceedTo = 'app'
          break
      }

      return navigation.navigate(proceedTo)
    } else if (login && !login.success) {
      Toast.show({
        text: login.message,
        buttonText: 'Okay',
        duration: 3000
      })

      if (login.activated === false) {
        return navigation.navigate('customerRegistration')
      }
    }

    this.setState({ loggingIn: false })
  }

  render () {
    const { navigation, store } = this.props

    return (
      <Container>
        <LinearGradient colors={['#b1d1e4', '#3c8dbc']} start={[0.0, 0.5]} end={[0.5, 1.0]} style={{ flex: 1 }}>
          <Content padder>
            <View style={[styles.verticallyCentered, { minHeight: this.state.dynamicHeight }]}>
              <Image source={require('../../../assets/onelab-512.png')} style={styles.logo} />
              <H2 style={styles.branding}>Enhanced Unified Laboratory Information Management System</H2>
              <Text style={styles.branding}>Department of Science and Technology</Text>

              <Form style={{ marginVertical: 4 }}>
                <Item rounded style={styles.formItem} disabled={this.state.loggingIn} error={this.state.emailError}>
                  <Input placeholder="Email" autoCapitalize="none" autoComplete="email" keyboardType="email-address" onChangeText={email => this.setState({ email })} disabled={this.state.loggingIn} />
                  <Icon type="MaterialCommunityIcons" name="email" />
                </Item>
                <Item rounded style={styles.formItem} disabled={this.state.loggingIn} error={this.state.passwordError}>
                  <Input placeholder="Password" secureTextEntry={true} onChangeText={password => this.setState({ password })} disabled={this.state.loggingIn} />
                  <Icon type="MaterialCommunityIcons" name="textbox-password" />
                </Item>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('serverSelection')}>
                  <View pointerEvents="box-only" style={{padding: 0}}>
                    <Item rounded style={styles.formItem} error={this.state.prefServerError}>
                      <Input placeholder="Server" autoCapitalize="none" editable={false} value={store.get('prefServer')} />
                      <Icon type="MaterialCommunityIcons" name="server" />
                    </Item>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.selectRole.bind(this)}>
                  <View pointerEvents="box-only" style={{padding: 0}}>
                    <Item rounded style={styles.formItem} error={this.state.roleError}>
                      <Input placeholder="Role" autoCapitalize="none" editable={false} value={store.get('role')} />
                      <Icon type="MaterialCommunityIcons" name="account-card-details" />
                    </Item>
                  </View>
                </TouchableWithoutFeedback>
              </Form>

              <Button block rounded style={{ marginVertical: 4, marginBottom: 8 }} onPress={this.login.bind(this)} disabled={this.state.loggingIn}>
                { this.state.loggingIn ? (<Spinner color="#ffffff" />) : (<Text>Login</Text>) }
              </Button>

              {/* <Button rounded outline block style={{ backgroundColor: '#57b1e5' }} onPress={() => navigation.navigate('customerRegistration')}>
                <Text>Create a Customer Account</Text>
              </Button> */}

              <Text style={styles.footer}>EULIMS Mobile v{appPackage.version}</Text>
            </View>
          </Content>
        </LinearGradient>
      </Container>
    )
  }
}

export default Store.withStore(LoginScreen)
