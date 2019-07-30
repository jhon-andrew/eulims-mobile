import React from 'react'
import Store from '../../store'
import { Container, Header, Left, Button, Body, Title, Right, Content, Form, Item, Input, Icon, List, ListItem, Text, Row, Grid } from 'native-base'
import { StyleSheet, FlatList } from 'react-native'
import API from '../../api'

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
    const api = new API(this.props.store)
    let searchResults = (searchTerm.length >= 3) ? await api.getSampleCode(searchTerm) : []
    this.setState({ searchResults })
  }

  async navigateToAnalysis (sample_code) {
    const { store, navigation } = this.props
    const api = new API(store)
    const analysis = await api.getAnalysis(sample_code)
    return navigation.navigate('analysis', analysis)
  }

  rowKey (item, index) {
    return item.product_id.toString()
  }

  renderSearchResult ({ item: result }) {
    const { navigation } = this.props

    return (
      <Row onPress={this.navigateToAnalysis.bind(this, result.sample_code)}>
        <Text>{result.sample_code}</Text>
      </Row>
    )
  }

  render () {
    const { navigation } = this.props
    const { searchResults } = this.state
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent icon onPress={navigation.toggleDrawer.bind(this)}>
              <Icon type="MaterialCommunityIcons" name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Search</Title>
          </Body>
          <Right>
            <Button transparent icon onPress={() => navigation.navigate('codeScanner', { tagType: 'Sample Tag' })}>
              <Icon type="MaterialCommunityIcons" name="qrcode-scan" />
            </Button>
          </Right>
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
            {/* { searchResults.map((result, index) => (
              <ListItem key={result.sample_id}>
                <Text>{result.sample_code}</Text>
              </ListItem>
            )) } */}
          </List>
          <Grid>
            <FlatList
              initialNumToRender={10}
              maxToRenderPerBatch={15}
              data={searchResults}
              keyExtractor={this.rowKey.bind(this)}
              renderItem={this.renderSearchResult.bind(this)}
            />
          </Grid>
        </Content>
      </Container>
    )
  }
}

export default Store.withStore(Search)
