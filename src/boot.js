import React from 'react'
import Store from './store'
import { AsyncStorage } from 'react-native'
import Login from './screens/Login'

class Boot extends React.Component {
  async componentDidMount () {
    let prefServer = await AsyncStorage.getItem('prefServer')
    this.props.store.set('prefServer')(prefServer)
  }

  render () {
    const { store } = this.props

    if (!store.get('user')) return (<Login />)
  }
}

export default Store.withStore(Boot)
