import React from 'react'
import PropTypes from 'prop-types'
import { Image, View, TouchableOpacity, Platform, StyleSheet, Text } from 'react-native'
import { Icons } from '../../theme/Assests';

const isiOS = Platform.OS === 'ios';

export default class SCSwitch extends React.Component {
  constructor(props) {
    super(props)    
  }

  onToggle() {        
    this.props.onToggleState(this.props.value === 0 ? 1 : 0)
  }

  render() {
    const {
      value,
    } = this.props
    var image = Icons.bi_state_1
    if (value === 1) {
      image =  Icons.bi_state_2
    }
    
    return (
      <TouchableOpacity
        onPress={this.onToggle.bind(this)}
        style={this.props.style}>
        <Image
          style={styles.image}
          source={image}           
          resizeMode={'contain'}/>
      </TouchableOpacity>
    )
  }
}

SCSwitch.defaultProps = {  
  value: 0,
}

SCSwitch.propTypes = {
  onToggleState: PropTypes.func,
  value: PropTypes.number,
}

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%'
  }
})