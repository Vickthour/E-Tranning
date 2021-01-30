import React, {Component} from 'react';
import {StyleSheet,
ScrollView,Dimensions,Text,ActivityIndicator,TouchableOpacity,TextInput,View,Image,StatusBar,Modal,ImageBackground,
KeyboardAvoidingView} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/Feather';
import {Toast,Container,Button,Content,Root,List,Card,Spinner, CardItem, ListItem, Thumbnail, Header, Left, Body, Right, Title, Subtitle } from 'native-base';
import styles from '../util/Style';
import Api from '../util/Api';

export default class Courses extends Component {
    constructor(){
        super();
        this.state = {
            greeting: "Hi User",
            courses: [],
            loading:true
        }
    }

    FetchCourses = () => {
        this.setState({loading:true});
        return fetch(Api.COURSES,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                action:'fetch'
            })
        }).then(response => response.json()).then((server) => {
            this.setState({loading:false,courses:server.data});
            console.log(server);
        })
    }

    componentDidMount()
    {
        this.FetchCourses()
    }

    render(){
        let CourseList = this.state.courses.map((data) => {
            return(
                <TouchableOpacity key={data.course_id} onPress={() =>{ this.props.navigation.navigate('LessonScreen',{
                    course_id: data.course_id,ins: data.course_lecturer
                }) } } style={styles.coursePanel}>
                        <Text style={styles.courseIcon}><Icon name='book' style={{fontSize:30,color: '#009631'}} /></Text>
                        <View>
                        <Text style={styles.courseTitle}>
                          {data.course_title}
                        </Text> 
                         <Text style={styles.courseTitleLead}>Instructor: {data.course_lecturer}</Text>
                        </View>
                          
                </TouchableOpacity>
            )
        })
        return(
            <Container>
                {
				this.state.loading?(
					<View style={styles.ShowLoading}><Spinner color='white'/><Text style={{color:"white",fontWeight:"bold"}}>Loading... Please wait</Text></View>
                    ):<View></View>
                }
                <Header style={styles.Header}>
                    <Left>
                        <Button transparent onPress={() => {this.props.navigation.toggleDrawer()}}>
                        <Icon name='menuunfold' style={{fontSize:23,color: 'white'}} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>My Courses</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                        <Icon name='inbox' style={{fontSize:23,color: 'white'}} />
                        </Button>
                    </Right>
                </Header>

                <ScrollView>
                     
                     {CourseList}

                </ScrollView>
            </Container>
        )
    }
}