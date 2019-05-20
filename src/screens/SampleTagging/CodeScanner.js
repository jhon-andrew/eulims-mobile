import React from 'React'
import Store from '../../store'
import { Container, Grid, Row, Text, Button, Col, Spinner } from 'native-base'
import { Permissions, Camera } from 'expo'
import { StyleSheet, Dimensions, Vibration, Platform } from 'react-native'
import theme from '../../../native-base-theme/variables/eulims'
import API from '../../api'
import { NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000'
  },
  captions: {
    color: '#ffffff',
    alignSelf: 'center'
  },
  scanner: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    marginBottom: 8
  }
})

class CodeScanner extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      cameraAccess: undefined,
      ratio: undefined,
      scannedData: undefined
    }
  }

  async componentDidMount () {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ cameraAccess: status })
    this.cameraComponent = this.props.navigation.addListener('willBlur', payload => {
      this.setState({ cameraAccess: undefined })
    })
  }

  componentWillUnmount () {
    this.cameraComponent.remove()
  }

  async onScan ({ type, data }) {
    const { navigation, store } = this.props
    Vibration.vibrate()
    this.setState({
      cameraAccess: 'checking',
      scannedData: data
    })

    let api = new API(store)
    let analysis = await api.getAnalysis(data)

    navigation.navigate('sampleTagging', {}, NavigationActions.navigate({
      routeName: 'Analysis',
      params: analysis,
      action: NavigationActions.navigate({
        routeName: 'Analysis',
        params: analysis
      })
    }))
  }

  render () {
    const { cameraAccess, scannedData } = this.state
    let content = undefined
    if (!cameraAccess) {
      content = (<Col><Spinner color={theme.brandPrimary} /></Col>)
    } else if (cameraAccess === 'denied') {
      content = (<Col><Text style={styles.captions}>App has been denied access to the camera.</Text></Col>)
    } else if (cameraAccess === 'granted') {
      content = (
        <Col>
          <Camera
            ref={camera => (this.camera = camera)}
            ratio="1:1"
            onBarCodeScanned={this.onScan.bind(this)}
            style={styles.scanner}
          />
          <Text style={styles.captions}>Please hold the tag near and steady...</Text>
        </Col>
      )
    } else {
      content = (
        <Col>
          <Spinner color={theme.brandPrimary} />
          <Text style={styles.captions}>Checking analysis...</Text>
          <Text style={styles.captions} note>{scannedData}</Text>
        </Col>
      )
    }

    return (
      <Container style={styles.container}>
        <Grid>
          <Row style={{alignItems: 'center'}}>
            { content }
          </Row>
        </Grid>
      </Container>
    )
  }
}

export default Store.withStore(CodeScanner)
