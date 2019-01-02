/**
 * Sample React Native Launch
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

import RadiusButton from '../components/RadiusButton';

class Launch extends Component {
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    欢迎来到心之力APP
                </Text>
                <View style={styles.loginStyle}>
                    <Text style={styles.leftInfo}>
                        用户名:
                    </Text>
                    <TextInput style={{flex: 0.8}}>
                    </TextInput>
                </View>

                <View style={styles.loginStyle}>
                    <Text style={styles.leftInfo}>
                        密码:
                    </Text>
                    <TextInput style={{flex: 0.8}}>
                    </TextInput>
                </View>
                <RadiusButton
                    btnName='登录'
                    textStyle={{
                        fontSize: 16,
                        color: '#FFFFFF',
                    }}
                    btnStyle={{
                        width: 300,
                        height: 44,
                        marginTop: 40,
                        borderRadius: 25,
                    }}
                    underlayColor='#3592DE'
                    onPress={() => {
                        this.props.navigation.navigate('Register')
                    }}>>
                </RadiusButton>
            </View>

        )
    }
}

styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    leftInfo: {
        width: 70,
        textAlign: 'right',
        fontSize: 20,
        margin: 10,
    },
    loginStyle: {
        marginTop:30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },

    welcome: {
        textAlign: 'center',
        marginTop :60,
        marginBottom:60,
        color :'#3592DE',
        fontSize: 20,
    },
});


export default Launch;

