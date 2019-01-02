import React, {Component} from 'react';
import {
    ViewPagerAndroid,
    View,
    Image,
    Text, StyleSheet
} from 'react-native'
import TabNavigator from 'react-native-tab-navigator';

class HomeView extends Component {
    // 这些注释全部是navigationOptions的属性 navigationOptions是标题栏
    // title：标题，如果设置了这个导航栏和标签栏的title就会变成一样的，所以不推荐使用这个方法。
    // header：可以设置一些导航的属性，当然如果想隐藏顶部导航条只要将这个属性设置为null就可以了。
    // headerTitle：设置导航栏标题，推荐用这个方法。
    // headerBackTitle：设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题。可以自定义，也可以设置为null
    // headerTruncatedBackTitle：设置当上个页面标题不符合返回箭头后的文字时，默认改成"返回"。（上个页面的标题过长，导致显示不下，所以改成了短一些的。）
    // headerRight：设置导航条右侧。可以是按钮或者其他。
    // headerLeft：设置导航条左侧。可以是按钮或者其他。
    // headerStyle：设置导航条的样式。背景色，宽高等。如果想去掉安卓导航条底部阴影可以添加elevation: 0，iOS下用shadowOpacity: 0。
    // headerTitleStyle：设置导航条文字样式。安卓上如果要设置文字居中，只要添加alignSelf:'center'就可以了
    // headerBackTitleStyle：设置导航条返回文字样式。
    // headerTintColor：设置导航栏文字颜色。总感觉和上面重叠了。
    // headerPressColorAndroid：安卓独有的设置颜色纹理，需要安卓版本大于5.0
    // gesturesEnabled：是否支持滑动返回手势，iOS默认支持，安卓默认关闭


    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home'
        }
    }

    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <View style={homeStyles.container}>
                <TabNavigator>
                    <TabNavigator.Item title='首页'
                                       selected={this.state.selectedTab === 'home'}
                                       renderIcon={() => <Image style={homeStyles.iconImg}
                                                                source={require("../drawable/tab_home_normal.png")}/>}
                                       renderSelectedIcon={() => <Image style={homeStyles.iconImg}
                                                                        source={require("../drawable/tab_home_selected.png")}/>}
                                       onPress={() => {
                                           this.setState({selectedTab: 'home'})
                                       }}
                    >
                        <View style={homeStyles.viewPager}>
                            <Text style={homeStyles.tabTextStyle}>首页</Text>
                        </View>
                    </TabNavigator.Item>

                    <TabNavigator.Item title='服药'
                                       selected={this.state.selectedTab === 'medic'}
                                       renderIcon={() => <Image style={homeStyles.iconImg}
                                                                source={require("../drawable/tab_medicine_normal.png")}/>}
                                       renderSelectedIcon={() => <Image style={homeStyles.iconImg}
                                                                        source={require("../drawable/tab_medicine_selected.png")}/>}
                                       onPress={() => {
                                           this.setState({selectedTab: 'medic'})
                                       }}
                    >
                        <View style={homeStyles.viewPager}>
                            <Text style={homeStyles.tabTextStyle}>服药</Text>
                        </View>
                    </TabNavigator.Item>
                    <TabNavigator.Item title='健康'
                                       selected={this.state.selectedTab === 'health'}
                                       renderIcon={() => <Image style={homeStyles.iconImg}
                                                                source={require("../drawable/tab_health_normal.png")}/>}
                                       renderSelectedIcon={() => <Image style={homeStyles.iconImg}
                                                                        source={require("../drawable/tab_health_selected.png")}/>}
                                       onPress={() => {
                                           this.setState({selectedTab: 'health'})
                                       }}
                    >
                        <View style={homeStyles.viewPager}>
                            <Text style={homeStyles.tabTextStyle}>健康</Text>
                        </View>
                    </TabNavigator.Item>
                    <TabNavigator.Item title='我的'
                                       selected={this.state.selectedTab === 'user'}
                                       renderIcon={() => <Image source={require('../drawable/tab_user_normal.png')}
                                                                style={homeStyles.iconImg}></Image>}
                                       renderSelectedIcon={() => <Image style={homeStyles.iconImg}
                                                                        source={require("../drawable/tab_user_selected.png")}/>}
                                       onPress={() => {
                                           this.setState({selectedTab: 'user'})
                                       }}
                    >
                        <View style={homeStyles.viewPager}>
                            <Text style={homeStyles.tabTextStyle}>我的</Text>
                        </View>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );


    }
}

homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    viewPager: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    pageStyle: {
        alignItems: 'center',
        padding: 20,
    },
    cutLineStyle: {
        height: 1,
        backgroundColor: '#C5C5C5',
    },

    bottomTabStyle: {
        height: 50,
    },

    tabItemStyle: {
        flex: 1,

    },
    iconImg: {
        width: 22,
        height: 22
    },

    tabTextStyle: {
        textAlign: 'center',
        fontSize: 50
    }


});


export default HomeView;