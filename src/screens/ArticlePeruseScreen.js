import React from 'react'
import { SwipeListView } from 'react-native-swipe-list-view';
import { View, Image, Text, ScrollView, SafeAreaView, Modal, ActivityIndicator, RefreshControl, Alert, TouchableOpacity } from 'react-native'

import API from '../api'
import Styles from './styles'
import { Images } from '../theme/Assests';
import { FontSizes } from '../theme/Dimens';

export default class ArticlePeruseScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      date: '',
      topNews: {
        date: '',
        images: [{},{},{},{},{},{}]
      },
      commonNews: [],
      refreshing: false,
      waitingVisible: true,
      waitingMessage: 'ローディング。。。',
    };
  }
  // when mount screen, load data
  componentWillMount() {
    this.loadData();
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
    API.POST('getArticleList', { param: '' })
    .then(res => {
      if (res.data.success) {
        this.setState({
          topNews: res.data.result.topnews[0],
          commonNews: res.data.result.commonnews,
        })
      } 
      this.setState({ waitingVisible: false, refreshing: false })
    })
    .catch(err => {
      setTimeout(() => {
        this.setState({ waitingVisible: false, refreshing: false})
        Alert.alert('Fail to get data', `${err}`)
      }, 200)
    })
  }
  // go to ArticleWebviewScreen
  gotoArticleWebview(date, path) {
    this.props.navigation.navigate('Webview', { date: date, path: path })
  }
  // render list item function
  renderItem = ({item, index}) => (
    <TouchableOpacity onPress={()=>this.gotoArticleWebview(item.date, item.link)} style={{width:'100%'}}>
      <View style={Styles.articlePeruse_list_item_view}>        
          <Text style={Styles.articlePersue_list_item_txt_date}>{item.date}</Text>
          <Text style={Styles.articlePersue_list_item_txt_title} numberOfLines={2}>{item.title}</Text>
      </View>
      <View style={Styles.articlePersue_list_item_divider}/>
    </TouchableOpacity>
  );

  render() {
    return(
      <SafeAreaView style={Styles.articlePersue_container}>
        <View style={Styles.articlePeruse_logo_view}>
          <Image
            style={Styles.articlePeruse_logo_image}
            source={Images.logo}
            resizeMode='contain'/>
          <View style={Styles.articlePersue_date_view}>
            <Text style={Styles.articlePersue_date_txt}>
              {this.state.date} 
            </Text>
          </View>
        </View>
        <ScrollView style={Styles.articlePersue_scrollview} 
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}/>
          }>
          <View style={Styles.articlePeruse_images}>
            <View style={Styles.articlePeruse_image_itemview}>
              <Image
                style={Styles.articlePeruse_image_itemimage}
                source={{ uri: this.state.topNews.images[0].image }}
                resizeMode='cover'/>
              <Image
                style={Styles.articlePeruse_image_itemimage}
                source={{ uri: this.state.topNews.images[1].image }}
                resizeMode='cover'/>
              <Image
                style={Styles.articlePeruse_image_itemimage}
                source={{ uri: this.state.topNews.images[2].image }}
                resizeMode='cover'/>
            </View>
            <View style={Styles.articlePeruse_image_itemview}>
              <Image
                style={Styles.articlePeruse_image_itemimage}
                source={{ uri: this.state.topNews.images[3].image }}
                resizeMode='cover'/>
              <Image
                style={Styles.articlePeruse_image_itemimage}
                source={{ uri: this.state.topNews.images[4].image }}
                resizeMode='cover'/>
              <Image
                style={Styles.articlePeruse_image_itemimage}
                source={{ uri: this.state.topNews.images[5].image }}
                resizeMode='cover'/>
            </View>
            <View style={Styles.articlePersue_images_overview}>
              <View style={Styles.articlePeruseImageItemOverview}>
                <Text style={Styles.articlePersue_image_overview_category_title}>政治・経済</Text>
                <Text style={Styles.articlePersue_image_overview_category_explain} numberOfLines={2}></Text>
                <Text style={Styles.articlePersue_image_overview_category_date}>{this.state.topNews.date}</Text>
              </View>
              <View style={Styles.articlePeruseImageItemOverview}>
                <Text style={Styles.articlePersue_image_overview_category_title}>社会</Text>
                <Text style={Styles.articlePersue_image_overview_category_explain} numberOfLines={2}></Text>
                <Text style={Styles.articlePersue_image_overview_category_date}>{this.state.topNews.date}</Text>
              </View>
            </View>
          </View>
          <View style={Styles.articlePersue_images_overview_touchable}>
            <View style={Styles.articlePeruse_image_itemview}>
              <TouchableOpacity onPress={()=>this.gotoArticleWebview(this.state.topNews.images[0].date, this.state.topNews.images[0].link)} style={Styles.articlePeruse_image_itemimage}/>
              <TouchableOpacity onPress={()=>this.gotoArticleWebview(this.state.topNews.images[1].date, this.state.topNews.images[1].link)} style={Styles.articlePeruse_image_itemimage}/>
              <TouchableOpacity onPress={()=>this.gotoArticleWebview(this.state.topNews.images[2].date, this.state.topNews.images[2].link)} style={Styles.articlePeruse_image_itemimage}/>
            </View>
            <View style={Styles.articlePeruse_image_itemview}>
              <TouchableOpacity onPress={()=>this.gotoArticleWebview(this.state.topNews.images[3].date, this.state.topNews.images[3].link)} style={Styles.articlePeruse_image_itemimage}/>
              <TouchableOpacity onPress={()=>this.gotoArticleWebview(this.state.topNews.images[4].date, this.state.topNews.images[4].link)} style={Styles.articlePeruse_image_itemimage}/>
              <TouchableOpacity onPress={()=>this.gotoArticleWebview(this.state.topNews.images[5].date, this.state.topNews.images[5].link)} style={Styles.articlePeruse_image_itemimage}/>
            </View>
          </View>
          <View style={Styles.articlePeruse_list}>
            <SwipeListView
              useFlatList
              data={this.state.commonNews}
              renderItem={this.renderItem}/>
          </View>
        </ScrollView>
        {this.renderLoading()}
      </SafeAreaView>
    )
  }  
}

