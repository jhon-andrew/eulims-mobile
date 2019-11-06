import React from 'react'
import Store from '../../store'
import { Container, Header, Left, Button, Icon, Body, Title, Subtitle, Right, Content, List, ListItem, Text, Badge, ActionSheet } from 'native-base'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  listHeader: {
    paddingBottom: 0,
    paddingLeft: 0
  }
})

class Analysis extends React.Component {
  constructor (props) {
    super(props)

    // TEMPORARY: To simulate status of each test in a sample
    let sample = props.navigation.state.params
    sample.tests = sample.tests.map(test => {
      test.status = 'Pending'
      return test
    })

    this.state = { sample }
  }

  openTagging (test, index) {
    // const { navigation } = this.props
    // test.procedures = [
    //   {
    //     procedure: 'Oxidation',
    //     startDate: '2019-04-29',
    //     endDate: '2019-04-29',
    //     status: 'pending'
    //   },
    //   {
    //     procedure: 'Diffusion',
    //     startDate: '2019-04-29',
    //     endDate: '2019-04-29',
    //     status: 'pending'
    //   },
    //   {
    //     procedure: 'Heat',
    //     startDate: '2019-04-29',
    //     endDate: '2019-04-29',
    //     status: 'pending'
    //   },
    //   {
    //     procedure: 'Drier',
    //     startDate: '2019-04-29',
    //     endDate: '2019-04-29',
    //     status: 'pending'
    //   }
    // ]
    // navigation.navigate('tagging', test)

    // TEMPORARY: Since workflows are disabled, changing of status is directly under the analysis.
    let buttons = ['Pending', 'On-going', 'Done', 'Cancel']
    ActionSheet.show(
      {
        title: 'Change Status',
        options: buttons,
        cancelButtonIndex: buttons.indexOf('Cancel')
      },
      buttonIndex => {
        if (buttonIndex !== buttons.indexOf('Cancel')) {
          let sample = this.state.sample
          sample.tests[index].status = buttons[buttonIndex]
          this.setState({ sample })
        }
      }
    )
  }

  render () {
    const { navigation } = this.props
    const { sample } = this.state

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent icon onPress={() => navigation.pop()}>
              <Icon type="MaterialCommunityIcons" name="arrow-left" />
            </Button>
          </Left>
          <Body>
            <Title>Analysis</Title>
            <Subtitle>{sample.sampleCode}</Subtitle>
          </Body>
          <Right>
            <Button transparent icon onPress={() => navigation.popToTop()}>
              <Icon type="MaterialCommunityIcons" name="magnify" />
            </Button>
          </Right>
        </Header>
        <Content padder>
          <List>
            <ListItem itemHeader style={styles.listHeader}>
              <Text>Sample</Text>
            </ListItem>
            {/* Samples */}
            {/* {params.samples.map((sample, index) => (
              <ListItem key={index}> */ }
              <ListItem>
                <Body>
                  <Text>{sample.samples.name}</Text>
                  <Text note>{sample.samples.description}</Text>
                </Body>
              </ListItem>
            {/* ))} */}

            <ListItem itemHeader style={styles.listHeader}>
              <Text>Analysis</Text>
            </ListItem>
            {/* Analysis */}
            {sample.tests.map((test, index) => (
              <ListItem key={index} onPress={() => this.openTagging(test, index)}>
                <Body>
                  <Text>{test.testname}</Text>
                  <Text note>{test.method}</Text>
                </Body>
                <Right>
                  <Badge primary={test.status === 'On-going'} success={test.status === 'Done'}>
                    <Text style={{ color: test.status !== 'Pending' ? '#ffffff' : 'grey' }}>{test.status.toUpperCase()}</Text>
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

export default Store.withStore(Analysis)
