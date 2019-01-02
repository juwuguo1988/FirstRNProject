import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';

const DogSchema = {
    name: 'Dog',
    primaryKey: 'id',
    properties: {
        id: 'int',
        dogName: 'string',
        color: 'string',
    }
};

class RealmDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {realm: null};
    }

    componentWillMount() {
        let realm = new Realm({schema: [DogSchema]});
        realm.write(() => {
            realm.create('Dog', {id: 0, dogName: 'Rex', color: 'red'});
            realm.create('Dog', {id: 1, dogName: 'Jeff', color: 'green'});
            realm.create('Dog', {id: 2, dogName: 'Dave', color: 'black'});
            //更新id为1的数据
            realm.create('Dog', {id: 1, color: 'white'}, true);
        });
        this.setState({realm});
    }

    render() {
        const info = this.state.realm
            ? 'Number of dogs in this Realm: ' + this.state.realm.objects('Dog').length
            : 'Loading...';

        return (
            <View style={styles.container}>
                <Text>
                    {info}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingTop: 20,
    },
});

export default RealmDemo;