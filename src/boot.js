import React from 'react'
import Store from './store'
import { AppLoading } from 'expo'
import { CheckServer, CheckUser } from './api'

class Boot extends React.Component {
  constructor (props) {
    super(props)
    this.checkAuth = this.checkAuth.bind(this)
    this.checkAuth()
  }

  async checkAuth () {
    let { navigation, store } = this.props
    let prefServer = store.get('prefServer')
    let token = store.get('token')
    let servers = store.get('servers')

    if (!servers) {
      let Servers = require('./configs.json').servers
      store.set('servers')(Servers)
    } else store.set('servers')(JSON.parse(servers))

    if (!prefServer || !token) return navigation.navigate('login')
    store.set('prefServer')(prefServer)

    let server = await CheckServer(prefServer)
    if (server && server.status === 'online') {
      let user = await CheckUser(token)
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
