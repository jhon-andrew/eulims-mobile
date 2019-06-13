import React from 'react'
import Store from '../../../store'
import { StyleSheet } from 'react-native'
import { Container, Header, Body, Left, Button, Text, Icon, Title} from 'native-base'

class Index  extends React.Component {
	render () {
		return (
			<Container>
				<Header>
					<Title>This is the Booking Screen</Title>
				</Header>
				<Body>
					<Left>
						<Button>
							<Text>Request</Text>
							<Icon name='menu' />
						</Button>
					</Left>
				</Body>
			</Container>
		)
	}
}

export default Store.withStore(Index)