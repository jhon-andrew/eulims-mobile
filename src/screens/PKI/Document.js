import React from 'react'
import Store from '../../store'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Subtitle, Content, Text, Card, CardItem, Grid, Row, Col } from 'native-base'
import { Image } from 'react-native'

class Document extends React.Component {
  render () {
    const { navigation } = this.props
    let document = navigation.getParam('document')

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent icon onPress={() => navigation.pop()}>
              <Icon type="MaterialCommunityIcons" name="arrow-left" />
            </Button>
          </Left>
          <Body>
            <Title>{document.filename}</Title>
            <Subtitle>Deadline: {document.deadline}</Subtitle>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Text note>For Signatory</Text>
          <Card>
            <CardItem>
              <Body>
                <Row>
                  <Col size={1}>
                    <Text note>From:</Text>
                  </Col>
                  <Col size={2}>
                    <Text>{document.from}</Text>
                  </Col>
                </Row>
                <Row>
                  <Col size={1}>
                    <Text note>Subject:</Text>
                  </Col>
                  <Col size={2}>
                    <Text>{document.subject}</Text>
                  </Col>
                </Row>
                <Row>
                  <Col size={1}>
                    <Text note>Document Code:</Text>
                  </Col>
                  <Col size={2}>
                    <Text>{document.code}</Text>
                  </Col>
                </Row>
              </Body>
            </CardItem>
          </Card>

          <Text note style={{ marginTop: 8 }}>Attachment</Text>
          <Card>
            <CardItem>
              <Body>
                <Row>
                  <Col size={1}>
                    <Text note>Filename:</Text>
                  </Col>
                  <Col size={2}>
                    <Text>{document.filename}</Text>
                  </Col>
                </Row>
                <Row>
                  <Col size={1}>
                    <Text note>Preview:</Text>
                  </Col>
                  <Col size={2}>
                    {/* <Text>{document.filename}</Text> */}
                  </Col>
                </Row>
                <Image source={require('../../../assets/no-image.png')} style={{ width: '100%' }} />
              </Body>
            </CardItem>
          </Card>

          <Button block rounded style={{ marginTop: 24 }}>
            <Text>Sign Document</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

export default Store.withStore(Document)
