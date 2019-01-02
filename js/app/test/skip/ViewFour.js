import React, {Component} from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    ViewPagerAndroid,
} from 'react-native'

class ViewFour extends Component {


    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedPage: 0,
        };
    }

    /**接收传递过来的参数 */
    componentDidMount() {
    }

    _onPageClick(position) {
        this.refs.viewPage.setPage(position);
    }

    render() {
        return (
            <View>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.tab}>
                        <TouchableOpacity onpress={this._onPageClick.bind(this, 0)}>
                            <Text style={{textAlign: 'center'}}>第一页</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tab}>
                        <TouchableOpacity onpress={this._onPageClick.bind(this, 1)}>
                            <Text style={{textAlign: 'center'}}>第二页</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ViewPagerAndroid style={styles.pageStyle} initialPage={this.state.selectedPage} ref="viewPage">
                    <View style={{backgroundColor: " red"}}>
                        <Text>First Page!</Text>
                    </View>
                    <View style={{backgroundColor: " yellow"}}>
                        <Text>Second Page!</Text>
                    </View>
                </ViewPagerAndroid>
            </View>
        )
    }
}
var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    tab: {
        height: 30,
        flex: 1,
    },
    pageStyle: {
        alignItems: 'center',
        padding: 20,
        height: 200,
    },
});

export default ViewFour;