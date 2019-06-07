import React from 'react'
import Store from '../store'
import { SplashScreen } from 'expo'
import { Container, Header, Body, Title, Content, Left, Button, Icon, Right, List, ListItem, Text, ActionSheet } from 'native-base'

class RecentScans extends React.Component {
  componentDidMount () {
    SplashScreen.hide()
  }

  codeScanner () {
    const { navigation } = this.props
    ActionSheet.show(
      {
        title: 'Select',
        options: ['Scan a Sample', 'Scan a Product', 'Cancel'],
        cancelButtonIndex: 2
      },
      optionIndex => {
        const tagType = ['Sample Tag', 'Product Code']
        if (optionIndex < 2) {
          navigation.navigate('codeScanner', { tagType: tagType[optionIndex] })
        }
      }
    )
  }

  render () {
    const { navigation } = this.props
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent icon onPress={navigation.toggleDrawer.bind(this)}>
              <Icon type="MaterialCommunityIcons" name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Recent Scans</Title>
          </Body>
          <Right>
            <Button transparent icon onPress={this.codeScanner.bind(this)}>
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
