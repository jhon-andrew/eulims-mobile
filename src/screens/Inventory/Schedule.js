import React from 'react'
import Store from '../../store'
import { Container, Header, Left, Button, Icon, Body, Title, Subtitle, Right, Content, H3, Form, Item, Picker, Label, DatePicker, Text, Toast } from 'native-base'
import { StyleSheet } from 'react-native'
import API from '../../api'

const styles = StyleSheet.create({
  label: {
    width: 124
  },
  form: {
    marginVertical: 10
  }
})

class Schedule extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startdate: undefined,
      enddate: undefined,
      servicetype_id: undefined
    }
  }

  async setSchedule () {
    const { store, navigation } = this.props
    const api = new API(store)
    const result = await api.saveSchedule(this.state)

    if (result.error) return Toast.show({
      text: result.message
    })

    Toast.show({
      text: 'Schedule has been created.'
    })
    navigation.pop()
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
            <Title>{ params.product_code }</Title>
            <Subtitle numberOfLines={1} ellipsizeMode="tail">{ params.product_name }</Subtitle>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <H3>Set a new schedule</H3>
          <Form style={styles.form}>
            <Item picker>
              <Label style={styles.label}>Service Type</Label>
              <Picker
                mode="dropdown"
                selectedValue={this.state.servicetype_id}
                onValueChange={servicetype_id => this.setState({ servicetype_id })}
              >
                <Picker.Item label="Calibration" value="1" />
                <Picker.Item label="Maintenance" value="2" />
                <Picker.Item label="Usuage" value="3" />
              </Picker>
            </Item>
            <Item picker>
              <Label style={styles.label}>Start Date</Label>
              <DatePicker
                style={{ alignSelf: 'stretch' }}
                placeHolderText="Select Date"
                minimumDate={new Date()}
                onDateChange={startdate => this.setState({ startdate })}
              />
            </Item>
            <Item picker>
              <Label style={styles.label}>End Date</Label>
              <DatePicker
                placeHolderText="Select Date"
                minimumDate={this.state.startdate}
                onDateChange={enddate => this.setState({ enddate })}
              />
            </Item>
          </Form>
          <Button block onPress={this.setSchedule.bind(this)}>
            <Text>Save</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

export default Store.withStore(Schedule)
