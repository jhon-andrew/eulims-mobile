import React from 'react'
import Store from './store'
import { SplashScreen } from 'expo'
import { Container, Header, Body, Title, Content, Card, CardItem, Text } from 'native-base'

class Boot extends React.Component {
  render () {
    const { store, bootupComplete } = this.props

    if (bootupComplete) SplashScreen.hide()
    if (!bootupComplete) return null

    return (
      <Container>
        <Header>
          <Body>
            <Title>EULIMS Mobile</Title>
          </Body>
        </Header>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <Text>Welcome to EULIMS Mobile App version 0.1 Beta</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

export default Store.withStore(Boot)
