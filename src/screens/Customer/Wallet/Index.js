import React from 'react'
import Store from '../../../store'
import { Text, Container, Content, Title, Subtitle, Header, Left, Right, Button, Card, CardItem, ListItem, Body, List, H1, Icon} from 'native-base'
import API from '../../../api'

class Index  extends React.Component {
	constructor(props) {
	  super(props)
	  this.state = {
	  	transactions: [] ,
	  	detailedtransaction: []
	  }
	}

	async componentDidMount () {
		const { store, navigation } = this.props
		const api = new API(store)
		try {
			transactions = await api.getWalletTransactions(50) //supply user id
			detailedtransaction = await api.getDetailedTransactions(transactions.customerwallet_id)
			this.setState({ transactions, detailedtransaction })
			// this.setState({ transactions })
			
		} catch (err) {
			console.log(err)
		}

		this.focusListener = navigation.addListener("didFocus", async () => {
	      // The screen is focused
	      // Call any action

	      	transactions = await api.getWalletTransactions(50) //supply user id
			detailedtransaction = await api.getDetailedTransactions(transactions.customerwallet_id)
			this.setState({ transactions, detailedtransaction })
	    });
	}

	componentWillUnmount() {
    	// Remove the event listener
    	this.focusListener.remove();
    }

	render () {
		const { navigation } = this.props
		const { transactions, detailedtransaction } = this.state
		console.log(detailedtransaction)
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
					
					<Text style={{fontSize: 24}}>Balance : {transactions.balance}</Text>
					<Text note>Last Update : {transactions.date}</Text>
		          		
					<Card>
						<CardItem header bordered>
							<Text> Recent</Text>
						</CardItem>
						{
							detailedtransaction.map((record, index) => (
								<CardItem itemDivider key={record.customertransaction_id}>
									
									<Left>
										<Body>
							                <Text note>{record.date} </Text>
							                <Text>Amount: {record.amount}</Text>
							                <Text note>Balance: {record.balance}</Text>
						                </Body>
						             </Left>
						             <Right/>
									
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

export default Store.withStore(Index)