import React from 'react'
import { connect } from 'react-redux';
import { View, Image, SafeAreaView, Text, KeyboardAvoidingView, TextInput, Modal, ActivityIndicator, AsyncStorage } from 'react-native'

import Styles, { isiOS } from './styles'
import { Strings } from '../theme/Strings';
import { FontSizes } from '../theme/Dimens';
import { Images, Icons } from '../theme/Assests';
import Button from '../components/buttons';
import SCSwitch from '../components/buttons/SCSwitch'

class LoginScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      remember: 0,
      waitingVisible: true,
      waitingMessage: 'ログイン中。。。',
    }
  }
  // when mount screen,
  componentWillMount() {
    this.retrieveAuthInfo()
  }
  // get auth value from AsyncStorage
  retrieveAuthInfo= async () => {
    try {
      const value = await AsyncStorage.getItem('Auth');
      if (value !== null) {
        var auth = JSON.parse(value)
        this.setState({
          username: auth.username?auth.username:'',
          password: auth.password?auth.password:'',
          remember: auth.remember?auth.remember:0,
        })
      } 
    } catch (error) {
      console.warn(error);
    }
  }
  // waiting dialog
  renderLoading() {
    return (
      <Modal transparent={true} onRequestClose={() => null} visible={this.props.saga.task === 'signin' && this.props.saga.isLoading}>
        <View style={Styles.waitingBackground}>
          <View style={Styles.waitingLayout}>
            <ActivityIndicator size="large" />
            {this.state.waitingMessage !== '' && <Text style={{ fontSize: FontSizes.fontSize18, fontWeight: '200', paddingLeft: 15, textAlignVertical: 'center'}}>{this.state.waitingMessage}</Text>}
          </View>
        </View>
      </Modal>
    );
  }
  // click signin button
  onPressSign() {
    if (!this.state.username.length>0) {
      alert('Please enter a user id')
      return
    }
    if (this.state.password.length < 4) {
      alert('Please enter a valid password.')
      return
    }
    this.props.navigation.dispatch({type: 'REQ_SIGNIN', payload:{username: this.state.username, password: this.state.password, remember: this.state.remember}});
  }
  // remember switch button
  onChangeRemember(value) {
    this.setState({remember: value})
  }

  render() {
    return(
      <SafeAreaView style={Styles.login_container}>
        <View style={Styles.login_logo_view}>
          <Image
            style={Styles.login_logo_image}
            source={Images.logo}
            resizeMode='contain'/>
        </View>
        <View style={Styles.login_image1_view}>
          <Image
            style={Styles.login_image1_image}
            source={Images.login_txt1}
            resizeMode='contain'/>
        </View>
        <View style={Styles.login_body_view}>
          <Text style={Styles.login_body_txt1_view}>{ Strings.login_txt1 }</Text>
          <KeyboardAvoidingView enabled={isiOS} behavior='position' keyboardVerticalOffset={60} style={{width: '100%'}}>
            <TextInput
              style={Styles.login_input}
              placeholder={Strings.text_uid}
              onChangeText={username => this.setState({username})}
              value={this.state.username}/>
            <TextInput
              style={Styles.login_input}
              placeholder={Strings.text_pass}
              secureTextEntry
              onChangeText={password => this.setState({password})}
              value={this.state.password}/>
          </KeyboardAvoidingView>
          <Button
            containerStyle={Styles.login_button_containerview}
            onPress={this.onPressSign.bind(this)}>
            <Image
              style={Styles.login_button_image}
              source={Icons.ic_login}
              resizeMode='contain'/>
            <Text style={Styles.login_button_txt}>{Strings.text_login}</Text>
          </Button>
          <View style={Styles.login_remember_view}>
            <Text style={Styles.login_remember_txt}>{Strings.text_remember}</Text>
            <View style={Styles.login_remember_switch_view}>
              <SCSwitch value={this.state.remember}              
                onToggleState={(value) => this.onChangeRemember(value)}/>
            </View>
          </View>
        </View>
        {this.renderLoading()}
      </SafeAreaView>
    )
  }  
}
function mapStateToProps(state) {
  return {saga: state.saga}
}
export default connect(
  mapStateToProps
)(LoginScreen)