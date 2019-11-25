import React from 'react'
import Store from '../../store'
import { Container, Header, Left, Button, Icon, Body, Title, Subtitle, Right, Content, H3, List, ListItem, Text, Badge, ActionSheet, DatePicker, Card, CardItem, Toast } from 'native-base'
import { StyleSheet } from 'react-native'
import API from '../../api'

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
    this.state = {
      date: new Date()
    }
  }

  async changeStatus () {
    const { navigation, store } = this.props
    const { params } = navigation.state
    const api = new API(store)

    if (!params.tagging || params.tagging.tagging_status_id === 0) {
      await api.startAnalysis(params.tagging.analysis_id, this.state.date)
      Toast.show({ text: 'Analysis has started.' })
    } else if (params.tagging.tagging_status_id === 1) {
      await api.completedAnalysis(params.tagging.analysis_id, this.state.date)
      Toast.show({ text: 'Analysis has been completed.' })
    }

    const analysis = await api.getAnalysis(params.sampleCode)
    navigation.pop(2)
    navigation.navigate('analysis', analysis)
  }

  render () {
    const { navigation } = this.props
    const { params } = navigation.state

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent icon onPress={() => navigation.pop()}>
              <Icon type="MaterialCommunityIcons" name="arrow-left" />
            </Button>
          </Left>
          <Body>
            <Title>Tagging</Title>
            <Subtitle>{params.testname}</Subtitle>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <H3 style={styles.sampleMethod}>{params.method}</H3>
          <Card style={{ marginTop: 16, marginBottom: 16 }}>
            <CardItem>
              <Left>
              { !params.tagging || params.tagging.tagging_status_id === 0 ? (
                <Text>Date started:</Text>
              ) : (
                <Text>Date completed:</Text>
              )}
              </Left>
              <Body>
                <DatePicker
                  defaultDate={new Date()}
                  onDateChange={date => this.setState({ date })}
                />
              </Body>
              <Right />
            </CardItem>
          </Card>
          <Button block onPress={this.changeStatus.bind(this)}>
            { !params.tagging || params.tagging.tagging_status_id === 0 ? (
              <Text>Start Analysis</Text>
            ) : (
              <Text>Complete Analysis</Text>
            )}
          </Button>
        </Content>
      </Container>
    )
  }
}

export default Store.withStore(Tagging)
