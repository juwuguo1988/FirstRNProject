import React, {Component} from 'react';
import {
    ViewPagerAndroid,
    View,
    Image,
    Text, StyleSheet,
    TouchableOpacity,
    ListView
} from 'react-native'
import RadiusButton from '../components/RadiusButton';
import {AsyncStorage} from 'react-native';


class HomeTableView extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {selectedButton: 0, selectedPage: 0, dataSource: null, realm: null, disPlaySource: null};
        this.selectionOnPress = this.selectionOnPress.bind(this)
        this.onPageSelected = this.onPageSelected.bind(this)
    }

    selectionOnPress(position) {
        this.refs.viewPagers.setPage(position)
        this.setState({selectedButton: position, selectedPage: position})
    }

    onPageSelected(e) {
        this.setState({selectedButton: e.nativeEvent.position, selectedPage: e.nativeEvent.position})
    }

    componentWillMount() {
        this.initRealmDataBase()
    }


    render() {
        return (
            <View style={homeStyles.container}>
                <ViewPagerAndroid
                    style={homeStyles.viewPager}
                    initialPage={this.state.selectedPage}
                    onPageSelected={this.onPageSelected}
                    ref="viewPagers">
                    <View style={homeStyles.pageStyle}>
                        <Text style={homeStyles.tabTextStyle}>首页</Text>
                        <RadiusButton
                            btnName='展示服药计划'
                            textStyle={{
                                fontSize: 16,
                                color: '#FFFFFF',
                            }}
                            btnStyle={{
                                width: 120,
                                height: 33,
                                marginTop: 20,
                                borderRadius: 25,
                            }}
                            underlayColor='#3592DE'
                            onPress={() => {
                                this.getMedicInfo()
                            }}>>
                        </RadiusButton>
                        {!!this.state.dataSource ? <ListView
                            showsVerticalScrollIndicator={false}
                            dataSource={this.state.dataSource}
                            renderRow={(plans) => this._renderRow(plans)}
                        /> : <View/>}
                    </View>
                    <View style={homeStyles.pageStyle}>
                        <Text style={homeStyles.tabTextStyle}>服药</Text>
                        <RadiusButton
                            btnName='查询服药计划'
                            textStyle={{
                                fontSize: 16,
                                color: '#FFFFFF',
                            }}
                            btnStyle={{
                                width: 120,
                                height: 33,
                                marginTop: 20,
                                borderRadius: 25,
                            }}
                            underlayColor='#3592DE'
                            onPress={() => {
                                this.getAllMedicPlan()
                            }}>>
                        </RadiusButton>
                        {!!this.state.disPlaySource ? <ListView
                            showsVerticalScrollIndicator={false}
                            dataSource={this.state.disPlaySource}
                            renderRow={(medicPlans) => this._renderNewRow(medicPlans)}
                        /> : <View/>}
                    </View>
                    <View style={homeStyles.pageStyle}>
                        <Text style={homeStyles.tabTextStyle}>健康</Text>
                    </View>
                    <View style={homeStyles.pageStyle}>
                        <Text style={homeStyles.tabTextStyle}>我的</Text>
                    </View>
                </ViewPagerAndroid>
                <View style={homeStyles.cutLineStyle}/>
                <View style={homeStyles.bottomTabStyle}>
                    <TouchableOpacity style={homeStyles.toStyle}
                                      onPress={() => this.selectionOnPress(0)}>
                        <Image
                            style={homeStyles.iconImg}
                            source={this.state.selectedButton === 0 ? require('../drawable/tab_home_selected.png') : require('../drawable/tab_home_normal.png')}>
                        </Image>
                        <Text style={{color: this.state.selectedButton === 0 ? '#3592DE' : '#2C2F32'}}>
                            <Text style={homeStyles.tabBottomTextStyle}>首页</Text>
                        </Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={homeStyles.toStyle}
                                      onPress={() => this.selectionOnPress(1)}>
                        <Image
                            style={homeStyles.iconImg}
                            source={this.state.selectedButton === 1 ? require('../drawable/tab_medicine_selected.png') : require('../drawable/tab_medicine_normal.png')}>
                        </Image>
                        <Text style={{color: this.state.selectedButton === 1 ? '#3592DE' : '#2C2F32'}}>
                            <Text style={homeStyles.tabBottomTextStyle}>服药</Text>
                        </Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={homeStyles.toStyle}
                                      onPress={() => this.selectionOnPress(2)}>
                        <Image
                            style={homeStyles.iconImg}
                            source={this.state.selectedButton === 2 ? require('../drawable/tab_health_selected.png') : require('../drawable/tab_health_normal.png')}>
                        </Image>
                        <Text style={{color: this.state.selectedButton === 2 ? '#3592DE' : '#2C2F32'}}>
                            <Text style={homeStyles.tabBottomTextStyle}>健康</Text>
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={homeStyles.toStyle}
                                      onPress={() => this.selectionOnPress(3)}>
                        <Image
                            style={homeStyles.iconImg}
                            source={this.state.selectedButton === 3 ? require('../drawable/tab_user_selected.png') : require('../drawable/tab_user_normal.png')}>
                        </Image>
                        <Text
                            style={{color: this.state.selectedButton === 3 ? '#3592DE' : '#2C2F32'}}>
                            <Text style={homeStyles.tabBottomTextStyle}>我的</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );


    }

    _renderRow = (rowData) => {
        return (
            <TouchableOpacity style={homeStyles.cellContainer} onPress={() => {
            }}>
                <Text style={homeStyles.tabBottomTextStyle} numberOfLines={1}
                      ellipsizeMode={'tail'}>{rowData.medicineName}</Text>
                <Text style={homeStyles.tabBottomTextStyle}>{rowData.takeAt}</Text>
            </TouchableOpacity>
        )
    }

    _renderNewRow = (rowData) => {
        return (
            <TouchableOpacity style={homeStyles.cellContainer} onPress={() => {
            }}>
                <Text style={homeStyles.tabBottomTextStyle} numberOfLines={1}
                      ellipsizeMode={'tail'}>{rowData.medicineName}</Text>
                <Text style={homeStyles.tabBottomTextStyle}>{rowData.takeAt}</Text>
                <Text style={homeStyles.tabBottomTextStyle}>{rowData.dosage}</Text>
            </TouchableOpacity>
        )
    }

    getMedicInfo() {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        //DataSource()可以接收四种参数
        //rowHasChanged就是渲染每一行的依据，r1是上一行的数据，r2是下一行的数据
        //此处定义：r1和r2不同时，需要渲染新的一行
        AsyncStorage.getItem('access_token', (error, result) => {
            if (!error) {
                let new_token = "Bearer " + result;
                console.log(new_token);
                fetch('http://api.test.xzlcorp.com/v0/patient/init', {
                    method: 'GET',
                    headers: {
                        'Authorization': new_token,
                        'Content-Type': 'application/json'
                    }
                }).then((response) => response.json())//1
                    .then((jsonData) => {//2
                        console.log(jsonData.data.plans.length)
                        let arrayData = jsonData.data.plans;
                        console.log(arrayData)
                        arrayData.forEach(planItem => {
                            this.state.realm.write(() => {
                                this.state.realm.create('MedicPlan', {
                                    id: planItem.id,
                                    takeAt: planItem.takeAt,
                                    cycleDays: planItem.cycleDays,
                                    medicineId: planItem.medicineId,
                                    positionNo: planItem.positionNo,
                                    dosage: planItem.dosage,
                                    zone: planItem.zone,
                                    medicineName: planItem.medicineName,
                                    started: planItem.started,
                                    ended: planItem.ended,
                                    dosageUnit: planItem.dosageUnit,
                                    medicineVia: planItem.medicineVia,
                                    medicineHash: planItem.medicineHash,
                                    remindFirstAt: planItem.remindFirstAt,
                                    dosageFormUnit: planItem.dosageFormUnit,
                                    commodityName: planItem.commodityName,
                                    ingredient: planItem.ingredient,
                                    boxUuid: planItem.boxUuid,
                                    planSeqWithBox: planItem.planSeqWithBox,
                                    category: planItem.category,
                                });
                            });
                            console.log(planItem)
                        });
                        this.setState({dataSource: ds.cloneWithRows(jsonData.data.plans)})
                    });
            }
        })
    }

    getAllMedicPlan() {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let medicPlans = this.state.realm.objects('MedicPlan');
        this.setState({disPlaySource: ds.cloneWithRows(medicPlans)})
    }

    initRealmDataBase() {
        // 根据提供的表初始化 Realm，可同时往数组中放入多个表
        this.setState({realm: new Realm({schema: [PersonSchema]})})
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
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row'
    },

    toStyle: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-around',
        alignItems: 'center',
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
    },

    tabBottomTextStyle: {
        textAlign: 'center',
        fontSize: 14,
        width: 80,
    },

    cellContainer: {
        flexDirection: 'row',
        height: 50
    }


});

