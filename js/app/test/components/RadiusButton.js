import React, {
    Component,
} from 'react';
import PropTypes from 'prop-types'

import {
    StyleSheet,
    PixelRatio,
    Text,
    View,
    TouchableHighlight,
    Platform,
} from 'react-native';

class RadiusBtn extends Component {

    static propTypes = {
        btnName: PropTypes.string,
        textStyle: Text.propTypes.style,
        btnStyle: TouchableHighlight.propTypes.style,
        underlayColor: TouchableHighlight.propTypes.underlayColor,
    };

    static defaultProps = {
        btnName: 'Button',
        underlayColor: '#4169e1',
    };


    render() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <TouchableHighlight
                    underlayColor={this.props.underlayColor}
                    activeOpacity={0.5}
                    style={[styles.center, styles.btnDefaultStyle, this.props.btnStyle]}
                    onPress={this.props.onPress}>
                    <Text style={[styles.textDefaultStyle, this.props.textStyle]}>{this.props.btnName}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnDefaultStyle: {
        width: 100,
        height: 20,
        backgroundColor: '#3592DE',
        borderColor: '#3592DE',
        borderRadius: 15,
        borderWidth: (Platform.OS === 'ios' ? 1.0 : 1.5) / PixelRatio.get(),
    },
    textDefaultStyle: {
        fontSize: 16,
        color: '#ffffff',
    },
});

module.exports = RadiusBtn;