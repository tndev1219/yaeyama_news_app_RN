import React from 'react'
import PropTypes from 'prop-types'
import { Image, View, Text, TouchableOpacity } from 'react-native'
import {Colors} from '../theme/Colors';
import {Images} from '../theme/Assests';
import {FontSizes} from '../theme/Dimens';

export default class ListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDefault: false
    }
  }
  componentWillReceiveProps(newProps) {
    this.setState = {showDefault: false}
  }
  render() {
    const {
      cWidth,
      cDate,
      cImage,
    } = this.props    
    return(
      <View style={{width:'50%', paddingHorizontal:13, height:(cWidth-50)*0.7}}>
        <TouchableOpacity onPress={this.props.onPress} style={{width:'100%', height:'90%'}}>
          <Image
            style={{width:'100%', height:'100%'}}
            source={{ uri: ''+cImage }}
            resizeMode='stretch'/>
        </TouchableOpacity>
        <Text style={{height:'10%', color:Colors.greyTextColor, fontSize: FontSizes.fontSize20, textAlignVertical: 'center'}}>{cDate}</Text>
      </View>
    )
  }
}

ListItem.defaultProps = {
  cWidth: 0,
  cDate: '2000.01.01',
  cImage: Images.img_news,
}

ListItem.propTypes = {
  cWidth: PropTypes.number,
  cDate: PropTypes.string,
  cImage: PropTypes.string
}