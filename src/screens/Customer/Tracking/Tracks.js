import React from 'react'
import Store from '../../../store'
import { Container, Header, Content, ListItem, CheckBox, Text, Body, Left, Right, Button, Icon, Title, Subtitle, Row, Card, CardItem} from 'native-base';
import API from '../../../api'

class Tracks  extends React.Component {
	constructor(props) {
	  super(props)
	  this.state = {
	  	tracks: []
	  }
	}

	async componentDidMount () {
		const { store, navigation } = this.props
		const api = new API(store)
		const request_id = navigation.getParam('request_id')
		try {
			tracks = await api.getSamples(request_id) //supply reque id
			this.setState({ tracks })

			// this.setState({ transactions })
			
		} catch (err) {
			console.log(err)
		}
	}

	iconfinder(value:boolean){
		if(value){
			return(<Icon type="MaterialCommunityIcons" name="checkbox-multiple-marked" />)
		}
		else{
			return(<Icon type="MaterialCommunityIcons" name="checkbox-multiple-blank-outline" />)
		}
	}

	render () {
		const { navigation } = this.props
    	const request_id = navigation.getParam('request_id')
    	const request_ref_num = navigation.getParam('request_ref_num')
    	const { tracks } = this.state
		return (
			<Container>
		        <Header>
		        	<Left style={{flex:0}}>
						<Button transparent onPress={() => navigation.pop()}>
							<Icon name="arrow-back" />
						</Button>
					</Left>
					<Body>
						<Title style={{alignItems:'center'}}>Tracks</Title>
						<Subtitle >({request_ref_num})</Subtitle>
					</Body>
					<Right style={{flex:0}} />
				</Header>
		        <Content>
		        
		        <Card>
		            <CardItem>
		              <Body style={{alignItems:'center'}}>
		                <Text><Icon type="MaterialCommunityIcons" name="checkbox-multiple-marked" />Completed 
	      					  , <Icon type="MaterialCommunityIcons" name="checkbox-multiple-blank-outline" />Pending</Text>
		              </Body>
		            </CardItem>
		        </Card>	
  				
		        {
					tracks.map((record, index) => (
			        <ListItem itemDivider key ={index}>
		            	
		            	{this.iconfinder(record.completed)}
			            <Body>
			              <Text>{record.sample_code}</Text>
			              <Text note>{record.samplename}</Text>
			            </Body>
		          	</ListItem>

					))

				}
		        </Content>
	      	</Container>
		)
	}
}

export default Store.withStore(Tracks)