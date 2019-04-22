import React from 'react'
import Store from './store'
import { AppLoading } from 'expo'
import { AsyncStorage } from 'react-native'
import { CheckServer, GetUser } from './api'

class Boot extends React.Component {
  constructor (props) {
    super(props)
    this.checkAuth()
  }

  async checkAuth () {
    await AsyncStorage.clear()

    let { navigation, store } = this.props
    let prefServer = await AsyncStorage.getItem('prefServer')
    let token = await AsyncStorage.getItem('token')

    if (!prefServer || !token) return navigation.navigate('login')

    let server = await CheckServer(prefServer)
    console.log('server', server)
    if (server && server.status === 'online') {
      let user = await GetUser()
      console.log('user', user)
      if (user && user.token) {
        store.set('token')(user.token)
        store.set('user')(user.user)
        // return navigate('mainApp')
      } else return navigation.navigate('login', { message: user.message })
    } else return navigation.navigate('login', { message: 'Server is offline.' })
  }

  render () {
    return (<AppLoading autoHideSplash={false} />)
  }
}

export default Store.withStore(Boot)
