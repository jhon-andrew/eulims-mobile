import React from 'react'
import Store from '../store'
import { StyleSheet, Image, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { LinearGradient, SplashScreen } from 'expo'
import { Container, Grid, Row, Text, View, H2, Form, Item, Input, Icon, Button, Content, Toast, Spinner } from 'native-base'
import ServerSelection from './ServerSelection'
import { Login } from '../api'

const styles = StyleSheet.create({
  verticalCenter: {
    alignItems: 'center',
    padding: 8
  },
  logo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    borderRadius: 2,
    width: Dimensions.get('window').width * 0.8 // 80% of App window
  },
  branding: {
    marginBottom: 8,
    textAlign: 'center',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
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
      isOpen: false,
      prefServer: undefined,
      email: undefined,
      password: undefined,
      loggingIn: false
    }
  }

  componentDidMount () {
    let { getParam } = this.props.navigation
    SplashScreen.hide()
    if (getParam('message')) Toast.show({ text: getParam('message') })
    this.props.store.on('prefServer').subscribe(prefServer => this.setState({ prefServer }))
  }

  async login () {
    let { email, password, prefServer } = this.state

    this.setState({
      emailError: !this.state.email,
      passwordError: !this.state.password,
      prefServerError: !this.state.prefServer
    })

    if (!email || !password || !prefServer) return false

    this.setState({ loggingIn: true })
    let login = await Login(this.state.email, this.state.password)
    const { store, navigation } = this.props

    if (login && login.token) {
      store.set('token')(login.token)
      store.set('user')(login.user)
      // return navigation.navigate('sampleTagging')
      Toast.show({
        text: `Welcome ${login.user.firstName}!`,
        buttonText: 'Okay',
        duration: 3000
      })
    } else if (login && login.error) {
      Toast.show({
        text: login.message,
        buttonText: 'Okay',
        duration: 3000
      })
    }

    this.setState({ loggingIn: false   })
  }

  render () {
    const { store, navigation } = this.props

    return (
      <Container>
        <LinearGradient colors={['#b1d1e4', '#3c8dbc']} start={[0.0, 0.5]} end={[0.5, 1.0]} style={{ flex: 1 }}>
          <Content style={{ flexGrow: 1 }}>
            <Grid style={{ height: Dimensions.get('window').height - 20 }}>
              <Row style={styles.verticalCenter}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <Image source={require('../../assets/onelab-512.png')} style={styles.logo} />

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
                          <Input placeholder="Server" autoCapitalize="none" editable={false} value={store.get('prefServer')} onChangeText={prefServer => this.setState({ prefServer })} />
                          <Icon type="MaterialCommunityIcons" name="server" />
                        </Item>
                      </View>
                    </TouchableWithoutFeedback>

                  </Form>

                  <Button block rounded style={{ marginVertical: 4 }} onPress={() => this.login()} disabled={this.state.loggingIn}>
                    { this.state.loggingIn ? (<Spinner color="#ffffff" />) : (<Text>Login</Text>) }
                  </Button>

                  <Text style={styles.footer}>EULIMS Mobile v0.1 Beta</Text>
                </View>
              </Row>
            </Grid>
          </Content>
        </LinearGradient>
      </Container>
    )
  }
}

export default Store.withStore(LoginScreen)
