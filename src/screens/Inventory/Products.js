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
    const { navigation } = this.props
    const { products } = this.state

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent icon onPress={() => navigation.toggleDrawer()}>
              <Icon type="MaterialCommunityIcons" name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Products</Title>
          </Body>
          <Right />
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
            {this.state.products.filter(({ code, name, type }) => {
              const { search, sortBy } = this.state
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
                  <Badge>
                    <Text note style={{ fontSize: 10 }}>{ product.type }</Text>
                  </Badge>
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
