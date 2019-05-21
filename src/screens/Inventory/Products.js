import React from 'react'
import Store from '../../store'
import { Container, Header, Body, Title, Left, Button, Icon, Right, Content, List, ListItem, Text, Thumbnail, Form, Item, Input, Picker } from 'native-base'
import { image, commerce, random, seed } from 'faker'

class Products extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      search: '',
      sortBy: 'all',
      testProductsDb: [...Array(20)].map(i => ({
        id: random.uuid(),
        product: commerce.product(),
        productName: commerce.productName(),
        thumbnail: image.image(),
        type: random.arrayElement(['consumable', 'equipment'])
      }))
    }
  }

  changeSort (sortBy) {
    this.setState({ sortBy })
  }

  render () {
    const { navigation } = this.props
    seed(1)

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
              <Input placeholder="Search Product" onChangeText={search => this.setState({ search })} />
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
            {this.state.testProductsDb.filter(({product, type}) => {
              const { search, sortBy } = this.state
              let q = product.toLowerCase().startsWith(search.toLowerCase())
              let s = (sortBy === 'all') ? (type !== sortBy) : (type === sortBy)
              return q && s
            }).map(product => (
              <ListItem key={product.id} thumbnail>
                <Left style={{ marginLeft: 10 }}>
                  <Thumbnail square source={{ uri: product.thumbnail }} />
                </Left>
                <Body>
                  <Text>{ product.product }</Text>
                  <Text note>{ product.productName }</Text>
                  <Text note>{ product.type }</Text>
                </Body>
              </ListItem>
            ))}
          </List>
        </Content>
      </Container>
    )
  }
}

export default Store.withStore(Products)
