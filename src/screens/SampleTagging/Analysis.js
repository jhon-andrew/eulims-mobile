import React from 'react'
import Store from '../../../store'
import { Container, Header, Left, Button, Icon, Body, Title, Subtitle, Right, Content, List, ListItem, Text, Badge } from 'native-base'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  listHeader: {
    paddingBottom: 0,
    paddingLeft: 0
  }
})

class Analysis extends React.Component {
  openTagging (test) {
    const { navigation } = this.props
    test.procedures = [
      {
        procedure: 'Oxidation',
        startDate: '2019-04-29',
        endDate: '2019-04-29',
        status: 'pending'
      },
      {
        procedure: 'Diffusion',
        startDate: '2019-04-29',
        endDate: '2019-04-29',
        status: 'pending'
      },
      {
        procedure: 'Heat',
        startDate: '2019-04-29',
        endDate: '2019-04-29',
        status: 'pending'
      },
      {
        procedure: 'Drier',
        startDate: '2019-04-29',
        endDate: '2019-04-29',
        status: 'pending'
      }
    ]
    navigation.navigate('tagging', test)
  }

  render () {
    const { navigation } = this.props
    const { params } = navigation.state

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent icon onPress={() => navigation.goBack()}>
              <Icon type="MaterialCommunityIcons" name="arrow-left" />
            </Button>
          </Left>
          <Body>
            <Title>Analysis</Title>
            <Subtitle>{params.sampleCode}</Subtitle>
          </Body>
          <Right>
            <Button transparent icon onPress={() => navigation.replace('search')}>
              <Icon type="MaterialCommunityIcons" name="magnify" />
            </Button>
          </Right>
        </Header>
        <Content padder>
          <List>
            <ListItem itemHeader style={styles.listHeader}>
              <Text>Samples</Text>
            </ListItem>
            {/* Samples */}
            {params.samples.map((sample, index) => (
              <ListItem key={index}>
                <Body>
                  <Text>{sample.name}</Text>
                  <Text note>{sample.description}</Text>
                </Body>
              </ListItem>
            ))}

            <ListItem itemHeader style={styles.listHeader}>
              <Text>Analysis</Text>
            </ListItem>
            {/* Analysis */}
            {params.tests.map((test, index) => (
              <ListItem key={index} onPress={() => this.openTagging(test)}>
                <Body>
                  <Text>{test.name}</Text>
                  <Text note>{test.method}</Text>
                </Body>
                <Right>
                  <Badge>
                    <Text>{test.status.toUpperCase()}</Text>
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
