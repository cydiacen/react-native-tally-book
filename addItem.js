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
    Picker
} from 'react-native';
export default class MyView extends Component {
    _handleBackPress() {
        this.props.navigator.pop();
    }

    _handleNextPress(nextRoute) {
        this.props.navigator.push(nextRoute);
    }
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.setState({language:"java"});
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
            <View >
                <Text style={{marginTop:10, height:20,alignSelf: 'flex-start',paddingLeft:20,fontSize:20,fontWeight:'300'}}>
                    记录类型
                </Text>
                    <Picker
                        selectedValue={this.state.language}
                        onValueChange={(lang) => this.setState({language: lang})}>
                        <Picker.Item label="早餐" value="zac" />
                        <Picker.Item label="中餐" value="zhc" />
                        <Picker.Item label="晚餐" value="wc"/>
                    </Picker>

            </View>
        );
    }
}