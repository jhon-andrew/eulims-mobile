import React from 'React'
import Store from '../../store'
import { Container, Grid, Row, Text, Button, Col, Spinner } from 'native-base'
import { Permissions, BarCodeScanner } from 'expo'
import { StyleSheet, Dimensions, Vibration } from 'react-native'
import theme from '../../../native-base-theme/variables/eulims'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000'
  },
  captions: {
    color: '#ffffff',
    alignSelf: 'center'
  },
  scanner: {
    width: '100%',
    height: '100%'
  }
})

class CodeScanner extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      cameraAccess: undefined
    }
  }

  async componentDidMount () {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ cameraAccess: status })
  }

  onScan ({ type, data }) {
    const { navigation } = this.props
    Vibration.vibrate()
    this.setState({ cameraAccess: 'checking' })
    setTimeout(() => {
      navigation.goBack()
    }, 3000)
  }

  render () {
    const { cameraAccess } = this.state
    let content = undefined
    if (!cameraAccess) {
      content = (<Col><Spinner color={theme.brandPrimary} /></Col>)
    } else if (cameraAccess === 'denied') {
      content = (<Col><Text style={styles.captions}>App has been denied access to the camera.</Text></Col>)
    } else if (cameraAccess === 'granted') {
      content = (
        <BarCodeScanner
          onBarCodeScanned={this.onScan.bind(this)}
          style={StyleSheet.absoluteFill}
        />
      )
    } else {
      content = (
        <Col>
          <Spinner color={theme.brandPrimary} />
          <Text style={styles.captions}>Checking analysis...</Text>
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
