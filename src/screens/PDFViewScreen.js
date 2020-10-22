import React from 'react'
import Pdf from 'react-native-pdf';
import { NavigationEvents } from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {View, SafeAreaView, Dimensions, Text, TouchableOpacity} from 'react-native'

import Styles from './styles'
import {Colors} from '../theme/Colors';
import {Strings} from '../theme/Strings';
import {FontSizes} from '../theme/Dimens';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export default class PDFViewScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentpage: 1,
      maxpage: 1,
      scale: 1.0,
      date: '',
      path: {uri:'', cache: true},
    }
    this.fromTab = false
  }
  // when mount screen, set data, path
  componentWillMount() {
    const { navigation } = this.props;
    this.setState({
      date: navigation.state.params.date,
      path1: {uri: navigation.state.params.path, cache: true},
      path: navigation.state.params.paths
    })
    this.PDFView = null
  }

  // topbar option(visible)
  static navigationOptions = ({ navigation }) => ({
    header: navigation.state.params ? navigation.state.params.header : undefined,
    title: navigation.state.params.date,
    headerStyle: { backgroundColor: Colors.headerColor },
    headerTintColor: Colors.whiteColor,
    headerLayoutPreset: 'center',
    headerTitleStyle: { fontSize: FontSizes.fontSize22, textAlign: 'center', flex: 1, alignSelf: 'center' },
    headerLeft: (
      <TouchableOpacity containerStyle={{width: 50}} 
        onPress={() => navigation.navigate('NewsList')}>
        <Text style={{color:'white', fontSize: FontSizes.fontSize20, marginLeft: 20}}>{Strings.text_back}</Text>
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity containerStyle={{width: 50}}/>
    ),
  });
  // multislider scale value changes
  scaleValueChange(values) {
    this.setState({
      scale: values[0]/10
    });
  };
  // next page function
  nextPage() {
    if (this.state.currentpage !== this.state.maxpage) {
      this.setState({
        currentpage: this.state.currentpage + 1
      });
    }
  };
  // previous page function
  previousPage() {
    if (this.state.currentpage !== 1) {
      this.setState({
        currentpage: this.state.currentpage - 1
      });
    }
  };
  //current page function
  currentPage() {
    if (this.fromTab) {
      this.props.navigation.navigate('NewsList')
    } else {
      this.fromTab = true;
    }
  };

  render() {
    return(
      <SafeAreaView style={Styles.pdfview_container}>
        <View style={{flex:1}}>
          <NavigationEvents
            onWillFocus={payload => this.currentPage()}
            // onWillFocus={payload => console.warn(payload)}
            // onWillBlur ={payload => payload.state.routeName = 'NewsList'}
          />
          <Pdf
            ref={(ref) => this.PDFView = ref}
            source={this.state.path1}
            onLoadComplete={(numberOfPages,filePath)=>{
              this.setState({
                maxpage: numberOfPages,
              });
            }}
            // onPageChanged={(page, numberOfPages)=>{
            //   this.setState({
            //     currentpage: page
            //   });
            // }}
            // onScaleChanged={(scale)=>{
            //   var scale = this.state.scale * scale;
            //   this.setState({
            //     scale: parseFloat(scale.toFixed(1)) 
            //   });
            //   console.warn('ddddd', scale.toFixed(1))
            // }}
            // scale={this.state.scale}
            style={{flex:1, width: screenWidth}}
            // page={this.state.currentpage}
            fitWidth={true}
          />
        </View>
        {/* <View style={Styles.pdfview_control_view}>
          <View style={Styles.pdfview_multislider_view}>
            <MultiSlider 
              min={10}
              max={30}
              values = {[this.state.scale*10]}
              onValuesChange={this.scaleValueChange.bind(this)}
              selectedStyle={{backgroundColor: Colors.seekbarColor}}
              unselectedStyle={{backgroundColor: Colors.greyTextColor}}
              containerStyle={{height: '100%'}}
              customMarker={(e)=>{
                return (
                  <View style={Styles.pdfview_multislider_mark} />
                )}
              }
              snapped
              sliderLength={screenWidth * 0.6}
            />
          </View>
          <View style={Styles.pdfview_pagination_button_view}>
            <TouchableOpacity onPress={() => this.previousPage()}>
              <Icon
                name='left'
                size={40}
                color={Colors.greyTextColor}
              />
            </TouchableOpacity>
            <View style={{width:25, alignContent:'center'}}>
              <Text style={{color: Colors.greyTextColor, fontSize: FontSizes.fontSize14}}>{this.state.currentpage}/{this.state.maxpage}</Text>
            </View>
            <TouchableOpacity onPress={() => this.nextPage()}>
              <Icon
                name='right'
                size={40}
                color={Colors.greyTextColor}
              />
            </TouchableOpacity>
          </View>
        </View> */}
      </SafeAreaView>
    )
  }  
}
