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

    if (!cached.prefServer || !cached.token || !cached.role) return navigation.navigate('login')
    store.set('prefServer')(cached.prefServer)
    store.set('role')(cached.role)

    let api = new API(store)

    api.server = cached.prefServer
    api.token = cached.token
    api.role = cached.role

    let server = await api.checkServer(cached.prefServer)
    if (server && server.status === 'online') {
      let user = await api.checkUser(cached.token)

      // Emulate top-management login
      // user.user.type = 'top-management'

      if (user && user.token) {
        store.set('token')(user.token)
        store.set('user')(user.user)

        let proceedTo = null
        switch (user.user.type) {
          case 'customer':
            proceedTo = 'customer'
            break
          case 'top-management':
            proceedTo = 'topManagement'
            break
          default:
            proceedTo = 'app'
            break
        }

        return navigation.navigate(proceedTo)
      } else return navigation.navigate('login', { message: 'Session has expired.' })
    } else return navigation.navigate('login', { message: 'Server is offline.' })
  }

  render () {
    return (<AppLoading autoHideSplash={false} />)
  }
}

export default Store.withStore(Boot)
