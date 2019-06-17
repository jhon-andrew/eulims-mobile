import React from 'react'
import Store from '../../store'
import { Alert } from 'react-native'
import { Container, Header, Left, Button, Icon, Body, Title, Content, List, ListItem, Text, Right, Spinner, Input, Form, Item, Label, View, Footer } from 'native-base'
import theme from '../../../native-base-theme/variables/eulims'
import { CheckServer } from '../../api'

class ServerSelection extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      customServer: undefined,
      prefServer: props.store.get('prefServer'),
      servers: props.store.get('servers')
    }
  }

  savePrefServer () {
    let { store, navigation } = this.props
    store.set('prefServer')(this.state.prefServer)
    navigation.pop()
  }

  addServer () {
    let { store } = this.props
    let servers = store.get('servers')
    servers.push({
      name: this.state.customServer,
      address: this.state.customServer
    })
    this.setState({
      prefServer: this.state.customServer,
      customServer: undefined,
      servers
    })
    store.set('servers')(servers)
    this.Content._root.scrollToEnd()
  }

  async removeServer (index, serverName) {
    Alert.alert(
      serverName,
      'Are you sure you want to delete this server?',
      [
        { text: 'Delete', onPress: () => {
          let { servers } = this.state
          servers.splice(index, 1)
          this.setState({ servers })
          this.props.store.set('servers')(servers)
        }, style: 'destructive' },
        { text: 'Cancel', style: 'cancel' }
      ]
    )
  }

  render () {
    const { navigation } = this.props

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent icon onPress={() => navigation.pop()}>
              <Icon type="MaterialCommunityIcons" name="arrow-left" />
            </Button>
          </Left>
          <Body>
            <Title>Select Server</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.savePrefServer()} disabled={!this.state.prefServer}>
              <Text>Save</Text>
            </Button>
          </Right>
        </Header>
        <Content ref={content => (this.Content = content)}>
          <List>
            {
              this.state.servers.map((server, index) => (
                <ListItem
                  key={index}
                  selected={(server.address === this.state.prefServer)}
                  onPress={() => this.setState({ prefServer: server.address })}
                >
                  <Body>
                    <Text>{server.name}</Text>
                    <Text note>{server.address}</Text>
                  </Body>
                  <Right>
                    <Button small rounded danger icon onPress={this.removeServer.bind(this, index, server.name)}>
                      <Icon type="MaterialCommunityIcons" name="delete-forever" />
                    </Button>
                  </Right>
                </ListItem>
              ))
            }
          </List>
        </Content>
        <Footer style={{backgroundColor: 'transparent', margin: 8}}>
          <Form style={{flex: 1, marginRight: 8}}>
            <Item rounded style={{paddingHorizontal: 8}}>
              <Input placeholder="Custom Server" autoCapitalize="none" value={this.state.customServer} onChangeText={customServer => this.setState({ customServer })} />
            </Item>
          </Form>
          <Button icon rounded style={{marginTop: 2}} onPress={() => this.addServer()} disabled={!this.state.customServer}>
            <Icon type="MaterialCommunityIcons" name="plus" />
          </Button>
        </Footer>
      </Container>
    )
  }
}

export default Store.withStore(ServerSelection)
