import React from 'react'
import { Text, WebView, SafeAreaView, TouchableOpacity } from 'react-native'

import Styles from './styles'
import {Colors} from '../theme/Colors';
import {Strings} from '../theme/Strings';
import {FontSizes} from '../theme/Dimens';

export default class ArticleWebviewScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      date:'',
      path: '',
    }
    this.fromTab = false
  }
  // when mount screen, set data, path
  componentWillMount() {
    const { navigation } = this.props;
    this.setState({
      date: navigation.state.params.date,
      path: navigation.state.params.path
    })
  }

  // topbar option(visible)
  static navigationOptions = ({ navigation }) => ({
    header: navigation.state.params ? navigation.state.params.header : undefined,
    title: navigation.state.params.date,
    headerStyle: { backgroundColor: Colors.headerColor },
    headerTintColor: Colors.whiteColor,
    headerLayoutPreset: 'center',
    headerTitleStyle: { fontSize: FontSizes.fontSize20, textAlign: 'center', flex: 1, alignSelf: 'center' },
    headerLeft: (
      <TouchableOpacity containerStyle={{width: 50}} 
        onPress={() => navigation.navigate('Peruse')}>
        <Text style={{color:'white', fontSize: FontSizes.fontSize20, marginLeft: 20}}>{Strings.text_back}</Text>
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity containerStyle={{width: 50}}/>
    ),
  });
 
  render() {
    return(
      <SafeAreaView style={Styles.background}>
        <WebView 
          source={{uri: this.state.path}}
        />
      </SafeAreaView>
    )
  }  
}