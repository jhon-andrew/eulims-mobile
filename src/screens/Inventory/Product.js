import React from 'react'
import Store from '../../store'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Text, H3, Card, CardItem, Toast, ActionSheet } from 'native-base'
import { Image } from 'react-native'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import API from '../../api'

class Product extends React.Component {
  constructor (props) {
    super(props)
    const { store } = props
    this.state = {
      thumbnail: `${store.get('prefProtocol')}://${store.get('prefServer')}/${props.navigation.state.params.Image1}?${Math.random()}`,
      uploadCompleted: undefined
    }
  }

  async changeThumbnail (product) {
    const { status: photosAccess } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    const { status: cameraAccess } = await Permissions.askAsync(Permissions.CAMERA)

    if (photosAccess !== "granted" || cameraAccess !== "granted") return Toast.show({
      text: 'Cannot access photos or camera.'
    })
    
    ActionSheet.show({
      title: 'Change Thumbnail',
      options: ['Take a picture', 'Select from Photos', 'Cancel'],
      cancelButtonIndex: 2
    }, async (tappedOption) => {
      let defaultOptions = { mediaTypes: 'Images', allowsEditing: true, aspect: [1,1] }
      let image = { cancelled: true }

      if (tappedOption === 0) {
        image = await ImagePicker.launchCameraAsync(defaultOptions)
      } else if (tappedOption === 1) {
        image = await ImagePicker.launchImageLibraryAsync(defaultOptions)
      }

      if (!image.cancelled) {
        this.setState({ thumbnail: image.uri })
        const api = new API(this.props.store)
        try {
          this.setState({ uploadCompleted: 0 })
          const { data: resp } = await api.uploadProductImage(product, image, progress => {
            this.setState({ uploadCompleted: Math.round((progress.loaded * 100) / progress.total) })
          })
          this.setState({ uploadCompleted: undefined })
          Toast.show({ text: resp.message, buttonText: 'Okay', duration: 3000 })
        } catch (err) {
          console.log('\nUPLOAD ERROR:')
          Object.keys(err).forEach(key => {
            console.log('\n--------------------\n')
            console.log(key, err[key])
          })
        }
      }
    })
  }

  render () {
    const { navigation } = this.props
    const { params } = navigation.state
    const { thumbnail, uploadCompleted } = this.state

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent icon onPress={() => navigation.pop()}>
              <Icon type="MaterialCommunityIcons" name="arrow-left" />
            </Button>
          </Left>
          <Body>
            <Title>Details</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <H3>{params.product_code}</H3>
                <Text>{params.product_name}</Text>
              </Body>
            </CardItem>
            <CardItem cardBody>
              <Image source={ params.Image1 ? { uri: thumbnail, cache: 'reload' } : require('../../../assets/no-image.png')} style={{ width: '100%', height: undefined, aspectRatio: 1 }} resizeMode="contain" />
            </CardItem>
            <CardItem>
              <Button small onPress={this.changeThumbnail.bind(this, params)}>
                <Text>Change Thumbnail</Text>
              </Button>
              { uploadCompleted >= 0 ? (
                <Text style={{ marginLeft: 8 }}>Uploading: {uploadCompleted}%</Text>
              ) : null }
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

export default Store.withStore(Product)
