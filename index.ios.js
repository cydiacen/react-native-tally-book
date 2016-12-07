/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component,PropTypes } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NavigatorIOS,
    TouchableOpacity,
    ListView,
    Image,StatusBar,AsyncStorage
} from 'react-native';
import moment from 'moment';
import MyView from './addItem';
import Swipeout from 'react-native-swipeout';
import datePickEX from "./datePicker";
import Storage from 'react-native-storage';
var storage = new Storage({
    size:1000,
    storageBackend:AsyncStorage,
    defaultExpires:null,
})
console.log(datePickEX);
class TransDate extends Component{
  static propTypes = {
    requestDate:PropTypes.string.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.props.isToday = new Date() == new Date(props.requestDate);
  }
  returnDay(date){
    date = date.replace(/[-]/g,'/');
    var day = ['日','一','二','三','四','五','六'];
    if(moment().weekday()==moment(date).weekday())return "今天";
    if(moment().diff(moment(date),'day')<2)return "昨天";
    return "周"+day[moment(date).weekday()];
  }
  returnTime(date){
      date = date.replace(/[-]/g,'/');
      if(moment().weekday()==moment(date).weekday())return date.split(' ')[1].substring(0,5);
      if(moment().diff(moment(date),'day')<2)return date.split(' ')[1].substring(0,5);
      return moment(date).toDate().getMonth()+"-"+moment(date).toDate().getDate();
  }
  render(){
    return (
        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
          <Text>{this.returnDay(this.props.requestDate)}</Text>
          <Text style={{fontSize:12,marginTop:5,fontWeight:'100'}}>{this.returnTime(this.props.requestDate)}</Text>
        </View>
    );
  }
}
class MyList extends Component{
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([{price:1,content:"零食",listDate:"2016-11-07 11:23:32",flag:1},
        {price:9,content:"中餐",listDate:"2016-11-6 20:20:11",flag:1},
        {price:9,content:"中餐",listDate:"2016-11-5 08:23:33",flag:0},
        {price:9,content:"中餐",listDate:"2016-11-4 20:20:11",flag:0},
        {price:9,content:"中餐",listDate:"2016-11-3 08:23:33",flag:0},
        {price:9,content:"中餐",listDate:"2016-11-2 20:20:11",flag:0},
        {price:9,content:"中餐",listDate:"2016-11-1 08:23:33",flag:0}]),
        scrollEnabled:true
    };
  }
    //  set scrolling to true/false
    _allowScroll(scrollEnabled) {
        this.setState({ scrollEnabled: scrollEnabled });
    }

    //  set active swipeout item
    _handleSwipeout(sectionID, rowID) {
        for (let i = 0; i < rows.length; i++) {
            rows[i].active = i == rowID;
        }
        this._updateDataSource(rows);
    }

    _updateDataSource(data) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data),
        });
    }
  render() {
    return (
        <ListView
            dataSource={this.state.dataSource}
            scrollEnabled={this.state.scrollEnabled}
            renderRow={(rowData) =>
            <Swipeout
                left={[{text:"标记",backgroundColor:"#ffbe4e"}]}
                right={[{text:"删除",backgroundColor:"#ff3939"},{text:"编辑",backgroundColor:"#31ba8a"}]}
                style={{backgroundColor:"#fff"}}
                backgroundColor="#fff"
            >
                <View style={styles.listItem}>
                    <Image source={require('./img/collect.png')} style={{opacity:rowData.flag,width:20,height:20,marginTop:40,marginLeft:10}}/>
                  <View style={{flex:0.8,flexDirection:"row"}}>
                    <TransDate requestDate={rowData.listDate}/>
                    <Image style={{backgroundColor:"#cd0200",width:50,height:50,marginTop:25,borderRadius:25}}/>
                  </View>
                  <View style={{flex:1.5,paddingLeft:20}} >
                    <Text style={styles.listItemText}>-{parseFloat(rowData.price).toFixed(2) }</Text>
                    <Text style={[styles.listItemText,{fontSize:13}]}>"{rowData.content }"</Text>
                  </View>

                </View>
            </Swipeout>
            }
        />
    );
  }
}
class NavvyIOS extends Component {
  _handleNavigationRequest() {
    this.refs.nav.push({
      component: MyView,
      title: '添加记录',
      titleTextColor:"#fff",
      translucent:false,
      tintColor:"#fff",
      passProps: {
        myProp: 'genius' ,
        index:0}
    });
  }

  render() {
    return (
        <View style={{flex:1}}>
          <StatusBar
              barStyle="light-content"
          />
          <NavigatorIOS
              barTintColor="#405b77"
              ref='nav'
              initialRoute={{
                component: MyList,
                title: '记账册',
                passProps: { myProp: 'foo' },
                rightButtonTitle: '添加',
                shadowHidden:true,
                titleTextColor:"#fff",
                tintColor:"#fff",
                translucent:false,
                onRightButtonPress: () => this._handleNavigationRequest(),
                leftButtonIcon:require('./img/collect.png')
              }}
              style={{flex: 1}}
          />
        </View>
    );
  }
}
const styles = StyleSheet.create({
  listItem:{
    borderBottomWidth:2,
    borderBottomColor:"#eee",
    height:100,
    width:400,
    flexDirection:"row",
    justifyContent:'flex-start',
    flex:1
  },
  listItemText:{
    textAlign:'left',
    fontSize:20,
    paddingLeft:20,
    paddingTop:20,

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => NavvyIOS);
