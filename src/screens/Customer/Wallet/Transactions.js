import React from 'react'
import Store from '../../../store'
import { Text, Container, Content, Title, Subtitle, Header, Left, Right, Button, Card, CardItem, ListItem, Body, List, H1, Icon} from 'native-base'
import API from '../../../api'

class Transactions  extends React.Component {
	constructor(props) {
	  super(props)
	  this.state = {
	  	transactions: []
	  }
	}

	async componentDidMount () {
		const { store } = this.props
		const { navigation } = this.props
		const wallet_id = navigation.getParam('wallet_id')
		const api = new API(store)
		try {
			transactions = await api.getDetailedTransactions(wallet_id)
			this.setState({ transactions })
			
		} catch (err) {
			console.log(err)
		}
	}

	render () {
		const { navigation } = this.props
		const { transactions } = this.state
		return (
			<Container>
				<Header>
					<Left>
			            <Button transparent onPress={() => navigation.navigate('wallet')}>
			              <Icon name="arrow-back" />
			            </Button>
			        </Left>
					<Body>
						<Title style={{alignItems:'center',flex:1}}>Wallet</Title>
						<Subtitle>Transaction Info</Subtitle>
					</Body>
					<Right/>
				</Header>
				<Content padder>
					<Card>
						<CardItem header bordered>
							<Text> Recent</Text>
						</CardItem>
						{
							transactions.map((record, index) => (
								<CardItem bordered key={record.customertransaction_id}>
									<Left>
										<Body>
										<Text>{record.date}</Text>
										<Text>{record.balance}</Text>
				              			<Text note>{record.amount}</Text> 
										</Body>
									</Left>
								</CardItem>
							))
						}	
						
						<CardItem footer bordered>
							<Text style={{textAlign: 'center'}}> ***Nothing Follows***</Text>
						</CardItem>
					</Card> 
				</Content>
			</Container>
		)
	}
}

export default Store.withStore(Transactions)