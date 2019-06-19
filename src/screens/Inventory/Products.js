import React from 'react'
import Store from '../../store'
import { Container, Header, Body, Title, Left, Button, Icon, Right, Content, List, ListItem, Text, Thumbnail, Form, Item, Input, Picker, Badge, Spinner } from 'native-base'
import API from '../../api'

class Products extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      search: '',
      sortBy: 'all',
      products: []
    }
  }

  async componentDidMount () {
    const api = new API(this.props.store)
    this.setState({
      products: await api.getProducts()
    })
  }

  changeSort (sortBy) {
    this.setState({ sortBy })
  }

  render () {
    const { navigation, store } = this.props
    const { products, search, sortBy } = this.state

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent icon onPress={navigation.toggleDrawer.bind(this)}>
              <Icon type="MaterialCommunityIcons" name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Products</Title>
          </Body>
          <Right>
            <Button transparent icon badge={store.get('cart')} onPress={() => navigation.navigate('cart')}>
              <Icon type="MaterialCommunityIcons" name="cart" />
              { store.get('cart').length > 0 ? (
                <Badge>
                  <Text>{ store.get('cart').length }</Text>
                </Badge>
              ) : null}
            </Button>
            <Button transparent icon onPress={() => navigation.navigate('codeScanner', { tagType: 'Product Code' })}>
              <Icon type="MaterialCommunityIcons" name="qrcode-scan" />
            </Button>
          </Right>
        </Header>
        <Content>
          <Form style={{ margin: 10 }}>
            <Item rounded style={{ paddingHorizontal: 8 }}>
              <Input placeholder="Search" onChangeText={search => this.setState({ search })} />
              <Icon type="MaterialCommunityIcons" name="magnify" />
            </Item>
          </Form>
          <List>
            <ListItem itemDivider>
              <Left>
                <Text>
                  Category
                </Text>
              </Left>
              <Right>
                <Form>
                  <Item picker>
                    <Picker
                      mode="dropdown"
                      placeholder="Sort"
                      style={{ width: 156, height: 20 }}
                      selectedValue={this.state.sortBy}
                      onValueChange={this.changeSort.bind(this)}
                    >
                      <Picker.Item label="All" value="all" />
                      <Picker.Item label="Consumables" value="consumable" />
                      <Picker.Item label="Equipment" value="equipment" />
                    </Picker>
                  </Item>
                </Form>
              </Right>
            </ListItem>
            {/* Loading Spinner */}
            { products.length === 0 ? (
              <ListItem>
                <Body>
                  <Spinner color="gray" />
                </Body>
              </ListItem>
            ) : null }

            {/* Products List */}
            {products.filter(({ code, name, type }) => {
              let productCode = code.toLowerCase().startsWith(search.toLowerCase())
              let productName = name.toLowerCase().startsWith(search.toLowerCase())
              let sort = (sortBy === 'all') ? (type !== sortBy) : (type === sortBy)
              return (productCode || productName) && sort
            }).map(product => (
              <ListItem key={product.id} thumbnail onPress={() => navigation.navigate('product', product)}>
                <Left style={{ marginLeft: 10 }}>
                  <Thumbnail square source={{ uri: product.thumbnail }} />
                </Left>
                <Body>
                  <Text>{ product.code }</Text>
                  <Text note>{ product.name }</Text>
                </Body>
                <Right>
                  { sortBy === 'all' ? (
                    <Badge>
                      <Text note style={{ fontSize: 10 }}>{ product.type }</Text>
                    </Badge>
                  ) : null }
                  { sortBy === 'consumable' ? (
                    <Button onPress={() => navigation.navigate('entries', product)}>
                      <Text>Order</Text>
                    </Button>
                  ) : null }
                  { sortBy === 'equipment' ? (
                    <Button onPress={() => navigation.navigate('schedule', product)}>
                      <Text>Schedule</Text>
                    </Button>
                  ) : null }
                </Right>
              </ListItem>
            ))}
          </List>
        </Content>
      </Container>
    )
  }
}

export default Store.withStore(Products)
