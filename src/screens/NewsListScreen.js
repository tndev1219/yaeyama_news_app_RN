import React from 'react'
import { View, Image, SafeAreaView, Dimensions, Text, ScrollView, AsyncStorage, Modal, ActivityIndicator, RefreshControl } from 'react-native'

import API from '../api'
import Styles from './styles'
import { Images } from '../theme/Assests';
import { FontSizes } from '../theme/Dimens';
import ListItem from '../components/ListItem'
import { Colors } from '../theme/Colors';
import { Strings } from '../theme/Strings';

export const screenWidth = Dimensions.get('window').width;

export default class NewsListScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      date: '',
      data: [],
      refreshing: false,
      waitingVisible: true,
      waitingMessage: 'ローディング。。。',
    }
  }
  // when mount screen, load data
  componentWillMount() {
    this.loadData();
  }
  // reload data function
  _onRefresh = () => {
    this.setState({refreshing: true});
    this.loadData();
  }
  // load data function
  loadData= async () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    this.setState({
      date: '' + month + '/' + date,
    })
    try {
      const value = await AsyncStorage.getItem('Auth');
      if (value !== null) {
        var auth = JSON.parse(value)
        API.POST('getPDFList', {token: auth.token})
        .then(res => {
          if (res.data.success) {
            this.setState({
              data: res.data.result
            })
          } else {
            this.props.navigation.navigate('Login')
          }
          this.setState({ waitingVisible: false, refreshing: false })
        })
        .catch(err => {
          setTimeout(() => {
            this.setState({ waitingVisible: false, refreshing: false })
            Alert.alert('Fail to load data', `${err}`)
          }, 200)
        })
      } else {
        this.setState({ waitingVisible: false, refreshing: false })
        this.props.navigation.navigate('Login')
      }
    } catch (error) {
      this.setState({ waitingVisible: false, refreshing: false })
      console.warn(error);
      this.props.navigation.navigate('Login')
    }
  }
  // waiting dialog
  renderLoading() {
    return (
      <Modal transparent={true} onRequestClose={() => null} visible={this.state.waitingVisible}>
        <View style={Styles.waitingBackground}>
          <View style={Styles.waitingLayout}>
            <ActivityIndicator size="large" />
            {this.state.waitingMessage !== '' && <Text style={{ fontSize: FontSizes.fontSize18, fontWeight: '200', paddingLeft: 15, textAlignVertical: 'center'}}>{this.state.waitingMessage}</Text>}
          </View>
        </View>
      </Modal>
    );
  }
  // open pdf view function
  gotoPDFView(date, path) {
    console.warn(path);
    this.props.navigation.navigate('PDFView', { date: date, path: path })
  }
  
  render() {
    return(
      <SafeAreaView style={Styles.newList_containter}>
        <View style={Styles.newsList_logo_view}>
          <Image
            style={Styles.newList_logo_image}
            source={Images.logo}
            resizeMode='contain'/>
          <View style={Styles.newsList_date_view}>
            <Text style={Styles.newsList_date_txt}>
              {this.state.date}
            </Text>
          </View>
        </View>
        <ScrollView style={Styles.newsList_scrollview} 
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}/>
          }
        >
          {this.state.data.length === 0 && <View style={Styles.newsList_no_data}>
            <Text style={Styles.newsList_no_data_text}>{Strings.no_data}</Text>
          </View>}

          {this.state.data.length >= 1 && <View style={Styles.newsList_horizontalview}>
            <ListItem cWidth={screenWidth} cDate={this.state.data[0].date} cImage={this.state.data[0].thumb} onPress={()=>this.gotoPDFView(this.state.data[0].date, this.state.data[0].url)}/>
            {this.state.data.length >= 2 &&<ListItem cWidth={screenWidth} cDate={this.state.data[1].date} cImage={this.state.data[1].thumb} onPress={()=>this.gotoPDFView(this.state.data[1].date, this.state.data[1].url)}/>}
          </View>}
          {this.state.data.length > 2 && <View style={Styles.newsList_divider}/>}
          {this.state.data.length >= 3 && <View style={Styles.newsList_horizontalview}>
            <ListItem cWidth={screenWidth} cDate={this.state.data[2].date} cImage={this.state.data[2].thumb} onPress={()=>this.gotoPDFView(this.state.data[2].date, this.state.data[2].url)}/>
            {this.state.data.length >= 4 &&<ListItem cWidth={screenWidth} cDate={this.state.data[3].date} cImage={this.state.data[3].thumb} onPress={()=>this.gotoPDFView(this.state.data[3].date, this.state.data[3].url)}/>}
          </View>}
          {this.state.data.length > 4 && <View style={Styles.newsList_divider}/>}
          {this.state.data.length >= 5 && <View style={Styles.newsList_horizontalview}>
            <ListItem cWidth={screenWidth} cDate={this.state.data[4].date} cImage={this.state.data[4].thumb} onPress={()=>this.gotoPDFView(this.state.data[4].date, this.state.data[4].url)}/>
            {this.state.data.length >= 6 &&<ListItem cWidth={screenWidth} cDate={this.state.data[5].date} cImage={this.state.data[5].thumb} onPress={()=>this.gotoPDFView(this.state.data[5].date, this.state.data[5].url)}/>}
          </View>}
          {this.state.data.length > 6 && <View style={Styles.newsList_divider}/>}
          {this.state.data.length >= 7 && <View style={Styles.newsList_horizontalview}>
            <ListItem cWidth={screenWidth} cDate={this.state.data[6].date} cImage={this.state.data[6].thumb} onPress={()=>this.gotoPDFView(this.state.data[6].date, this.state.data[6].url)}/>
          </View>}
          <View style={Styles.newsList_bottom_space}/>
        </ScrollView>
        
      </SafeAreaView>
    )
  }  
}
