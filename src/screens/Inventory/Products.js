import React from 'react'
import Store from '../../store'
import { Container, Header, Body, Title, Left, Button, Icon, Right, Content, List, ListItem, Text, Thumbnail, Form, Item, Input, Picker, Badge, Spinner, View, Row, Grid, Col } from 'native-base'
import API from '../../api'
import { FlatList } from 'react-native'

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
    const products = await api.getProducts()
    this.setState({ products })
  }

  changeSort (sortBy) {
    this.setState({ sortBy })
  }

  rowKey (item, index) {
    return item.product_id.toString()
  }

  renderProductRow ({ item: product }) {
    const { store, navigation } = this.props
    const { sortBy } = this.state

    return (
      <Row style={{ padding: 8 }} onPress={() => navigation.navigate('product', product)}>
        {/* <Col style={{ width: '16%' }}>
          { !product.Image1 ? (
            <Thumbnail square source={require('../../../assets/no-image.png')} />
          ) : (
            <Thumbnail square source={{ uri: `${store.get('prefProtocol')}://${store.get('prefServer')}/${product.Image1}` }} />
          ) }
        </Col> */}
        <Col style={{ paddingLeft: 8 }}>
          <Text>{ product.product_code.trim() }</Text>
          <Text note>{ product.product_name.trim() }</Text>
        </Col>
        <Col style={{ width: '30%' }}>
          { sortBy === 'all' ? (
            <Badge style={{ alignSelf: 'flex-end' }}>
              <Text note style={{ fontSize: 10 }}>{ product.producttype_id === 1 ? 'consumable' : 'equipment' }</Text>
            </Badge>
          ) : null }
          { parseInt(sortBy) === 1 ? (
            <Button style={{ alignSelf: 'flex-end' }} onPress={() => navigation.navigate('entries', product)}>
              <Text>Order</Text>
            </Button>
          ) : null }
          { parseInt(sortBy) === 2 ? (
            <Button style={{ alignSelf: 'flex-end' }} onPress={() => navigation.navigate('schedule', product)}>
              <Text>Schedule</Text>
            </Button>
          ) : null }
        </Col>
      </Row>
    )
  }

  render () {
    const { navigation, store } = this.props
    const { products, search, sortBy } = this.state
    const filteredProducts = products.filter(({ product_code, product_name, producttype_id }) => {
      producttype_id = parseInt(producttype_id)
      let productCode = product_code.toLowerCase().startsWith(search.toLowerCase())
      let productName = product_name.toLowerCase().startsWith(search.toLowerCase())
      let sort = (sortBy === 'all') ? (producttype_id !== sortBy) : (producttype_id === parseInt(sortBy))
      return (productCode || productName) && sort
    })

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
                  Results ({ filteredProducts.length })
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
                      <Picker.Item label="Consumables" value="1" />
                      <Picker.Item label="Equipment" value="2" />
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
          </List>
          <Grid>
            {/* Products List */}
            <FlatList
              initialNumToRender={10}
              maxToRenderPerBatch={15}
              data={filteredProducts}
              keyExtractor={this.rowKey.bind(this)}
              renderItem={this.renderProductRow.bind(this)}
            />
          </Grid>
        </Content>
      </Container>
    )
  }
}

export default Store.withStore(Products)
