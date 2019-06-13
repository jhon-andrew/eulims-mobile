import React from 'react'
import Store from '../../../store'
import { StyleSheet } from 'react-native'
import { Container, Content, Header, Footer, FooterTab, Body, Left, Button, Text, Icon, List, ListItem, Right, H1, Title} from 'native-base'

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
						<Title style={{textAlign: 'center'}}>Ongoing Requests</Title>
					</Body>
					
				</Header>
				<Content>
					<List>
			            <ListItem itemDivider>
			              <Left>
			                <Text>Simon Mignolet</Text>
			              </Left>
			              <Right>
			                <Button transparent onPress={() => navigation.navigate('tracks')}>
								<Icon name="arrow-forward" />
							</Button>
			              </Right>
			            </ListItem>
			            <ListItem itemDivider>
			             <Left>
			                <Text>Nathaniel Clyne</Text>
			              </Left>
			              <Right>
			                <Button transparent onPress={() => navigation.navigate('tracks')}>
								<Icon name="arrow-forward" />
							</Button>
			              </Right>
			            </ListItem>
			            <ListItem itemDivider>
			              <Left>
			                <Text>Dejan Lovren</Text>
			              </Left>
			              <Right>
			                <Button transparent onPress={() => navigation.navigate('tracks')}>
								<Icon name="arrow-forward" />
							</Button>
			              </Right>
			            </ListItem>
		          	</List>
				</Content>
				<Footer>
		          <FooterTab>
		            <Button vertical active>
		              <Icon type="MaterialCommunityIcons" name="buffer" />
		              <Text>Ongoing</Text>
		            </Button>
		            <Button vertical onPress={() => navigation.navigate('completed')}>
		              <Icon type="MaterialCommunityIcons" name="check-outline" />
		              <Text>Completed</Text>
		            </Button>
		          </FooterTab>
		        </Footer>
			</Container>
		)
	}
}

export default Store.withStore(Index)