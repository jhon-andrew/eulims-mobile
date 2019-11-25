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
      test.tagging = sample.tagging.find(tag => tag.analysis_id === test.analysis_id)
      return test
    })

    this.state = { sample }
  }

  openTagging (test) {
    test.sampleCode = this.state.sample.sampleCode
    if (test.tagging && test.tagging.tagging_status_id === 2) {
      alert('This analysis is already done.')
    } else {
      this.props.navigation.navigate('tagging', test)
    }
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
                  <Text>{sample.samples.samplename}</Text>
                  <Text note>{sample.samples.description}</Text>
                </Body>
              </ListItem>
            {/* ))} */}

            <ListItem itemHeader style={styles.listHeader}>
              <Text>Analysis</Text>
            </ListItem>
            {/* Analysis */}
            {sample.tests.map((test, index) => (
              <ListItem key={index} onPress={this.openTagging.bind(this, test)}>
                <Body>
                  <Text>{test.testname}</Text>
                  <Text note>{test.method}</Text>
                  { test.tagging && test.tagging.tagging_status_id === 1 ? (
                    <Text note>Started: {test.tagging.start_date}</Text>
                  ) : null }
                  { test.tagging && test.tagging.tagging_status_id === 2 ? (
                    <Text note>Completed: {test.tagging.start_date}</Text>
                  ) : null }
                </Body>
                <Right>
                  <Badge primary={test.tagging && test.tagging.tagging_status_id === 1} success={test.tagging && test.tagging.tagging_status_id === 2}>
                    <Text style={{ color: !test.tagging || test.tagging.tagging_status_id === 0 ? 'grey' : '#ffffff' }}>
                      {test.tagging ? ['PENDING', 'ON-GOING', 'DONE'][test.tagging.tagging_status_id] : 'PENDING'}
                    </Text>
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
