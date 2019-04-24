import React from 'react'
import Store from '../../store'
import { Container, Content, Text, Header, Left, Button, Icon, Body, Item, Input, Right, Title, Form, H2, List, ListItem } from 'native-base'
import { TouchableOpacity } from 'react-native'

class Analysis extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchMode: true,
      search: undefined,
      "searchData":[{"id":"5199","text":"CHE-0865"},{"id":"5210","text":"CHE-0867"},{"id":"5211","text":"CHE-0866"},{"id":"5212","text":"CHE-0868"},{"id":"5213","text":"CHE-0869"},{"id":"5214","text":"CHE-0870"},{"id":"5215","text":"CHE-0871"},{"id":"5216","text":"CHE-0872"},{"id":"5217","text":"CHE-0873"},{"id":"5218","text":"CHE-0874"},{"id":"5226","text":"CHE-0875"},{"id":"5228","text":"CHE-0876"},{"id":"5230","text":"CHE-0877"},{"id":"5231","text":"CHE-0878"},{"id":"5232","text":"CHE-0879"},{"id":"5233","text":"CHE-0880"},{"id":"5234","text":"CHE-0881"},{"id":"5235","text":"CHE-0882"},{"id":"5254","text":"CHE-0883"},{"id":"5255","text":"CHE-0884"}]
    }
  }

  searchUI () {
    const { searchData, search } = this.state

    return (
      <Content padder>
        <Form>
          <Item rounded style={{paddingHorizontal: 8}}>
            <Input placeholder="Search Code" onChangeText={search => this.setState({ search })} />
            <TouchableOpacity onPress={() => alert('Searching...')}>
              <Icon type="MaterialCommunityIcons" name="magnify" />
            </TouchableOpacity>
          </Item>
        </Form>
        <List>
          <ListItem itemHeader style={{paddingLeft: 0, paddingBottom: 8}}>
            <Text>Search Results</Text>
          </ListItem>
          { searchData.filter(result => result.text.startsWith(search)).map(result => (
            <ListItem key={result.id}>
              <Text>{result.text}</Text>
            </ListItem>
          )) }
        </List>
      </Content>
    )
  }

  render () {
    const { navigation } = this.props
    const { searchMode } = this.state

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent icon onPress={() => navigation.toggleDrawer()}>
              <Icon type="MaterialCommunityIcons" name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Analysis</Title>
          </Body>
          <Right />
        </Header>
        { this.state.searchMode ? this.searchUI() : (<Text>Analysis Data</Text>) }
      </Container>
    )
  }
}

export default Store.withStore(Analysis)
