import React from 'react'
import Store from '../store'
import { Container, Body, Title } from 'native-base'

class ServerSelection extends React.Component {
  render () {
    const { store } = this.props

    return (
      <Container>
        <Header>
          <Body>
            <Title>Server Selection</Title>
          </Body>
        </Header>
      </Container>
    )
  }
}

export default Store.withStore(ServerSelection)
