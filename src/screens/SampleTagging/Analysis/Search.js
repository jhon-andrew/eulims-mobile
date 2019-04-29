import React from 'react'
import Store from '../../../store'
import { Container, Header, Left, Button, Body, Title, Right, Content, Form, Item, Input, Icon, List, ListItem, Text } from 'native-base'
import { StyleSheet } from 'react-native'
import { GetSampleCode } from '../../../api'

const styles = StyleSheet.create({
  listHeader: {
    paddingBottom: 0,
    paddingLeft: 0
  },
  formItem: {
    paddingHorizontal: 8
  }
})

class Search extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchResults: []
    }
  }

  async search (searchTerm) {
    let searchResults = (searchTerm.length >= 3) ? await GetSampleCode(searchTerm) : []
    this.setState({ searchResults })
  }

  render () {
    const { navigation } = this.props
    const { searchResults } = this.state
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent icon onPress={() => navigation.toggleDrawer()}>
              <Icon type="MaterialCommunityIcons" name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Search</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Form>
            <Item rounded style={styles.formItem}>
              <Input placeholder="Sample Code" autoCapitalize="characters" onChangeText={this.search.bind(this)} />
              <Icon type="MaterialCommunityIcons" name="magnify" />
            </Item>
          </Form>
          <List>
            <ListItem itemHeader style={styles.listHeader}>
              <Text>Results ({searchResults.length})</Text>
            </ListItem>
            { searchResults.map((result, index) => (
              <ListItem key={index}>
                <Text>{result.text}</Text>
              </ListItem>
            )) }
          </List>
        </Content>
      </Container>
    )
  }
}

export default Store.withStore(Search)