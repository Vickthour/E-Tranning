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

export default class Quiz extends Component {
    constructor(props){
        super(props);
        this.state = {
          loading: true,
          visible:false,
          firstname:'',
          lastname:'',
          title:this.props.navigation.state.params.title,
          topic_id : this.props.navigation.state.params.topic_id,
          quiz:[],
          count: 1,
          selectedA: 0,
          selectedB: 0
        }
    }

    fetchQuiz()
    {
        return fetch(Api.QUIZ,{
          method: "POST",
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            topic_id:this.state.topic_id
          })
        }).then(response => response.json()).then((server) => {
          this.setState({loading:false,quiz: server.data});
          console.log(server);
        })
    }

    Grade(selectedOption,answer,id)
    {
       
            if(selectedOption == answer)
            {
                this.setState({count:this.state.count +1});
                console.log(this.state.count);
            }  
    }

    showResult()
    {
        if(this.state.count == 1){
            alert("You need to pick your answers before you continue");
            return false;
        }
        const {count} = this.state;
        const total = 5;
        const grade = ((this.state.count) * 100)/ (5);
        this.setState({count:0},() => {
            this.props.navigation.navigate('ResultScreen',{grade:grade,lastname:this.state.lastname,topic_id:this.state.topic_id,title:this.state.title})
        }
            
        );

    }

    componentDidMount()
    {
        this.fetchQuiz();
        AsyncStorage.getItem('@user').then((data) =>{
            const val = JSON.parse(data);
            this.setState({firstname:val.surname,lastname:val.lastname});
        });
    }

    render(){
        const Quiz = this.state.quiz.map((data,id) => {
            return(
                <View key={data.id} style={{marginTop:15}}>
                    <Text style={{fontSize:18,fontWeight:"bold"}}>{id+1} - {data.question}</Text>
                    <View>
                    <ListItem onPress={() => { this.Grade(data.optA,data.ans,id)}}>
                    <Left>
                        <Text>{data.optA}</Text>
                    </Left>
                    <Right>
                     
                         <Icons name='circle' style={{fontSize:23,color: 'black'}} /> 
                           
                    </Right>
                    </ListItem>
                    <ListItem onPress={() => {this.Grade(data.optB,data.ans,id)}}>
                    <Left>
                        <Text>{data.optB}</Text>
                    </Left>
                    <Right>
                       <Icons name='circle' style={{fontSize:23,color: 'black'}} /> 
                    </Right>
                    </ListItem>
                    </View>
                </View>
            )
        })
        return(
            <Container>
            <Header style={styles.Header}>
            <Left>
                <Button transparent onPress={() => {this.props.navigation.navigate('LessonScreen')}}>
                <Icon name='arrowleft' style={{fontSize:23,color: 'white'}} />
                </Button>
            </Left>
            <Body>
                <Title>Quiz & Assessment</Title>
            </Body>
            <Right>
                <Button transparent onPress={() => {this.props.navigation.navigate('Drawer')}}>
                <Icon name='menuunfold' style={{fontSize:23,color: 'white'}} />
                </Button>
            </Right>
            </Header>
            <View style={{margin:15,flex:1}}>
                <Text style={{fontSize:18,fontWeight:"bold"}}>Title: {this.state.title}</Text>
                <Text style={{fontSize:15,fontStyle:"italic"}}>Instruction: All questions must be answered correctly</Text>
                <Text style={{fontSize:15,fontWeight:"bold"}}>Pass Mark: 60%</Text>
                <Text style={{fontWeight:"bold",fontSize:20,marginTop:10}}>QUESTIONS</Text>
                <ScrollView>   
                    {Quiz}

                    <TouchableOpacity style={styles.buttonContainer} onPress={() => {this.showResult()}}>
                    <Text style={[{fontFamily:"Roboto",textAlign: "center",color:"#FFF",fontSize:15,padding:5}]}>
								 Submit & Grade 
					</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            </Container>
        )
    }

}