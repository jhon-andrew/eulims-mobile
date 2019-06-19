import React from 'react'
import Store from '../../../store'
import { Container, Header, Content, ListItem, CheckBox, Text, Body, Left, Right, Button, Icon, Title, Subtitle} from 'native-base';
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

	render () {
		const { navigation } = this.props
    	const request_id = navigation.getParam('request_id')
    	const request_ref_num = navigation.getParam('request_ref_num')
    	const { tracks } = this.state
		return (
			<Container>
		        <Header>
		        	<Left style={{flex:0}}>
						<Button transparent onPress={() => navigation.navigate('tracking')}>
							<Icon name="arrow-back" />
						</Button>
					</Left>
					<Content>
						<Title style={{alignItems:'center',flex:1}}>Tracks</Title>
						<Subtitle >({request_ref_num})</Subtitle>
					</Content>
				</Header>
		        <Content>
		        {
					tracks.map((record, index) => (
			        <ListItem itemDivider key ={index}>
		            	<CheckBox checked={(record.completed)?true:false} />
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