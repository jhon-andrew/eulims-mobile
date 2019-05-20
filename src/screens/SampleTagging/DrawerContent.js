import React from 'react'
import Store from '../../store'
import { StyleSheet, Image } from 'react-native'
import { DrawerItems, NavigationActions } from 'react-navigation'
import theme from '../../../native-base-theme/variables/eulims'
import { Container, Header, Body, Title, Subtitle, Left, Right, Content, List, ListItem, Thumbnail, Text, Footer, Button, FooterTab } from 'native-base'

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
  }

  async logout () {
    let { store, navigation } = this.props
    store.set('token')(undefined)
    store.set('user')(undefined)
    navigation.navigate('auth')
  }

  render () {
    const { navigation, store, activeItemKey, getLabel } = this.props
    return (
      <Container>
        <Header span>
          <Body>
            {/* <Image source={require('../../../assets/onelab-512.png')} resizeMethod="scale" resizeMode="contain" style={styles.logo} /> */}
            <Title>EULIMS</Title>
            <Subtitle>OneLab &bull; DOST</Subtitle>
          </Body>
          <Right>
            <Thumbnail source={require('../../../assets/icon.png')} square style={{marginTop: 8}} />
          </Right>
        </Header>
        <Content>
          <List>
            {this.props.items.map(item => (
              <ListItem key={item.key}
                selected={(activeItemKey === item.key)}
                onPress={() => {
                  navigation.closeDrawer()
                  if (item.key === 'Analysis') {
                    navigation.navigate(item.key, {}, NavigationActions.navigate({
                      routeName: 'Search'
                    }))
                  } else navigation.navigate(item.key)
                }}>
                <Body>
                  <Text>{item.routeName}</Text>
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
            <Button active onPress={() => this.logout()}>
              <Text>Logout</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

export default Store.withStore(DrawerContent)
