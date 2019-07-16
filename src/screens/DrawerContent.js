import React from 'react'
import Store from '../store'
import { StyleSheet, Image, AsyncStorage } from 'react-native'
import theme from '../../native-base-theme/variables/eulims'
import { Container, Header, Body, Title, Subtitle, Right, Content, List, ListItem, Thumbnail, Text, Footer, Button, FooterTab, Spinner } from 'native-base'
import { NavigationActions } from 'react-navigation'

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    width: '80%',
    height: '56%',
    borderRadius: 2
  }
})

class DrawerContent extends React.Component {
  constructor (props) {
    super(props)
    const user = this.props.store.get('user')
    this.state = {
      selectedRoute: 0,
      // Nav Drawer Routes
      routes: user.userType === 'analyst' ? [
        // Analyst Routes
        {
          label: 'Recent Scans',
          screens: ['recentScans'],
          defaultScreen: 'recentScans'
        },
        {
          label: 'Analysis',
          screens: ['search', 'analysis', 'tagging'],
          defaultScreen: 'search'
        },
        {
          label: 'Products',
          screens: ['products'],
          defaultScreen: 'products'
        }
      ] : [
        // Customer Routes
        {
          label: 'Booking',
          screens: ['booking', 'booking_form'],
          defaultScreen: 'booking'
        },
        {
          label: 'Tracking',
          screens: ['tracking'],
          defaultScreen: 'tracking'
        },
        {
          label: 'Wallet',
          screens: ['wallet'],
          defaultScreen: 'wallet'
        }
      ],
      loggingOut: false
    }
  }

  async logout () {
    let { store, navigation } = this.props

    this.setState({ loggingOut: true })

    store.set('token')(undefined)
    store.set('user')(undefined)
    await AsyncStorage.multiRemove(['token', 'user'])

    this.setState({ loggingOut: false })
    navigation.navigate('auth')
  }

  render () {
    const { navigation, activeItemKey } = this.props
    return (
      <Container>
        <Header span>
          <Body>
            {/* <Image source={require('../../assets/onelab-512.png')} resizeMethod="scale" resizeMode="contain" style={styles.logo} /> */}
            <Title>EULIMS</Title>
            <Subtitle>OneLab &bull; DOST</Subtitle>
          </Body>
          <Right>
            <Thumbnail source={require('../../assets/icon.png')} square style={{marginTop: 8}} />
          </Right>
        </Header>
        <Content>
          <List>
            {this.state.routes.map((route, index) => (
              <ListItem
                key={route.label}
                selected={false}
                onPress={() => {
                  navigation.closeDrawer(),
                  navigation.navigate(route.defaultScreen)
                }}
              >
                <Body>
                  <Text>{route.label}</Text>
                </Body>
              </ListItem>
            ))}
          </List>
        </Content>
        <Footer>
          <FooterTab>
            {/* <Button>
              <Text>Settings</Text>
            </Button> */}
            <Button active onPress={() => this.logout()} disabled={this.state.loggingOut}>
            { this.state.loggingOut ? (<Spinner color="#ffffff" />) : (<Text>Logout</Text>) }
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

export default Store.withStore(DrawerContent)
