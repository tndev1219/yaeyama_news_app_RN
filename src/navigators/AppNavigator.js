
import React from 'react';
import { Text } from 'react-native'
import { createSwitchNavigator, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Colors } from '../theme/Colors';
import { Strings } from '../theme/Strings';
import { FontSizes } from '../theme/Dimens';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import PDFViewScreen from '../screens/PDFViewScreen';
import NewsListScreen from '../screens/NewsListScreen';
import ArticlePeruseScreen from '../screens/ArticlePeruseScreen';
import ArticleWebviewScreen from '../screens/ArticleWebviewScreen';

const TopbarOption = {
  header: null, 
}

const PeruseStack = createStackNavigator({
  Peruse: ArticlePeruseScreen,
  Webview: ArticleWebviewScreen,
},{
  defaultNavigationOptions: TopbarOption,  
});

const MainStack = createStackNavigator({
  Login: LoginScreen,
  NewsList: NewsListScreen,
  PDFView: PDFViewScreen,
},{
  defaultNavigationOptions: TopbarOption,  
});

const HomeSwitch = createSwitchNavigator({
  Home: MainStack,
},{
  defaultNavigationOptions: TopbarOption,  
});

const TabStack = createBottomTabNavigator({
  ArticlePeruseTab: PeruseStack,
  MainTab: HomeSwitch,
},
{
  defaultNavigationOptions: ({navigation}) => ({
    tabBarIcon: ({focused, horizontal, tintColor}) => {
      const { routeName } = navigation.state;
      if (routeName === 'ArticlePeruseTab') {
        return <Text style={{color: tintColor, fontSize: FontSizes.tabTextSize}}>{ Strings.text_tab1 }</Text>
      } else {
        return <Text style={{color: tintColor, fontSize: FontSizes.tabTextSize}}>{ Strings.text_tab2 }</Text>
      }
    },
  }),
  initialRouteName: 'ArticlePeruseTab',
  tabBarOptions: {
    showLabel: false,
    activeTintColor: Colors.blueTextColor,
    inactiveTintColor: Colors.greyTextColor,
    style:{
      height: 50
    }
  }
});

export default createSwitchNavigator({
  Splash: SplashScreen,
  BottomTab: TabStack, 
},
{
  initialRouteName: 'Splash', 
});