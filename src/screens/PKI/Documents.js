import React from 'react'
import Store from '../../store'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Text, List, ListItem, Badge } from 'native-base'
import { StyleSheet, FlatList } from 'react-native'
import { SplashScreen } from 'expo'

const styles = StyleSheet.create({
  listHeader: {
    paddingBottom: 0,
    paddingLeft: 0
  }
})

class Documents extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sampleSignatory: [
        {
          filename: 'A descriptive filename.pdf',
          deadline: 'Sept. 30, 2019',
          received: 'Sept. 28, 2019 - 9:24 AM',
          signed: false,
          urgent: true,
          from: 'Tagapa-sign',
          code: 'A4B5C6'
        },
        {
          filename: 'Another doc to be signed.pdf',
          deadline: 'Oct. 2, 2019',
          received: 'Sept. 28, 2019 - 9:57 AM',
          signed: false,
          urgent: true,
          from: 'Tagapa-sign',
          code: 'A4B5C6',
          subject: 'A sample document to sign.'
        },
        {
          filename: 'Some more document.pdf',
          deadline: 'Oct. 4, 2019',
          received: 'Sept. 28, 2019 - 10:12 AM',
          signed: false,
          urgent: false,
          from: 'Tagapa-sign',
          code: 'A4B5C6',
          subject: 'A sample document to sign.'
        },
        {
          filename: 'A document.pdf',
          deadline: 'Sept. 29, 2019',
          received: 'Sept. 27, 2019 - 8:24 AM',
          signed: true,
          urgent: false,
          from: 'Tagapa-sign',
          code: 'A4B5C6',
          subject: 'A sample document to sign.'
        },
        {
          filename: 'A document.pdf',
          deadline: 'Sept. 29, 2019',
          received: 'Sept. 27, 2019 - 8:24 AM',
          signed: true,
          urgent: false,
          from: 'Tagapa-sign',
          code: 'A4B5C6',
          subject: 'A sample document to sign.'
        },
        {
          filename: 'A document.pdf',
          deadline: 'Sept. 29, 2019',
          received: 'Sept. 27, 2019 - 8:24 AM',
          signed: true,
          urgent: false,
          from: 'Tagapa-sign',
          code: 'A4B5C6',
          subject: 'A sample document to sign.'
        },
        {
          filename: 'A document.pdf',
          deadline: 'Sept. 29, 2019',
          received: 'Sept. 27, 2019 - 8:24 AM',
          signed: true,
          urgent: false,
          from: 'Tagapa-sign',
          code: 'A4B5C6',
          subject: 'A sample document to sign.'
        }
      ]
    }
  }

  componentDidMount () {
    SplashScreen.hide()
  }

  rowKey (item, index) {
    return index.toString()
  }

  renderDocumentRow ({ item: document }) {
    return (
      <ListItem onPress={() => this.props.navigation.navigate('document', { document })}>
        <Body>
          <Text>{document.filename}</Text>
          <Text note>Deadline: {document.deadline}</Text>
          <Text note>Received: {document.received}</Text>
        </Body>
        { document.urgent ? (
          <Right>
            <Badge danger>
              <Text style={{ color: '#ffffff' }}>URGENT</Text>
            </Badge>
          </Right>
        ) : null }
      </ListItem>
    )
  }

  render () {
    const { navigation } = this.props
    const { sampleSignatory } = this.state
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent icon onPress={navigation.toggleDrawer.bind(this)}>
              <Icon type="MaterialCommunityIcons" name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Documents</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <List>
            <ListItem itemHeader style={styles.listHeader}>
              <Text>For Signatory</Text>
            </ListItem>
            <FlatList
              initialNumToRender={10}
              maxToRenderPerBatch={15}
              data={sampleSignatory.filter(document => document.signed === false)}
              keyExtractor={this.rowKey.bind(this)}
              renderItem={this.renderDocumentRow.bind(this)}
            />

            <ListItem itemHeader style={styles.listHeader}>
              <Text>Recently Signed</Text>
            </ListItem>
            <FlatList
              initialNumToRender={10}
              maxToRenderPerBatch={15}
              data={sampleSignatory.filter(document => document.signed === true)}
              keyExtractor={this.rowKey.bind(this)}
              renderItem={this.renderDocumentRow.bind(this)}
            />
          </List>
        </Content>
      </Container>
    )
  }
}

export default Store.withStore(Documents)
