import React from 'react'
import Store from '../../store'
import { Container, Header, Body, Title, Left, Right, Button, Icon, Content, List, ListItem, Thumbnail, Text, Form, Item, Input, Label, Toast, Subtitle, Spinner } from 'native-base'
import { StyleSheet } from 'react-native'
import API from '../../api';

const styles = StyleSheet.create({
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
      entries: [],
      errorQuantity: {},
      orders: []
    }
  }

  async componentDidMount () {
    const { store, navigation } = this.props
    const { params } = navigation.state
    const api = new API(store)
    const entries = await api.getEntries(params.id)
    this.setState({ entries })
  }

  changeQuantity (index, entry, quantity) {
    let { orders } = this.state
    orders[index] = {
      ...entry,
      quantity
    }

    this.setState({ orders })
  }

  addToCart () {
    const { store, navigation } = this.props
    const { params } = navigation.state
    const persistedCart = store.get('cart')

    let data = this.state.orders.filter(order => order.quantity !== '' && order.quantity > 0)

    if (persistedCart.length > 0) {
      data.unshift(...persistedCart)
    }

    if (data.length > persistedCart.length) {
      store.set('cart')(data)
      Toast.show({ text: 'Order has been added to cart.'})
      navigation.pop()
    }
  }

  render () {
    const { navigation } = this.props
    const { entries, errorQuantity } = this.state
    const { params } = navigation.state

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent icon onPress={() => navigation.pop()}>
              <Icon type="MaterialCommunityIcons" name="arrow-left" />
            </Button>
          </Left>
          <Body>
            <Title>{ params.code }</Title>
            <Subtitle numberOfLines={1} ellipsizeMode="tail">{ params.name }</Subtitle>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <List>
            {/* Loading Spinner */}
            { entries.length === 0 ? (
              <ListItem>
                <Body>
                  <Spinner color="gray" />
                </Body>
              </ListItem>
            ) : null }

            {/* Entries List */}
            { entries.map((entry, index) => (
              <ListItem key={index}>
                <Body>
                  <Text note>Expiration Date</Text>
                  <Text>{ entry.expiration }</Text>

                  <Text note>{"\n"}Supplier</Text>
                  <Text>{ entry.supplier }</Text>

                  <Text note>{"\n"}Description</Text>
                  <Text>{ entry.description || ' ' }</Text>

                  <Text note>{"\n"}Content</Text>
                  <Text>{ entry.content }</Text>

                  <Text note>{"\n"}Price</Text>
                  <Text>{ entry.price }</Text>

                  <Text note>{"\n"}Onhand</Text>
                  <Text>{ entry.onhand }</Text>
                </Body>
                <Right style={styles.listRight}>
                  <Form style={styles.formFix}>
                    <Item error={errorQuantity[1]} floatingLabel>
                      {
                        /** TODO: Create a filter function that verify
                          * the input is a number and is not more than
                          * the stocks left.
                        */
                      }
                      <Label>Qty.</Label>
                      <Input keyboardType="numeric" onChangeText={this.changeQuantity.bind(this, index, entry)} />
                    </Item>
                  </Form>
                </Right>
              </ListItem>
            )) }
          </List>

          { entries.length > 0 ? (
            <Button block onPress={this.addToCart.bind(this)}>
              <Text>Add to Cart</Text>
            </Button>
          ): null }
        </Content>
      </Container>
    )
  }
}

export default Store.withStore(Entries)
