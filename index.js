import {AppRegistry} from 'react-native';
import Launch from './js/app/test/main/Launch';
import {StackNavigator} from 'react-navigation';
import Register from './js/app/test/skip/Register';
import HomeView from './js/app/test/skip/HomeView';
import HomeTableView from './js/app/test/skip/HomeTableView';
import ViewFour from './js/app/test/skip/ViewFour';
import RealmDemo from "./js/app/test/skip/RealmDemo";

const test = StackNavigator({
    app: {screen: Launch},
    Register: {screen: Register},
    Home: {screen: HomeView},
    HtView: {screen: HomeTableView},
    Four: {screen: ViewFour},
    Ream: {screen: RealmDemo},

})

AppRegistry.registerComponent('AwesomeProject', () => test);
