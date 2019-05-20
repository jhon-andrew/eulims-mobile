import React from 'react'
import Store from './store'
import { AppLoading } from 'expo'
import API from './api'
import { AsyncStorage } from 'react-native'

class Boot extends React.Component {
  constructor (props) {
    super(props)
    this.checkAuth()
  }

  async checkAuth () {
    let { navigation, store } = this.props
    let cached = {}

    let keys = await AsyncStorage.getAllKeys()
    let storage = await AsyncStorage.multiGet(keys)
    storage.forEach(pair => {
      cached[pair[0]] = JSON.parse(pair[1])
    })

    if (!cached.servers) {
      let Servers = require('./configs.json').servers
      store.set('servers')(Servers)
    } else store.set('servers')(cached.servers)

    if (!cached.prefServer || !cached.token) return navigation.navigate('login')
    store.set('prefServer')(cached.prefServer)

    let api = new API(store)

    api.server = cached.prefServer
    api.token = cached.token

    let server = await api.checkServer(cached.prefServer)
    if (server && server.status === 'online') {
      let user = await api.checkUser(cached.token)
      if (user && user.token) {
        store.set('token')(user.token)
        store.set('user')(user.user)
        return navigation.navigate('sampleTagging')
      } else return navigation.navigate('login', { message: user.message })
    } else return navigation.navigate('login', { message: 'Server is offline.' })
  }

  render () {
    return (<AppLoading autoHideSplash={false} />)
  }
}

export default Store.withStore(Boot)
