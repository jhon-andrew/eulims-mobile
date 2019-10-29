import React from 'react'
import Store from '../../store'
import { Container, Header, Left, Button, Icon, Body, Title, Right, Content, List, ListItem, Text, View, Toast } from 'native-base'
import { StyleSheet, Alert } from 'react-native'
import API from '../../api'

const styles = StyleSheet.create({
  listRight: {
    alignSelf: 'stretch',
    justifyContent: 'flex-start'
  },
  deleteButton: {
    marginBottom: 10
  }
})

class Cart extends React.Component {
  removeEntry (index, supplier) {
    const { store } = this.props
    Alert.alert(
      supplier,
      'Are you sure you want to remove this entry from your cart?',
      [
        { text: 'Remove', onPress: () => {
          let entries = store.get('cart')
          entries.splice(index, 1)
          store.set('cart')(entries)
        }, style: 'destructive' },
        { text: 'Cancel', style: 'cancel'}
      ]
    )
  }

  clearEntries () {
    const { store } = this.props
    Alert.alert(
      'Warning',
      'You are about to clear your cart.',
      [
        { text: 'Proceed', onPress: () => {
          store.set('cart')([])
        }, style: 'destructive'},
        { text: 'Cancel', style: 'cancel'}
      ]
    )
  }

  withdraw () {
    const { store, navigation } = this.props
    const entries = store.get('cart')
    let totalAmount = 0

    entries.forEach(entry => (totalAmount += (entry.amount * entry.quantity)))

    Alert.alert(
      'Please confirm',
      `You are about to withdraw ${entries.length} item${entries.length > 1 ? 's' : ''} with a total amount of ${this.formatAmount(totalAmount)}.`,
      [
        { text: 'Proceed', onPress: async () => {
          const api = new API(store)
          let result = await api.withdraw(entries)

          if (result.error) return Toast.show({
            text: result.message
          })

          Toast.show({ text: 'Done.' })
          store.set('cart')([])
          navigation.pop()
        } },
        { text: 'Cancel', style: 'cancel' }
      ]
    )
  }

  formatAmount (amount) {
    return parseFloat(Math.round((amount) * 100) / 100).toFixed(2)
  }

  render () {
    const { navigation, store } = this.props
    const entries = store.get('cart')

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent icon onPress={() => navigation.pop()}>
              <Icon type="MaterialCommunityIcons" name="arrow-left" />
            </Button>
          </Left>
          <Body>
            <Title>Cart</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.clearEntries.bind(this)}>
              <Text>Clear</Text>
            </Button>
          </Right>
        </Header>
        <Content padder>
          <List>
            { entries.length === 0 ? (
              <ListItem>
                <Body>
                  <Text note style={{ textAlign: 'center' }}>Your cart is empty.</Text>
                </Body>
              </ListItem>
            ) : null }
            {/* Entries List */}
            { entries.map((entry, index) => (
              <ListItem key={index}>
                <Body>
                  <Text note>Expiration Date</Text>
                  <Text>{ entry.expiration_date }</Text>

                  {/* <Text note>{"\n"}Supplier</Text>
                  <Text>{ entry.supplier }</Text> */}

                  <Text note>{"\n"}Content</Text>
                  <Text>{ entry.content }</Text>

                  <Text note>{"\n"}Price</Text>
                  <Text>{ entry.amount }</Text>
                </Body>
                <Right style={styles.listRight}>
                  <Button small danger icon style={styles.deleteButton} onPress={this.removeEntry.bind(this, index, entry.supplier)}>
                    <Icon type="MaterialCommunityIcons" name="delete" />
                  </Button>

                  <Text note>Quantity</Text>
                  <Text>{ entry.quantity }</Text>

                  <Text note>{"\n"}Total Price</Text>
                  <Text>{ this.formatAmount(parseInt(entry.amount) * entry.quantity) }</Text>
                </Right>
              </ListItem>
            )) }
          </List>

          { entries.length > 0 ? (
            <Button block onPress={this.withdraw.bind(this)}>
              <Text>Withdraw</Text>
            </Button>
          ): null }
        </Content>
      </Container>
    )
  }
}

export default Store.withStore(Cart)
