import React, {Component} from 'react';
import {StyleSheet,
ScrollView,Dimensions,Text,ActivityIndicator,TouchableOpacity,TextInput,View,Image,StatusBar,Modal,ImageBackground,
KeyboardAvoidingView,useWindowDimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/Entypo';
import {Toast,CheckBox,Container,Button,Radio,Content,Root,List,Card,Spinner,ActionSheet, CardItem, ListItem, Thumbnail, Header, Left, Body, Right, Title, Subtitle } from 'native-base';
import styles from '../util/Style';
import CustomText from '../util/CustomText';
import MyWeb from '../util/MyWeb';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import Api from '../util/Api';
import HTML from "react-native-render-html";

export default class Result extends Component {
    constructor(props){
        super(props);
        this.state = {
          loading: false,
          grade:this.props.navigation.state.params.grade,
          topic_id:this.props.navigation.state.params.topic_id,
          lastname : this.props.navigation.state.params.lastname,
          title : this.props.navigation.state.params.title,
          user_id:'',
          saved:false
        }
    }

    saveScore()
    {
        this.setState({loading:true});
        return fetch(Api.SCORE,{
            method: "POST",
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user_id:this.state.user_id,
              score:this.state.grade,
              sub_id:this.state.topic_id,
              title: this.state.title
            })
          }).then(response => response.json()).then((server) => {
            this.setState({loading:false,saved:true});
            alert("Score saved successfully");
          })
    }


    componentDidMount()
    {
        AsyncStorage.getItem('@user').then((data) =>{
            const val = JSON.parse(data);
            console.log(val);
            this.setState({firstname:val.surname,lastname:val.lastname,user_id:val.id});
        });
    }

    render(){
        return(
            <Container>
                {
                this.state.loading?(
                    <View style={styles.ShowLoading}><Spinner color='white'/><Text style={{color:"white",fontWeight:"bold"}}>Saving... Please wait</Text></View>
                    ):<View></View>
                }
            <Header style={styles.Header}>
            <Left>
                <Button transparent onPress={() => {this.props.navigation.navigate('LessonScreen')}}>
                <Icon name='arrowleft' style={{fontSize:23,color: 'white'}} />
                </Button>
            </Left>
            <Body>
                <Title>Result & Score</Title>
            </Body>
            <Right>
                <Button transparent onPress={() => {this.props.navigation.navigate('Drawer')}}>
                <Icon name='menuunfold' style={{fontSize:23,color: 'white'}} />
                </Button>
            </Right>
            </Header>
            <View style={{margin:15,flex:1,justifyContent:"center",alignItems:"center"}}>
                {
                    this.state.grade >= 60?(
                        <View >
                            <Animatable.View animation="slideInDown" iterationCount={5} direction="alternate" style={{alignItems:"center"}}><Image style={{width:70,height:70}} source={require('./images/star.gif')}/></Animatable.View>
                            <Text style={{textAlign:"center",fontSize:30,marginBottom:15}}>CONGRATULATIONS {this.state.lastname}</Text>
                            <Text style={{textAlign:"center",fontSize:20}}>You have passed the assessment test with a grade of <Text style={{fontWeight:"bold"}}>{this.state.grade}%</Text>. Cheers </Text>

                            
                                
                                {
                                    this.state.saved?(
                                        <TouchableOpacity style={styles.buttonContainer} onPress={() => {this.props.navigation.goBack()}}>
                                        <Text style={[{fontFamily:"Roboto",textAlign: "center",color:"#FFF",fontSize:15,padding:5}]}>
                                            Saved. Go Back
                                        </Text>
                                        </TouchableOpacity>
                                    ):<TouchableOpacity style={styles.buttonContainer} onPress={() => {this.saveScore()}}><Text style={[{fontFamily:"Roboto",textAlign: "center",color:"#FFF",fontSize:15,padding:5}]}>
                                        Save Score
                                    </Text></TouchableOpacity>
                                }
                            
                        </View>
                    ):<View>
                        <Animatable.View animation="slideInDown" iterationCount={5} direction="alternate" style={{alignItems:"center"}}><Image style={{width:70,height:70}} source={require('./images/poor.png')}/></Animatable.View>
                        <Text style={{textAlign:"center",fontSize:30,marginBottom:15}}>WELL DONE {this.state.lastname}</Text>
                            <Text style={{textAlign:"center",fontSize:20}}>You have scored <Text style={{fontWeight:"bold"}}>{this.state.grade}%</Text>. We know you can do better, Keep trying to go above 60% </Text>

                            <TouchableOpacity style={styles.buttonContainer} onPress={() => {this.props.navigation.goBack()}}>
                                <Text style={[{fontFamily:"Roboto",textAlign: "center",color:"#FFF",fontSize:15,padding:5}]}>
                                            Try Again
                                </Text>
                            </TouchableOpacity>
                    </View>
                }
            </View>
            </Container>
        )
    }

}