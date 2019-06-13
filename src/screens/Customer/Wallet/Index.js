import React from 'react'
import Store from '../../../store'
import { Text, Container, Content, Title, Subtitle, Header, Left, Right, Button, Card, CardItem, ListItem, Body, List, H1, Icon} from 'native-base'

class Index  extends React.Component {
	render () {
		const { navigation } = this.props
		return (
			<Container>
				<Header>
					<Left>
			            <Button transparent icon onPress={navigation.toggleDrawer.bind(this)}>
			              <Icon type="MaterialCommunityIcons" name="menu" />
			            </Button>
			        </Left>
					<Body>
						<Title style={{textAlign: 'center'}}>Wallet</Title>
						<Subtitle style={{textAlign: 'center'}}>Transaction History</Subtitle>
					</Body>
					<Right/>
				</Header>
				<Content padder>
					<List>
						<ListItem>
							<H1>Balance : 10,000.00</H1>
		          		</ListItem>
	          		</List>
					<Card>
						<CardItem header bordered>
							<Text> Recent</Text>
						</CardItem>
						<CardItem bordered>
							<Body>
								<Text>"01-01-2019"</Text>
		              			<Text note>Type and Amount</Text> 
							</Body>
						</CardItem>
						<CardItem bordered>
							<Body>
								<Text>"02-20-2019"</Text>
		              			<Text note>Type and Amount</Text> 
							</Body>	
						</CardItem>
						<CardItem footer bordered>
							<Text style={{textAlign: 'center'}}> ***Nothing Follows***</Text>
						</CardItem>
					</Card> 
				</Content>
			</Container>
		)
	}
}

export default Store.withStore(Index)