/**
 * Realm中除了查询操作，
 * 增加，删除，修改都需要放到write事务中，
 * 但write事务比较耗时，
 * 所以我们应该尽量减少write事务来提高运行效率。
 */

// 新建表模型
const PersonSchema = {
    name: 'MedicPlan',
    primaryKey: 'id',    // 官方没给出自增长的办法,而且一般不会用到主键,这也解决了重复访问的问题,而且实际开发中我们不需要主键的,让服务端管就是了
    properties: {
        id: {type: 'string', optional: true},
        takeAt: {type: 'int', optional: true},
        cycleDays: {type: 'int', optional: true},
        medicineId: {type: 'string', optional: true},
        count: {type: 'int', optional: true},
        positionNo: {type: 'int', defaultValue: '0'},//defaultValue定义属性默认值
        dosage: {type: 'int', optional: true},
        zone: {type: 'int', optional: true},
        medicineName: {type: 'string', optional: true},
        started: {type: 'int', optional: true},
        ended: {type: 'int', optional: true},//optional表示此属性是可选属性，属性值可以为null或undefined
        dosageUnit: {type: 'string', optional: true},
        medicineVia: {type: 'int', optional: true},
        medicineHash: {type: 'string', optional: true},
        remindFirstAt: {type: 'int', optional: true},
        dosageFormUnit: {type: 'string', optional: true},
        commodityName: {type: 'string', optional: true},
        ingredient: {type: 'string', optional: true},
        boxUuid: {type: 'string', optional: true},
        planSeqWithBox: {type: 'string', optional: true},
        category: {type: 'string', optional: true},
    }
};


export default HomeTableView;