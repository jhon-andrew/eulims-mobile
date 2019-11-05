import React from 'react'
import Store from '../store'
import { SplashScreen } from 'expo'
import { Container, Header, Body, Title, Content, Left, Button, Icon, Right, List, ListItem, Text, ActionSheet, Badge } from 'native-base'
import { FlatList } from 'react-native'

class RecentScans extends React.Component {
  componentDidMount () {
    SplashScreen.hide()
  }

  codeScanner () {
    const { navigation } = this.props
    ActionSheet.show(
      {
        title: 'Select',
        options: ['Scan a Sample', 'Scan a Product', 'Cancel'],
        cancelButtonIndex: 2
      },
      optionIndex => {
        const tagType = ['Sample Tag', 'Product Code']
        if (optionIndex < 2) {
          navigation.navigate('codeScanner', { tagType: tagType[optionIndex] })
        }
      }
    )
  }

  rowKey (item, index) {
    return index.toString()
  }

  renderRecentScansList ({ item: scanned }) {
    const { store, navigation } = this.props
    
    return scanned.type === 'analysis' ? (
      <ListItem onPress={() => navigation.navigate('analysis', scanned.data)}>
        <Body>
          <Text>{scanned.data.sampleCode}</Text>
          {/* <Text note>Status: Pending (0/4)</Text> */}
        </Body>
        <Right>
          <Badge>
            <Text>Analysis</Text>
          </Badge>
        </Right>
      </ListItem>
    ) : (
      <ListItem onPress={() => navigation.navigate(scanned.data.producttype_id === 1 ? 'entries' : 'schedule', scanned.data)}>
        <Body>
          <Text>{scanned.data.product_code}</Text>
          {/* <Text note>Status: Pending (0/4)</Text> */}
        </Body>
        <Right>
          <Badge>
            <Text>Product</Text>
          </Badge>
        </Right>
      </ListItem>
    )
  }

  render () {
    const { navigation, store } = this.props
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent icon onPress={navigation.toggleDrawer.bind(this)}>
              <Icon type="MaterialCommunityIcons" name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Recent Scans</Title>
          </Body>
          <Right>
            <Button transparent icon onPress={this.codeScanner.bind(this)}>
              <Icon type="MaterialCommunityIcons" name="qrcode-scan" />
            </Button>
          </Right>
        </Header>
        <Content>
          <List>
            <FlatList
              initialNumToRender={10}
              maxToRenderPerBatch={15}
              data={store.get('recentScans')}
              keyExtractor={this.rowKey}
              renderItem={this.renderRecentScansList.bind(this)}
            />
          </List>
        </Content>
      </Container>
    )
  }
}

export default Store.withStore(RecentScans)
