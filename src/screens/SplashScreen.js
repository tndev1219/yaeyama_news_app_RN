import React from 'react'
import { View, Image, SafeAreaView, StatusBar } from 'react-native'

import Styles from './styles'
import { Images } from '../theme/Assests';

export default class SplashScreen extends React.Component {
  constructor (props) {
    super(props)
    setTimeout(() => {
      this.gotoNextScreen()
    }, 3000)
  }
  gotoNextScreen() {
    this.props.navigation.navigate('BottomTab')
  }
  render() {
    return(
      <SafeAreaView style={Styles.background}>
        <View style={Styles.splash_view}>
          <StatusBar hidden/>
          <Image
            style={Styles.splash_logo}
            source={Images.logo}
            resizeMode='contain'/>
          <Image
            style ={Styles.splash_txt}
            source={Images.splash_txt}
            resizeMode='contain'/>
        </View>
      </SafeAreaView>
    )
  }  
}