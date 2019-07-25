import React from 'react'
import Store from '../../store'
import { Container, Content, Header, Left, Button, Icon, Body, Title, Right, H2, Card, CardItem, Text, Item, Input, Subtitle } from 'native-base'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  headers: {
    marginTop: 8
  }
})

class CustomerRegistration extends React.Component {
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
            <Title>Register</Title>
            <Subtitle>Customer Account</Subtitle>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <H2 style={styles.headers}>Step 1</H2>
          <Card>
            <CardItem>
              <Body>
                <Item rounded>
                  <Input placeholder="Email" />
                </Item>
              </Body>
            </CardItem>
            <CardItem>
              <Button block outline>
                <Text>Send verification code</Text>
              </Button>
            </CardItem>
          </Card>

          <H2 style={styles.headers}>Step 2</H2>
          <Card>
            <CardItem>
              <Body>
                <Item rounded>
                  <Input placeholder="Activation Code" />
                </Item>
                <Item rounded style={{ marginVertical: 8 }}>
                  <Input placeholder="New Password" />
                </Item>
                <Item rounded>
                  <Input placeholder="Repeat Password" />
                </Item>
              </Body>
            </CardItem>
            <CardItem>
              <Button block outline>
                <Text>Create Account</Text>
              </Button>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

export default Store.withStore(CustomerRegistration)
