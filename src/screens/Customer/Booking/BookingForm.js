import React from 'react'
import { Container, Header, Content, Form, Item, Input, Picker, DatePicker, Icon, Text, Left, Right, Button, View, Label, Body, Title, Row} from 'native-base'
import API from '../../../api'
import Store from '../../../store'

class Bookingform extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chosenDate: new Date(),
      selected2: "",
      rstls: [],
      qty: 1,
      desc: "",
      issending: false
    }
  }

  async componentDidMount () {
    const { store, navigation } = this.props
    const api = new API(store)

    try {
      rstls = await api.getRstl()
      this.setState({ rstls })
    } catch (err) {
      console.log(err)
    }
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate })
  }

  onValueChange2(value) {
    this.setState({
      selected2: value
    })
  }

  onChangeQty(value){
    this.setState({ qty: value })
  }

  onChangeDesc(value){
    this.setState({ desc: value })
  }

  validate(lab, qty) {
    // true means invalid, so our conditions got reversed
    return {
      lab: lab.length === 0,
      // date: date.length === 0,
      qty: qty.length === 0,
      issending: this.state.issending
    }
  }

  isdanger(){
    return {
      lab: this.state.selected2.length === 0,
      qty: this.state.qty.length === 0
    }
  }

  canBeSubmitted() {
    // const errors = this.validate(this.state.selected2, this.state.chosenDate, this.state.qty)
    // console.log(this.state.qty)
    const errors = this.validate(this.state.selected2,this.state.qty)
    const isDisabled = Object.keys(errors).some(x => errors[x])
    return isDisabled
  }

  islock(){
    this.setState({ issending: !(this.state.issending) })
  }

  emptyform(){
    this.setState({ selected2: "" })
    this.setState({ qty: 1 })
  }


  async displayvalues(){
    this.islock()
    const { store, navigation } = this.props
    const api = new API(store)
    //build an object to store all of the fields and values
    const mlab = this.state.selected2
    const mdate = this.state.chosenDate
    const mqty = this.state.qty
    const mdesc = this.state.desc
    let xdate = mdate.getFullYear() + "-" + (mdate.getMonth() + 1) + "-" + mdate.getDate()
    // alert(xdate)
    const bookling = {
      lab: mlab,
      date: xdate,
      qty: mqty,
      desc: mdesc,
      userid: 1 //supply userid here
    }

    //send using post method
    result = await api.setBooking(bookling)
  
    if(result.success){
      this.emptyform()
      this.islock()
      navigation.pop()
    }else{
      alert('booking failed') //replace this with your own Modal
      this.islock()
    }
  }

  render() {
    const { navigation } = this.props
    const { rstls, issending } = this.state
    const isdisable = this.canBeSubmitted()
    const isdanger = this.isdanger()

    // alert(isdanger.qty)
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.pop()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{textAlign: 'center'}}>Booking Form</Title>
          </Body>
          <Right/>
        </Header>
        <Content>
          <View>
            <Form>
              <Item stackedLabel error={isdanger.lab}>
                <Label>Laboratory: </Label>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: undefined }}
                  placeholder="Laboratory"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.selected2}
                  onValueChange={this.onValueChange2.bind(this)}
                >
                  {
                    rstls.map((record, index) => (
                      <Picker.Item label={record.name} value={record.rstl_id} key={{index}}/>
                    ))
                  }
                </Picker>
              </Item>
              <Item stackedLabel>
                <Label>Booking Date: </Label>
                <DatePicker
                  minimumDate={new Date()}
                  locale={"en"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText="Select date"
                  textStyle={{ color: "green" }}
                  placeHolderTextStyle={{ color: "#d3d3d3" }}
                  onDateChange={this.setDate.bind(this)}
                  disabled={false}
                />
                <Text>
                  {this.state.chosenDate.toString().substr(4, 12)}
                </Text>
              </Item>

              <Item stackedLabel error={isdanger.qty}>
                <Label>Quantity: </Label>
                <Input onChangeText={this.onChangeQty.bind(this)} placeholder="quantity here..." defaultValue="1" keyboardType="numeric"/>
              </Item>
              <Item stackedLabel>
                <Label>Description: </Label>
                <Input onChangeText={this.onChangeDesc.bind(this)} placeholder="description here..." />
              </Item>
            </Form>
            <Button disabled={isdisable} block rounded style={{ marginVertical: 4 }} onPress={this.displayvalues.bind(this)}>
              <Text>{issending?"Sending":"Submit"}</Text>
            </Button>
           </View>
        </Content>
      </Container>
    )
  }
}

export default Store.withStore(Bookingform)
