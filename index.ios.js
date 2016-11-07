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
    Image,StatusBar
} from 'react-native';
class MyView extends Component {
  _handleBackPress() {
    this.props.navigator.pop();
  }

  _handleNextPress(nextRoute) {
    this.props.navigator.push(nextRoute);
  }

  render() {
    const nextRoute = {
      component: MyView,
      title: 'Bar That',
      passProps: { myProp: this.props.myProp+this.props.index,
        index:this.props.index+1 },
      rightButtonTitle:this.props.myProp
    };
    return(
        <TouchableOpacity onPress={() => this._handleNextPress(nextRoute)}>
          <Text style={{marginTop: 200, alignSelf: 'center'}}>
            See you on the other nav {this.props.myProp}!
          </Text>
        </TouchableOpacity>
    );
  }
}

class TransDate extends Component{
  static propTypes = {
    requestDate:PropTypes.string.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.props.isToday = new Date() == new Date(props.requestDate);
  }
  returnDay(date){
    var day = ['日','一','二','三','四','五','六'];
    if(this.getDateStr(0)==(new Date(date)).toLocaleDateString())return "今天";
    if(this.getDateStr(-1)==(new Date(date)).toLocaleDateString())return "昨天";
    return '周'+day[(new Date(date)).getDay()];
  }
  returnTime(date){
    if(this.getDateStr(0)==(new Date(date)).toLocaleDateString())return (new Date(date)).toTimeString().split(' ')[0].substring(0,5);
    if(this.getDateStr(-1)==(new Date(date)).toLocaleDateString())return (new Date(date)).toTimeString().split(' ')[0].substring(0,5);
    return (new Date(date)).toLocaleDateString();
  }
  getDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;//获取当前月份的日期
    var d = dd.getDate();
    return y+"/"+m+"/"+d;
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
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([{price:1,content:"零食",listDate:"2016-11-6 11:23:32"},
        {price:9,content:"中餐",listDate:"2016-11-5 20:20:11"},
        {price:9,content:"中餐",listDate:"2016-10-29 08:23:33"},
        {price:9,content:"中餐",listDate:"2016-11-5 20:20:11"},
        {price:9,content:"中餐",listDate:"2016-10-29 08:23:33"},
        {price:9,content:"中餐",listDate:"2016-11-5 20:20:11"},
        {price:9,content:"中餐",listDate:"2016-10-29 08:23:33"}]),
    };
  }
  render() {
    return (
        <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>
                <View style={styles.listItem}>
                  <View style={{flex:1,flexDirection:"row"}}>
                    <TransDate requestDate={rowData.listDate}/>
                    <Image style={{backgroundColor:"#cd0200",width:50,height:50,marginTop:25,borderRadius:25}}/>
                  </View>
                  <View style={{flex:1.5,paddingLeft:20}} >
                    <Text style={styles.listItemText}>-{parseFloat(rowData.price).toFixed(2) }</Text>
                    <Text style={[styles.listItemText,{fontSize:13}]}>"{rowData.content }"</Text>
                  </View>

                </View>
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
