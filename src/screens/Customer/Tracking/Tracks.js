import React from 'react'
import Store from '../../../store'
import { Container, Header, Content, ListItem, CheckBox, Text, Body, Left, Right, Button, Icon, Title, Subtitle} from 'native-base';


class Tracks  extends React.Component {
	render () {
		const { navigation } = this.props
		return (
			<Container>
		        <Header>
		        	<Left>
						<Button transparent onPress={() => navigation.navigate('tracking')}>
							<Icon name="arrow-back" />
						</Button>
					</Left>
					<Content>
						<Title style={{alignItems:'center'}}>CHEM-102</Title>
						<Subtitle>Request Code</Subtitle>
					</Content>
					<Right/>
				</Header>
		        <Content>
		          <ListItem itemDivider>
		            <CheckBox checked={true} />
		            <Body>
		              <Text>Daily Stand Up</Text>
		            </Body>
		          </ListItem>
		          <ListItem itemDivider>
		            <CheckBox checked={false} />
		            <Body>
		              <Text>Discussion with Client</Text>
		            </Body>
		          </ListItem>
		          <ListItem itemDivider>
		            <CheckBox checked={false} color="green"/>
		            <Body>
		              <Text>Finish list Screen</Text>
		            </Body>
		          </ListItem>
		        </Content>
	      	</Container>
		)
	}
}

export default Store.withStore(Tracks)