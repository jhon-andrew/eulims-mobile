import React from 'react'
import Store from '../../store'
import { Container, Content, Text, Header, Left, Button, Icon, Body, Item, Input, Right, Title, Form, H2, List, ListItem, Badge, Toast, Subtitle } from 'native-base'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { GetSampleCode } from '../../api'

const styles = StyleSheet.create({
  sampleCode: {
    marginTop: 8
  },
  listHeader: {
    paddingBottom: 0,
    paddingLeft: 0
  }
})

class Analysis extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchMode: true,
      search: undefined,
      searchData: []
    }
  }

  componentDidMount () {
    const { params } = this.props.navigation.state
    this.setState({
      searchMode: (params && params.sampleCode)
    })
  }

  analysisUI () {
    const { params } = this.props.navigation.state
    return (
      <Content padder>
        <H2 style={styles.sampleCode}>{params.sampleCode}</H2>
        <List>
          <ListItem itemHeader first style={styles.listHeader}>
            <Text>Samples</Text>
          </ListItem>
          {params.samples.map((sample, index) => (
            <ListItem key={index}>
              <Body>
                <Text>{sample.name}</Text>
                <Text note>{sample.description}</Text>
              </Body>
            </ListItem>
          ))}
          <ListItem itemHeader style={styles.listHeader}>
            <Text>Analysis</Text>
          </ListItem>
          {params.tests.map((test, index) => (
            <ListItem key={index}>
              <Body>
                <Text>{test.name}</Text>
                <Text note>{test.method}</Text>
              </Body>
              <Right>
                <Badge>
                  <Text>{test.status.toUpperCase()}</Text>
                </Badge>
              </Right>
            </ListItem>
          ))}
        </List>
      </Content>
    )
  }

  async search (term) {
    let searchData = (term.length >= 3) ? await GetSampleCode(term) : []
    this.setState({ searchData })
  }

  searchUI () {
    const { searchData, search } = this.state

    return (
      <Content padder>
        <Form>
          <Item rounded style={{paddingHorizontal: 8}}>
            <Input placeholder="Search Code" onChangeText={term => this.search(term)} autoCapitalize="characters" />
            <TouchableOpacity onPress={() => alert('Searching...')}>
              <Icon type="MaterialCommunityIcons" name="magnify" />
            </TouchableOpacity>
          </Item>
        </Form>
        <List>
          <ListItem itemHeader style={{paddingLeft: 0, paddingBottom: 8}}>
            <Text>Search Results</Text>
          </ListItem>
          { searchData.map(result => (
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
            <Subtitle>{this.state.searchMode.toString()}</Subtitle>
          </Body>
          <Right />
        </Header>
        { this.state.searchMode ? this.searchUI() : this.analysisUI() }
      </Container>
    )
  }
}

export default Store.withStore(Analysis)
