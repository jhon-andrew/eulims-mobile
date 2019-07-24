import React from 'react'
import Store from '../../../store'
import { StyleSheet } from 'react-native'
import { Container, Content, Header, Footer, FooterTab, Body, Left, Button, Text, Icon, List, ListItem, Right, Title} from 'native-base'
import API from '../../../api'

class Completed  extends React.Component {
	constructor(props) {
	  super(props)
	  this.state = {
	  	mycustcomRequest: []
	  }
	}

	async componentDidMount () {
		const { store } = this.props
		const api = new API(store)
		try {
			mycustcomRequest = await api.getComRequests()
			this.setState({ mycustcomRequest })
		} catch (err) {
			console.log(err)
		}
	}

	render () {
		const { navigation } = this.props
    const { mycustcomRequest } = this.state

		return (
			<Container>
				<Header>
					<Left>
            <Button transparent icon onPress={navigation.toggleDrawer.bind(this)}>
              <Icon type="MaterialCommunityIcons" name="menu" />
            </Button>
          </Left>
					<Body>
						<Title style={{textAlign: 'center'}}>Completed Requests</Title>
					</Body>
				</Header>
				<Content>
					<List>
            { mycustcomRequest.map((record, index) => (
              <ListItem itemDivider key={record.request_id} onPress={() => navigation.navigate('tracks',{ request_id:record.request_id,request_ref_num:record.request_ref_num})}>
                <Left>
                  <Body>
                    <Text>{record.request_ref_num} </Text>
                    <Text note>{record.request_datetime}</Text>
                  </Body>
                </Left>
                <Right>
                  <Button transparent>
                    <Icon name="arrow-forward" />
                  </Button>
                </Right>
              </ListItem>
						)) }
          </List>
				</Content>
				<Footer>
          <FooterTab>
            <Button vertical onPress={() => navigation.navigate('tracking')}>
              <Icon type="MaterialCommunityIcons" name="buffer" />
              <Text>Ongoing</Text>
            </Button>
            <Button vertical active>
              <Icon type="MaterialCommunityIcons" name="check-outline" />
              <Text>Completed</Text>
            </Button>
          </FooterTab>
        </Footer>
			</Container>
		)
	}
}

export default Store.withStore(Completed)
