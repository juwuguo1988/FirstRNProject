import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native'

import RadiusButton from '../components/RadiusButton';
import Toast, {DURATION} from 'react-native-easy-toast'
import { AsyncStorage } from 'react-native';

class Register extends Component {

    static navigationOptions = {
        headerTitle: '注册',
        headerStyle: {height: 44}
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    欢迎注册心之力APP
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
                    btnName='注册'
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
                        this.refs.toast.show('注册成功!', DURATION.FOREVER);
                        this.post()
                    }}>>
                </RadiusButton>
                <Toast ref="toast"/>
            </View>

        )
    }

    post() {
        let formData = new FormData();

        // 请求参数 ('key',value)
        formData.append("grant_type", "password");
        formData.append("username", "17710189466");
        formData.append("password", "654321");
        formData.append("device_type", "android");
        // 登录的时候添加一下leanCloud 生成的设备id用于推送:
        // AVInstallation.getCurrentInstallation().getInstallationId();
        formData.append("device_token","111111111111111");
        fetch('http://api.test.xzlcorp.com/v0/oauth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Basic cGF0aWVudF9hcHA6'
            },
            body:formData
        }).then((response) => response.json())//1
            .then((jsonData) => {//2
                AsyncStorage.setItem('access_token',jsonData.access_token,(error)=>{
                    if (error) {
                        alert('存储失败');
                    } else  {
                        alert('存储成功');
                    }
                });
                this.refs.toast.close();
                this.props.navigation.navigate('HtView')
            });
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
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },

    welcome: {
        textAlign: 'center',
        marginTop: 60,
        marginBottom: 60,
        color: '#3592DE',
        fontSize: 20,
    },
});

export default Register;