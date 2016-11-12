/**
 * Created by apple on 2016/11/10.
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
    Image,StatusBar,
    Picker,
    Animated
} from 'react-native';
var winWidth = require("Dimensions").get("window").width;
export default class ViewList extends Component(){

    render(){
        return (<View style={styles.viewLine}>
            <View style={styles.viewLineText}>
                <Text style={{width:40}}>备注</Text>
                <Text style={styles.viewLineTextTitle}>
                    备注...
                </Text>
            </View>
        </View>)
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight:10,
        marginTop:-15
    },
    viewLine:{
        flexDirection:"row",
        width:winWidth
    },
    viewLineText:{
        marginLeft:winWidth*0.05,
        width:winWidth*0.9,
        borderBottomColor:"#ccc",
        borderBottomWidth:1,
        alignSelf: 'center'
    },
    viewLineTextSpan:{
        width:100,
        height:20,
        marginTop:5,
        color:"#999"
    },
    viewLineTextTitle:{
        height:20,
        alignSelf: 'flex-start',
        fontSize:18,
        fontWeight:'300',
        marginBottom:10
    }
})