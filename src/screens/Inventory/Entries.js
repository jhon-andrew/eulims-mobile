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
      errorQuantity: [],
      orders: [],
      unitDef: ['g', 'kg', 'L', 'mL', 'unit'], // 1: grams (g), 2: kilograms (kg), 3: liters (L), 4: mililiters (mL), 5: units (equipment)
      noEntries: false
    }
  }

  async componentDidMount () {
    const { store, navigation } = this.props
    const { params } = navigation.state
    const api = new API(store)
    const entries = await api.getEntries(params.product_id)
    this.setState({
      entries: entries.map(entry => {
        entry.unit = params.unit
        return entry
      }),
      noEntries: (entries.length === 0)
    })
  }

  changeQuantity (index, entry, quantity) {
    let { orders, errorQuantity } = this.state

    if (quantity > entry.quantity_onhand || quantity === '0') {
      quantity = null
      errorQuantity[index] = true
    } else {
      errorQuantity[index] = false
    }

    orders[index] = {
      ...entry,
      quantity
    }

    this.setState({ orders, errorQuantity })
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
    const { entries, errorQuantity, unitDef, noEntries } = this.state
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
            <Title>{ params.product_code }</Title>
            <Subtitle numberOfLines={1} ellipsizeMode="tail">{ params.product_name }</Subtitle>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <List>
            {/* Loading Spinner */}
            { entries.length === 0 && !noEntries ? (
              <ListItem>
                <Body>
                  <Spinner color="gray" />
                </Body>
              </ListItem>
            ) : null }

            {/* No Entries */}
            { noEntries ? (
              <ListItem>
                <Body>
                  <Text>This product doesn't have any entry.</Text>
                </Body>
              </ListItem>
            ) : null }

            {/* Entries List */}
            { entries.map((entry, index) => (
              <ListItem key={index}>
                <Body>
                  <Text note>Expiration Date</Text>
                  <Text>{ entry.expiration_date }</Text>

                  {/* <Text note>{"\n"}Supplier</Text>
                  <Text>{ entry.supplier }</Text> */}

                  <Text note>{"\n"}Description</Text>
                  <Text>{ entry.description || ' ' }</Text>

                  <Text note>{"\n"}Content</Text>
                  <Text>{ entry.content }{ unitDef[params.unit - 1] }</Text>

                  <Text note>{"\n"}Price</Text>
                  <Text>{ entry.amount }</Text>

                  <Text note>{"\n"}Onhand</Text>
                  <Text>{ entry.quantity_onhand }</Text>
                </Body>
                <Right style={styles.listRight}>
                  <Form style={styles.formFix}>
                    <Item error={errorQuantity[index]} floatingLabel>
                      <Label>Qty.</Label>
                      <Input keyboardType="numeric" onChangeText={this.changeQuantity.bind(this, index, entry)} />
                      { errorQuantity[index] ? (
                        <Icon type="MaterialCommunityIcons" name="alert-circle" />
                      ) : null }
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
