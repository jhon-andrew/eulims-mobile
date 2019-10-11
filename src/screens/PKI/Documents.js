import React from 'react'
import Store from '../../store'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Text } from 'native-base'

class Documents extends React.Component {
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
            <Title>For Signatory</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Text>Lorem ipsum dolor sit amet.</Text>
        </Content>
      </Container>
    )
  }
}

export default Store.withStore(Documents)
