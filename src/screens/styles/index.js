import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import { Colors } from '../../theme/Colors';
import { Dimens, FontSizes } from '../../theme/Dimens';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export const isiOS = Platform.OS === 'ios';

export default StyleSheet.create({
  // SplashScreen
  background: {
    flex: 1, 
    backgroundColor: Colors.whiteColor,
  },
  splash_view: {
    alignItems: 'center',
    justifyContent: 'center', 
  },
  splash_logo: {
    height: screenHeight /9.2,
    marginTop: screenHeight /3.5,
  },
  splash_txt: {
    height: screenWidth /11,
    marginTop: screenHeight /35,
  },

  // ArticlePeruseScreen
  articlePersue_container: {
    flex: 1, 
    backgroundColor: Colors.whiteColor
  },
  articlePeruse_logo_view: {
    flexDirection: 'row', 
    alignItems: 'center', 
    height: screenHeight*0.12,
    marginTop: 15, 
    marginBottom: 5,
    paddingHorizontal: 25,
  },
  articlePeruse_logo_image: {
    width: '50%', 
    height: '100%'
  },
  articlePersue_date_view: {
    alignItems: 'flex-end', 
    justifyContent: 'center', 
    paddingRight: 10,
    width: '50%', 
    height:'100%',
  },
  articlePersue_date_txt: {
    fontSize: FontSizes.fontSize23, 
    color: Colors.blackColor,
  },
  articlePeruse_images: {
    alignItems: 'center', 
    backgroundColor: Colors.whiteColor
  },
  articlePersue_scrollview: {
    flex:1, 
  },
  articlePersue_images_overview: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)', 
  },
  articlePersue_images_overview_touchable: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  articlePersue_image_overview_category_title: {
    color: Colors.whiteColor, 
    fontSize: FontSizes.fontSize16, 
    padding: 3, 
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  articlePersue_image_overview_category_explain: {
    color: Colors.whiteColor, 
    fontSize: FontSizes.fontSize24, 
    width: '100%', 
    textAlignVertical: 'center', 
    textAlign: 'center', 
    padding: 5,
  },
  articlePersue_image_overview_category_date: {
    color: Colors.whiteColor, 
    fontSize: FontSizes.fontSize16, 
    padding: 5,
  },
  articlePeruseImageItemOverview: {
    flex: 3,
    height:'50%', 
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  articlePeruse_image_itemview: {
    flexDirection: 'row',
    height:screenWidth *1.3 /3, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginVertical: 1
  },
  articlePeruse_image_itemimage: {
    width: '33.3333%', 
    height: '100%',
    marginHorizontal: 1,
  },
  articlePeruse_list: {
    flex: 1,
    backgroundColor: Colors.greyColor
  },
  articlePeruse_list_item_view: {
    flex:1,
    flexDirection: 'row',
    // height: 60, 
    // paddingTop: 8,
    // paddingBottom: 8,
    paddingHorizontal: 15
  },
  articlePersue_list_item_divider: {
    height: 0.7, 
    marginHorizontal: 10,
    backgroundColor: Colors.greyTextColor,
  },
  articlePersue_list_item_txt_date: {
    fontSize: FontSizes.fontSize16,
    color: Colors.primaryBlackColor, 
    marginTop: 10,
  },
  articlePersue_list_item_txt_title: {
    flex: 1,
    paddingLeft: 15,
    marginVertical: 10,
    fontSize: FontSizes.fontSize16, 
    color: Colors.darkBlueColor,
  },

  // LoginScreen
  login_container: {
    flex: 1, 
    backgroundColor: Colors.whiteColor, 
    alignItems: 'center',
  },
  login_logo_view: {
    alignItems: 'center', 
    height: screenHeight*0.13, 
    marginTop: 10, 
    width: '100%',
  },
  login_logo_image: {
    width: '45%', 
    height: '100%',
  },
  login_image1_view: {
    height: 30, 
    width: '100%', 
    alignItems: 'center', 
    marginTop: 5,
  },
  login_image1_image: {
    width: '18%',
  },
  login_body_view: {
    width: '100%', 
    alignItems: 'center',  
    marginTop: 30, 
    paddingHorizontal: 40,
  },
  login_body_txt1_view: {
    fontSize: FontSizes.fontSize17, 
    color: Colors.primaryBlackColor, 
    marginBottom: 25,
    // fontFamily: 'M PLUS 1p', 
  },
  login_input: {
    borderColor:Colors.inputColor,
    borderWidth: 0.8,
    height: 40,
    width:'100%',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,    
    fontSize: FontSizes.fontSize15
  },
  login_button_containerview: {
    marginTop: 22,
    marginBottom: 18,
    backgroundColor: Colors.buttonColor,
    width: (screenWidth-80)*0.75,
    height: 50, 
    flexDirection: 'row',
    alignItems: 'center',
  },
  login_button_image: {
    height: '65%',
  },
  login_button_txt: {
    color: 'white', 
    fontSize: FontSizes.fontSize18,
  },
  login_remember_view: {
    alignItems: 'center',
    width: '75%', 
    flexDirection: 'row', 
    paddingHorizontal: 10, 
    height: 40, 
  },
  login_remember_txt: {
    flex:1,
    fontSize: FontSizes.fontSize17, 
    color: Colors.primaryBlackColor,
  },
  login_remember_switch_view: {
    width: 65,
    height:'100%', 
  },

  // NewsListScreen
  newList_containter: {
    flex: 1, 
    backgroundColor: Colors.whiteColor,
  },
  newsList_logo_view: {
    flexDirection: 'row', 
    alignItems: 'center', 
    height: screenHeight*0.12,
    marginTop: 15, 
    marginBottom: 5,
    paddingHorizontal: 25,
  },
  newList_logo_image: {
    width: '50%', 
    height: '100%'
  },
  newsList_date_view: {
    alignItems: 'flex-end', 
    justifyContent: 'center', 
    paddingRight: 10,
    width: '50%', 
    height:'100%',
  },
  newsList_date_txt: {
    fontSize: FontSizes.fontSize23, 
    color: Colors.blackColor,
  },
  newsList_scrollview: {
    flex: 1, 
    backgroundColor: Colors.whiteColor, 
    marginTop: 20,
  },
  newsList_horizontalview: {
    alignItems:'center', 
    flexDirection:'row', 
    paddingHorizontal: 13
  },
  newsList_divider: {
    marginHorizontal:15, 
    height:2, 
    backgroundColor: Colors.greyTextColor, 
    marginVertical: 20,
  },
  newsList_bottom_space: {
    marginHorizontal: 15, 
    height: 2, 
    backgroundColor: Colors.whiteColor, 
    marginTop: 20
  },
  newsList_no_data: {
    width:'100%', 
    height:'100%', 
    alignItems:'center', 
    paddingHorizontal:20
  },
  newsList_no_data_text: {
    color: Colors.greyTextColor, 
    fontSize:FontSizes.fontSize14,
    textAlign:'center',
    textAlignVertical: 'center'
  },

  // PDFViewScreen
  pdfview_container: {
    flex: 1, 
    backgroundColor: Colors.whiteColor,
  },
  pdfview_control_view: {
    backgroundColor: Colors.blackColor, 
    height: 50, 
    position: 'absolute', 
    bottom:0, 
    width:'100%', 
    alignItems: 'center', 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  pdfview_multislider_view: {
    paddingLeft: 20,
    height:'100%', 
    alignItems: 'center',
  },
  pdfview_multislider_mark: {
    width: 30, 
    height: 30, 
    backgroundColor: Colors.greyColor, 
    borderRadius: 15,
  },
  pdfview_pagination_button_view: {
    flexDirection: 'row', 
    alignItems: 'center',
  },

  // Common
  waitingBackground: {
    flex: 1,
    backgroundColor: '#000000A0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  waitingLayout: {
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 25,
    flexDirection: 'row'
  }
})