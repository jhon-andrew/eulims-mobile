import React from 'react'
import Store from '../../../store'
import { Container, Header, Left, Button, Icon, Body, Title, Subtitle, Right, Content, H3, List, ListItem, Text, Badge, ActionSheet } from 'native-base'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  sampleMethod: {
    marginTop: 8
  },
  listHeader: {
    paddingBottom: 0,
    paddingLeft: 0
  }
})

class Tagging extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  changeStatus (index, procedure) {
    let buttons = ['Pending', 'On-going', 'Completed', 'Cancel']
    ActionSheet.show(
      {
        title: 'Change Status',
        options: buttons,
        cancelButtonIndex: 3
      },
      buttonIndex => {
        console.log(`Change status to "${buttons[buttonIndex]}".`)
      }
    )
  }

  render () {
    const { navigation } = this.props
    const { params } = navigation.state

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent icon onPress={() => navigation.toggleDrawer()}>
              <Icon type="MaterialCommunityIcons" name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Tagging</Title>
            <Subtitle>{params.name}</Subtitle>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <H3 style={styles.sampleMethod}>{params.method}</H3>
          <List>
            <ListItem itemHeader style={styles.listHeader}>
              <Text>Procedures</Text>
            </ListItem>

            {/* Procedures */}
            {params.procedures.map((procedure, index) => (
              <ListItem key={index} onPress={() => this.changeStatus(index, procedure)}>
                <Body>
                  <Text>{procedure.procedure}</Text>
                  <Text note>{procedure.startDate} - {procedure.endDate}</Text>
                </Body>
                <Right>
                  <Badge>
                    <Text>{procedure.status.toUpperCase()}</Text>
                  </Badge>
                </Right>
              </ListItem>
            ))}
          </List>
        </Content>
      </Container>
    )
  }
}

export default Store.withStore(Tagging)
