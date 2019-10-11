import React from 'react'
import Store from '../../store'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Subtitle, Content, Text } from 'native-base'

class Document extends React.Component {
  render () {
    const { navigation } = this.props
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent icon onPress={() => navigation.pop()}>
              <Icon type="MaterialCommunityIcons" name="arrow-left" />
            </Button>
          </Left>
          <Body>
            <Title>Filename.pdf</Title>
            <Subtitle>Deadline: Oct. 21, 2019</Subtitle>
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

export default Store.withStore(Document)
