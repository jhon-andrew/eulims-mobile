import React from 'react'
import Store from '../store'
import { SplashScreen } from 'expo'
import { Container, Header, Body, Title, Content, Left, Button, Icon, Right, List, ListItem, Text } from 'native-base'

class RecentScans extends React.Component {
  componentDidMount () {
    SplashScreen.hide()
  }

  render () {
    const { navigation } = this.props
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent icon onPress={() => navigation.toggleDrawer()}>
              <Icon type="MaterialCommunityIcons" name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Recent Scans</Title>
          </Body>
          <Right>
            <Button transparent icon onPress={() => navigation.navigate('codeScanner')}>
              <Icon type="MaterialCommunityIcons" name="qrcode-scan" />
            </Button>
          </Right>
        </Header>
        <Content>
          <List>
            <ListItem>
              <Body>
                <Text>CHE-123</Text>
                <Text note>Status: Pending (0/4)</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text>CHE-123</Text>
                <Text note>Status: Pending (0/4)</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text>CHE-123</Text>
                <Text note>Status: Pending (0/4)</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text>CHE-123</Text>
                <Text note>Status: Pending (0/4)</Text>
              </Body>
            </ListItem>
          </List>
        </Content>
      </Container>
    )
  }
}

export default Store.withStore(RecentScans)
