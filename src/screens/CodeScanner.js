import React from 'react'
import Store from '../store'
import { Permissions, Camera } from 'expo'
import { Dimensions, StyleSheet, Platform, Vibration } from 'react-native'
import { Container, Header, Left, Button, Icon, Body, Title, Subtitle, Grid, Row, Col, Right, Spinner, Text } from 'native-base'
import API from '../api';

const frameOffset = 80
const styles = StyleSheet.create({
  translucentBg: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  horizontalSpacer: {
    width: frameOffset / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.9)'
  },
  frameHeight: {
    height: Dimensions.get('window').width - frameOffset
  },
  frameWidth: {
    width: Dimensions.get('window').width - frameOffset,
    justifyContent: 'center'
  }
})

class CodeScanner extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      cameraRatio: '16:9',
      gettingAnalysis: false,
      scannedData: undefined 
    }
  }

  async componentDidMount () {
    await Permissions.askAsync(Permissions.CAMERA)

    if (Platform.OS === 'android' && this.camera) {
      const ratios = await this.camera.getSupportedRatiosAsync()
      this.setState({ cameraRatio: ratios[ratios.length - 1] })
    }
  }

  async onScan ({ type, data }) {
    if (this.state.scannedData === data) return false

    Vibration.vibrate()
    this.setState({
      gettingAnalysis: true,
      scannedData: data
    })

    const { navigation, store } = this.props
    const api = new API(store)

    switch (navigation.getParam('tagType')) {
      case 'Sample Tag':
        const analysis = await api.getAnalysis(data)
        navigation.navigate('analysis', analysis)
        break
      case 'Product Code':
        const product = await api.getProduct(data)
        navigation.navigate(product.producttype_id === 1 ? 'entries' : 'schedule', product)
        break
      default:
        alert('Unknown `tagType`.')
        break
    }
  }

  render () {
    const { navigation } = this.props
    const { gettingAnalysis, scannedData } = this.state

    return (
      <Camera
        style={{ flex: 1 }}
        ref={camera => (this.camera = camera)}
        ratio={this.state.cameraRatio}
        onBarCodeScanned={this.onScan.bind(this)}
      >
        <Container style={{ backgroundColor: gettingAnalysis ? 'rgba(255, 255, 255, 0.95)' : 'transparent' }}>
          <Header>
            <Left>
              <Button icon transparent onPress={() => navigation.pop()}>
                <Icon type="MaterialCommunityIcons" name="arrow-left" />
              </Button>
            </Left>
            <Body>
              <Title>{ navigation.getParam('tagType', 'Bar/QR Code') }</Title>
              <Subtitle>Scanner</Subtitle>
            </Body>
            <Right />
          </Header>
          <Grid>
            <Row style={styles.translucentBg}>
              <Text>Please hold the camera near and steady.</Text>
            </Row>
            <Row style={styles.frameHeight}>
              <Col style={styles.horizontalSpacer}></Col>
              <Col style={styles.frameWidth}>
                { gettingAnalysis ? (<Spinner color="#0eb7f1" size={100} />) : null }
              </Col>
              <Col style={styles.horizontalSpacer}></Col>
            </Row>
            <Row style={styles.translucentBg}>
              <Text>{ gettingAnalysis ? scannedData : 'Detecting...' }</Text>
            </Row>
          </Grid>
        </Container>
      </Camera>
    )
  }
}

export default Store.withStore(CodeScanner)
