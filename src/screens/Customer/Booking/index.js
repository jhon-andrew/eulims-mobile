import React from 'react'
import Store from '../../../store'
import { StyleSheet } from 'react-native'
import { Container, Content, Header, Body, Left, Button, Text, Icon, Title, List, ListItem, Right, Form, Item, Input, Badge, Row} from 'native-base'
import API from '../../../api'

class Index extends React.Component {
	constructor(props) {
	  super(props)
	  this.state = {
	  	mybookings: [],
	  	search: undefined
	  }
	}

	async componentDidMount () {
		const { store, navigation} = this.props
		const api = new API(store)
		try {
			mybookings = await api.getBookings(423) //id
			this.setState({ mybookings ,search: ""})
		} catch (err) {
			console.log(err)
		}

		this.focusListener = navigation.addListener("didFocus", async () => {
      // The screen is focused
      // Call any action
      mybookings = await api.getBookings(423) //id
			this.setState({ mybookings ,search: ""})
    })
	}

	componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove()
  }

	badge (success) {
		if (success==1) {
			return (<Badge success><Icon type="MaterialCommunityIcons" name="bookmark-outline" /></Badge>)
		} else if (success==2) {
			return (<Badge danger><Icon type="MaterialCommunityIcons" name="bookmark-outline" /></Badge>)
		} else {
			return (<Badge primary><Icon type="MaterialCommunityIcons" name="bookmark-outline" /></Badge>)
		}
	}

	render () {
		const { navigation } = this.props
		const { mybookings, search } = this.state
		return (
			<Container>
				<Header>
					<Left>
            <Button transparent icon onPress={navigation.toggleDrawer.bind(this)}>
              <Icon type="MaterialCommunityIcons" name="menu" />
            </Button>
          </Left>
          <Body>
            <Title style={{textAlign: 'center'}}>Bookings</Title>
          </Body>
					<Right >
						<Button transparent onPress={() => navigation.navigate('bookingform')}>
              <Icon type="MaterialCommunityIcons" name="plus" />
            </Button>
					</Right>
				</Header>
				<Content>
					<Form style={{ margin: 10 }}>
            <Item rounded style={{ paddingHorizontal: 8 }}>
              <Input placeholder="Search" onChangeText={search => this.setState({ search })} />
              <Icon type="MaterialCommunityIcons" name="magnify" />
            </Item>
          </Form>
          <Body>
            <Row>
              <Badge primary>
                <Text>Pending</Text>
              </Badge>
              <Badge success>
                <Text>Approved</Text>
              </Badge>
              <Badge danger>
                <Text>Dissapproved</Text>
              </Badge>
            </Row>
          </Body>
					<List>
						{
							mybookings.filter(({booking_reference})=> {
								let ref = booking_reference.startsWith(search)
								return ref
							}).map((record, index) => (
								<ListItem itemDivider key={record.booking_id}>
									<Left style = {{flex: 0}}>
                    { this.badge(record.booking_status) }
                  </Left>
                  <Body>
										<Text>{record.booking_reference} </Text>
										<Text note>Schedule: {record.scheduled_date}</Text>
										<Text note>Created: {record.date_created}</Text>
                  </Body>
                  <Right>
                    <Text>Qty: {record.qty_sample}</Text>
                  </Right>
                </ListItem>
							))
						}			            
          </List>
				</Content>
			</Container>
		)
	}
}

export default Store.withStore(Index)