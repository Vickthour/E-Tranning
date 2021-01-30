import React, {Component} from 'react';
import {StyleSheet,
ScrollView,Dimensions,Text,ActivityIndicator,TouchableOpacity,TextInput,View,Image,StatusBar,Modal,ImageBackground,
KeyboardAvoidingView} from 'react-native';
import {AsyncStorage} from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/Feather';
import {Toast,Container,Button,Content,Root,List,Card,Spinner, CardItem, ListItem, Thumbnail, Header, Left, Body, Right, Title, Subtitle } from 'native-base';
import styles from '../util/Style';
import Api from '../util/Api';


export default class Lesson extends Component {
    constructor(props){
        super(props);
        this.state = {
          greeting: "Hi User",
          course_id : this.props.navigation.state.params.course_id,
          ins_name : this.props.navigation.state.params.ins,
          topicList: [],
          loading: true
        }
    }

    fetchTopic = (id) => {
      return fetch(Api.TOPICS,{
        method: "POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id:id
        })
      }).then(response => response.json()).then((server) => {
        this.setState({loading:false,topicList: server.data});
        console.log(server);
      })
    }

    componentDidMount()
    {
      this.fetchTopic(this.state.course_id);
    }

    render(){
      let TopicList = this.state.topicList.map((data) => {
        return(
            <TouchableOpacity key={data.id} onPress={() =>{ this.props.navigation.navigate('VideoScreen',{
              topic_id: data.id,ins:this.state.ins_name,title:data.subject
            }) } } style={styles.coursePanel}>
                    <Text style={styles.courseIcon}><Icon name='book' style={{fontSize:30,color: '#009631'}} /></Text>
                    <Text style={styles.courseTitle}>
                      {data.subject}
                    </Text>   
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
            <Button transparent onPress={() => {this.props.navigation.navigate('Courses')}}>
              <Icon name='arrowleft' style={{fontSize:23,color: 'white'}} />
            </Button>
          </Left>
          <Body>
            <Title>Course Contents </Title>
          </Body>
          <Right>
            <Button transparent>
              
            </Button>
          </Right>
        </Header>
         <ScrollView>
          {TopicList}
       </ScrollView>
      </Container>
        )
    }
}