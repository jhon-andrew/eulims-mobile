import React from 'react'
import Store from '../../store'
import { Container, Header, Body, Title, Left, Right, Button, Icon, Content, List, ListItem, Thumbnail, Text, Form, Item, Input, Label } from 'native-base'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  listLeft: {
    marginLeft: 10,
    marginTop: 23,
    alignSelf: 'stretch',
    justifyContent: 'flex-start'
  },
  listRight: {
    alignSelf: 'stretch',
    justifyContent: 'flex-start'
  },
  formFix: {
    width: 75,
    marginTop: -12
  }
})

class Entries extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      errorQuantity: {}
    }
  }

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
            <Title>Product Name</Title>
          </Body>
          <Right>
            <Button transparent icon>
              <Icon type="MaterialCommunityIcons" name="cart-plus" />
            </Button>
          </Right>
        </Header>
        <Content>
          <List>
            <ListItem thumbnail>
              <Left style={styles.listLeft}>
                <Thumbnail square source={{ uri: 'https://picsum.photos/64/64?random=1' }} />
              </Left>
              <Body>
                <Text note>Expiration Date</Text>
                <Text>2019-04-05</Text>

                <Text note>{"\n"}Supplier</Text>
                <Text>Chemline Scientific Corporation</Text>

                <Text note>{"\n"}Description</Text>
                <Text>&nbsp;</Text>

                <Text note>{"\n"}Content</Text>
                <Text>2.5 Liter (L)</Text>

                <Text note>{"\n"}Price</Text>
                <Text>1250.00</Text>

                <Text note>{"\n"}Onhand</Text>
                <Text>2</Text>
              </Body>
              <Right style={styles.listRight}>
                <Form style={styles.formFix}>
                  <Item error={this.state.errorQuantity[1]} floatingLabel>
                    {
                      /** TODO: Create a filter function that verify
                        * the input is a number and is not more than
                        * the stocks left.
                      */
                    }
                    <Label>Qty.</Label>
                    <Input keyboardType="numeric" />
                  </Item>
                </Form>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    )
  }
}

export default Store.withStore(Entries)
