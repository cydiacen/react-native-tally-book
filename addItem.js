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
    Animated,
    TextInput,
    TouchableWithoutFeedback,
    DatePickerIOS
} from 'react-native';
import ImagePicker from './imagePicker';
let winWidth = require("Dimensions").get("window").width,
    winHeight = require("Dimensions").get("window").height;
export default class MyView extends Component {
    _handleBackPress() {
        this.props.navigator.pop();
    }

    _handleNextPress(nextRoute) {
        this.props.navigator.push(nextRoute);
    }
    constructor(props, context) {
        super(props, context);
        this.state = {
            margin: new Animated.Value(8),
            typePickerSlide:new Animated.Value(0),
            slideType:false,
            slideDateType:false,
            typeDatePickerSlide:new Animated.Value(0),
            desDisplay:false,
            tempType:"早餐",
            date:new Date(),
            itemObj:{
                type:"早餐",
                tempDate:new Date(),
                des:"备注..."
            },
            _type:["早餐","中餐","晚餐","夜宵","零食","娱乐","学习","工作","其他"].map((v)=>{
                return  <Picker.Item label={v} value={v} />;
            })
        };
    }
    componentWillMount() {
        this.setState({language:"wc"});
    }
    _pressTitle(){
        Animated.timing(this.state.margin,{toValue:-8}).start();
    }
    _typePickerSlide(){
        if(this.state.slideType){
            Animated.timing(this.state.typePickerSlide,{toValue:0}).start();
        }else{
            Animated.timing(this.state.typePickerSlide,{toValue:-winHeight*0.8}).start();
        }
        this.setState({slideType:!this.state.slideType});
    }
    _typeDatePickerSlide(){
        if(this.state.slideDateType){
            Animated.timing(this.state.typeDatePickerSlide,{toValue:0}).start();
        }else{
            Animated.timing(this.state.typeDatePickerSlide,{toValue:-winHeight*0.8}).start();
        }
        this.setState({slideDateType:!this.state.slideDateType});
    }
    _typePickerConfirm(){
        Animated.timing(this.state.typePickerSlide,{toValue:0}).start();
        this.setState({slideType:!this.state.slideType});
        this.setState({itemObj:Object.assign(this.state.itemObj,{type:this.state.tempType}) });
    }
    _typeDateConfirm(){
        Animated.timing(this.state.typeDatePickerSlide,{toValue:0}).start();
        this.setState({slideDateType:!this.state.slideDateType});
        this.setState({itemObj:Object.assign(this.state.itemObj,{tempDate:this.state.date}) });
    }
    _showDesInput(){
        this.setState({desDisplay:!this.state.desDisplay})
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
            <View style={{height:winHeight,position:"relative"}}>
                <View style={{width:winWidth,height:70,backgroundColor:"#eee"}}>
                    <TouchableOpacity onPress={this._pressTitle.bind(this)}>
                        <Animated.Text style={{fontSize:45,color:"#3c5b75",marginLeft:20, transform:[{translateY:this.state.margin}]}}>0.00</Animated.Text>
                    </TouchableOpacity>
                    <ImagePicker/>
                    <View>

                    </View>
                </View>
                <Animated.View>

                </Animated.View>

                    <View style={[{width:winWidth*0.3,flexDirection:"row"}]}>
                        <View style={[styles.viewLineText]}>
                            <TouchableOpacity onPress={this._typePickerSlide.bind(this)}>
                            <Text style={styles.viewLineTextSpan}>分类</Text>
                            <Text style={styles.viewLineTextTitle}>
                                {this.state.itemObj.type}
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                <View style={styles.viewLine}>
                    <View style={[styles.viewLineText]}>
                        <TouchableOpacity onPress={this._typeDatePickerSlide.bind(this)}>
                        <Text style={styles.viewLineTextSpan}>时间</Text>
                        <Text style={styles.viewLineTextTitle}>
                            {this.state.itemObj.tempDate.toLocaleDateString()}
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.viewLine}>
                    <TouchableOpacity onPress={this._showDesInput.bind(this)}>
                        {
                            this.state.desDisplay?
                                <View style={{width:winWidth,height:50}}>
                                    <Text style={{width:40,marginLeft:20,marginTop:5,color:"#999"}}>备注</Text>
                                    <TextInput
                                        defaultValue={this.state.itemObj.des=="备注..."?
                                            "":this.state.itemObj.des
                                        }
                                        onBlur = {()=>{
                                            this.setState({desDisplay:false})
                                        }}
                                        onChangeText ={(value)=>{this.setState(
                                        {itemObj:Object.assign(this.state.itemObj,{des:value})}
                                    )}} style={{width:winWidth,height:20,fontSize:16,marginTop:5,marginLeft:20,color: "#3c5b75"}} placeholder={"点击输入备注"} placeholderTextColor={"#3c5b75c0"}/>
                                </View>:
                                <View style={styles.viewLineText}>
                                    <Text style={[styles.viewLineTextTitle,{marginTop:15,marginBottom:15}]}>
                                        {this.state.itemObj.des}
                                    </Text>
                                </View>
                        }
                    </TouchableOpacity>
                </View>
                <View style={{flex:1,width:winWidth,height:300,backgroundColor:"#ccc",position:"absolute",bottom:0,flexDirection:"row"}}>
                    <View style={{flex:1,height:300,backgroundColor:"#3c5b75",flexDirection:"column"}}>
                        <TouchableOpacity style={{flex:2,justifyContent:"center",alignItems:"center",backgroundColor:"#bbb"}}>
                            <Text style={{color:"#fff",fontSize: 20,textAlign:"center"}}>
                                支出
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:3,borderRightWidth:1,borderRightColor:"#999"}}>
                            <Text style={{color:"#fff",fontSize:20,textAlign:"center",marginTop:50}}>
                                收入
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:7,height:300,backgroundColor:"#3c5b75"}}>

                    </View>
                </View>
                {
                    this.state.slideType?
                    <TouchableWithoutFeedback onPress={this._typePickerSlide.bind(this)}><View style={{position:"absolute", top:0,left:0,width:winWidth,height:winHeight*0.59,zIndex:1,backgroundColor:"#5550"}}/></TouchableWithoutFeedback>:<View/>
                }
                <Animated.View style={{borderTopColor:"#3c5b75",borderTopWidth:30,marginTop:winHeight,transform:[{translateY:this.state.typePickerSlide}],position:"absolute",zIndex:2}}>
                    <TouchableOpacity onPress={this._typePickerSlide.bind(this)}>
                        <Text style={{color:"#fff",width:40,height:20,backgroundColor:"#3c5b7500",fontSize:15,position:"absolute",left:10,marginTop:-23}}>取消</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._typePickerConfirm.bind(this)}>
                        <Text style={{color:"#fff",width:40,height:30,backgroundColor:"#3c5b7500",fontSize:15,position:"absolute",right:0,marginTop:-23}}>确定</Text>
                    </TouchableOpacity>
                    <Picker
                    style={{height:50,width:winWidth}}
                    selectedValue={this.state.tempType}
                    itemStyle={{color:"#3c5b75"}}
                    onValueChange={(type) => this.setState({tempType: type})}>
                        {this.state._type}
                    </Picker>
                </Animated.View>
                <Animated.View style={{borderTopColor:"#3c5b75",borderTopWidth:30,marginTop:winHeight,transform:[{translateY:this.state.typeDatePickerSlide}],position:"absolute",zIndex:2}}>
                    <TouchableOpacity onPress={this._typePickerSlide.bind(this)}>
                        <Text style={{color:"#fff",width:40,height:20,backgroundColor:"#3c5b7500",fontSize:15,position:"absolute",left:10,marginTop:-23}}>取消</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._typeDateConfirm.bind(this)}>
                        <Text style={{color:"#fff",width:40,height:30,backgroundColor:"#3c5b7500",fontSize:15,position:"absolute",right:0,marginTop:-23}}>确定</Text>
                    </TouchableOpacity>
                    <DatePickerIOS
                        style={{height:50,width:winWidth}}
                        date={this.state.date}
                        mode="date"
                        onDateChange={(date)=>{
                        this.setState({date:date})
                    }}/>
                </Animated.View>
            </View>
        );
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
