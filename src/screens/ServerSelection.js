import React from 'react'
import Store from '../store'
import { Modal } from 'react-native'
import { Container, Header, Left, Button, Icon, Body, Title, Content, List, ListItem, Text, Right, Spinner, Input, Form, Item, Label, View, Footer } from 'native-base'
import theme from '../../native-base-theme/variables/eulims'
import { CheckServer } from '../api'

const { servers } = require('../configs.json')

class ServerSelection extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      prefServer: null,
      servers: servers.map((server) => ({...server, status: 'checking'}))
    }
  }

  componentDidMount () {
    // Check status of predefined servers
    let servers = this.state.servers
    servers.forEach(async (server, index) => {
      let Server = await CheckServer(server.address)
      servers[index].status = (Server && Server.status === 'online') ? 'online' : 'offline'
      this.setState({ servers })
    })
  }

  savePrefServer () {
    this.props.store.set('prefServer')(this.state.prefServer)
    this.props.toggle()
  }

  // Temporary
  serverStatus (serverStatus) {
    switch(serverStatus) {
      case 'checking':
        return (<Spinner size="small" style={{ height: 29 }} color={theme.brandDark} />)
      break
      case 'online':
        return (<Icon type="MaterialCommunityIcons" name="lan-connect" style={{ color: theme.brandSuccess }} />)
      break
      case 'offline':
        return (<Icon type="MaterialCommunityIcons" name="lan-disconnect" style={{ color: theme.brandDanger }} />)
      break
    }
  }

  render () {
    const { toggle, isOpen } = this.props

    return (
      <Modal
        animationType="slide"
        visible={isOpen}
        onRequestClose={() => toggle()}
      >
        <Container>
          <Header>
            <Left>
              <Button transparent icon onPress={() => toggle()}>
                <Icon type="MaterialCommunityIcons" name="arrow-left" />
              </Button>
            </Left>
            <Body>
              <Title>Select Server</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => this.savePrefServer()}>
                <Text>Save</Text>
              </Button>
            </Right>
          </Header>
          <Content>
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
                      {this.serverStatus(server.status)}
                    </Right>
                  </ListItem>
                ))
              }
            </List>
          </Content>
          <Footer style={{backgroundColor: 'transparent', margin: 8}}>
            <Form style={{flex: 1, marginRight: 8}}>
              <Item rounded style={{paddingHorizontal: 8}}>
                <Input placeholder="Custom Server" onChangeText={prefServer => this.setState({ prefServer })} />
              </Item>
            </Form>
            <Button icon rounded style={{marginTop: 2}} onPress={() => this.savePrefServer()}>
              <Icon type="MaterialCommunityIcons" name="content-save-settings" />
            </Button>
          </Footer>
        </Container>
      </Modal>
    )
  }
}

export default Store.withStore(ServerSelection)
