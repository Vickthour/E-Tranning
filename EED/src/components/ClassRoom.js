import React, {Component} from 'react';
import {StyleSheet,
ScrollView,Dimensions,Text,ActivityIndicator,TouchableOpacity,TextInput,View,Image,StatusBar,Modal,ImageBackground,
KeyboardAvoidingView,useWindowDimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/Feather';
import {Toast,Container,Button,Content,Root,List,Card,Spinner,ActionSheet, CardItem, ListItem, Thumbnail, Header, Left, Body, Right, Title, Subtitle } from 'native-base';
import styles from '../util/Style';
import CustomText from '../util/CustomText';
import MyWeb from '../util/MyWeb';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import Video from 'react-native-video-controls';
import Api from '../util/Api';
import YouTube from 'react-native-youtube';
import HTML from "react-native-render-html";
import { WebView } from 'react-native-webview';

export default class ClassRoom extends Component {
    constructor(props){
        super(props);
        var ID;
        this.state = {
          greeting: "Hi User",
          topic_id : this.props.navigation.state.params.topic_id,
          ins : this.props.navigation.state.params.ins,
          title:this.props.navigation.state.params.title,
          contentData: [],
          loading: true,
          link: '',
          content:'',
          error:'',
          visible:false,
          message:'',
          sub_id: '',
          comments:[],
          firstname:'',
          lastname:'',
          VIDEOLINK:'',
          ID:''
        }
    }
    

    autoFetch()
    {
      return fetch(Api.COMMENTFT,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          comment:'fetch',
          topic_id: this.state.topic_id
        })
      }).then(response => response.json()).then((server) => {
        this.setState({comments:server.data});
       
      })
    }

    sendComment()
    {
      const {firstname,lastname} = this.state;
      const fname = lastname + " " + firstname;
      return fetch(Api.COMMENT,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          comment:this.state.message,
          user_id: fname,
          sub_id: this.state.topic_id
        })
      }).then(response => response.json()).then((server) => {
        alert("Comment Sent");
        this.setState({visible:false});
        this.autoFetch();
      })
    }

    fetchContent(id)
    {
      var ID = this.ID;
      return fetch(Api.CONTENT,{
        method: "POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          topic_id:id
        })
      }).then(response => response.json()).then((server) => {
        this.setState({
            loading:false,
            contentData: server.data, 
            link:server.data.video_link,
            content:server.data.subject_content,
            sub_id:server.data.id
          },() => {
            this.ID = "https://toptechng.net/etutor/video.html?videoId="+this.state.link;
            console.log(this.ID);
          });
      })
    }

    componentDidMount()
    {
      this.autoFetch();
      this.fetchContent(this.state.topic_id);
      AsyncStorage.getItem('@user').then((data) =>{
        const val = JSON.parse(data);
        this.setState({firstname:val.surname,lastname:val.lastname});
      });
      
    }

    render(){
    
    const commentList = this.state.comments.map((data) => {
      return(
        <View style={{display:"flex",flexDirection:"row",justifyContent:"flex-start",marginBottom:15}}>
          <Image source={require("./images/man.png")} style={{width:30,height:30}}/>
          <View style={{marginLeft:15,marginRight:15,width:"80%"}}>
          <Text style={{fontSize:13,fontWeight:"bold",color:"green"}}>{data.user_id}</Text>
          <Text style={{fontSize:11,fontWeight:"bold",color:"#777"}}>{data.created_at}</Text>
          <Text style={{fontSize:14,color:"#000",textAlign:"justify"}}>{data.comment}</Text>
          </View>
        </View>
      )
    })
      const {link,content }= this.state;
      
      
     
      {
				this.state.loading?(
					<View style={styles.ShowLoading}><Spinner color='white'/><Text style={{color:"white",fontWeight:"bold"}}>Loading... Please wait</Text></View>
                    ):<View></View>
        }
        return(
        <Root>
        <Container>
        <Header style={styles.Header}>
          <Left>
            <Button transparent onPress={() => {this.props.navigation.navigate('LessonScreen')}}>
              <Icon name='arrowleft' style={{fontSize:23,color: 'white'}} />
            </Button>
          </Left>
          <Body>
            <Title>Classroom</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => {this.props.navigation.navigate('Drawer')}}>
              <Icon name='menuunfold' style={{fontSize:23,color: 'white'}} />
            </Button>
          </Right>
        </Header>
        <View style={{flex:1}}>
        
         <View style={styles.messagePanel}>
            <Text style={styles.pageTitle}><Icon name='solution1' style={{fontSize:25,color: 'black'}} />
            {this.state.title}
            </Text>
            <Text>{this.state.ins}</Text>
         </View>

         <View style={styles.videoPanel}>
            <View style={styles.videoContainer}>
            <WebView
                    ref={this.webViewRef}
                    allowsFullscreenVideo
                    useWebKit
                    onLoad={this.webViewLoaded}
                    allowsInlineMediaPlayback
                    mediaPlaybackRequiresUserAction
                    javaScriptEnabled
                    scrollEnabled={false}
                    source={{ uri: this.ID }}
                    style={styles.defaultStyle}
                  />
            </View>
          </View>

          <ScrollView style={{ flex: 1,margin:15,height:"100%" }}>
            <HTML html={content} contentWidth={100} />
            {/* Action Button for Comment and Quiz */}
    
          <View style={styles.classroom_footer}>
          <Text style={styles.text_bold_lf}>Comments</Text>
           {commentList}
          <TouchableOpacity style={styles.buttonContainer} onPress={ () => { this.setState({visible:true}) } }>
				
								<Text style={[{fontFamily:"Roboto",textAlign: "center",color:"#FFF",fontSize:15,padding:5}]}>
								 Write Comments 
								</Text>
							
					</TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={ () => { this.props.navigation.navigate('QuizScreen',{
            title:this.state.title,topic_id:this.state.topic_id
          }) } }>
				
								<Text style={[{fontFamily:"Roboto",textAlign: "center",color:"#FFF",fontSize:15,padding:5}]}>
								 Take Assessment 
								</Text>
							
					</TouchableOpacity>
     
          </View>
          </ScrollView>
            

          
         </View>
         {
           this.state.visible?(
            <View style={styles.mymodal}>
              <Text style={styles.text_bold_lf}>Message:</Text>
              <TextInput
                  style={styles.feedback}
                  editable
                  maxLength={160}
                  multiline
                  placeholder="Type your message here"
                  autoCorrect={true}
                  blurOnSubmit={true}
                  placeholderTextColor="#ccc"
                  onChangeText={(TextInput) => this.setState({message: TextInput})}
                  style={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#000000',
                      borderWidth: 1,
                  }}
              />
              <TouchableOpacity style={styles.buttonContainer} onPress={ () => { this.sendComment() } }>
              <Text style={[{fontFamily:"Roboto",textAlign: "center",color:"#FFF",fontSize:15,padding:5}]}>
								 Submit 
								</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer2} onPress={ () => { this.setState({visible:false}, () =>{
                this.forceUpdate()
              }) } }>
              <Text style={[{fontFamily:"Roboto",textAlign: "center",color:"red",fontSize:20,padding:5,fontWeight:"bold"}]}>
								 Close 
								</Text>
              </TouchableOpacity>
            </View>
           ):<Text></Text>
         }
         
      </Container>
      </Root>
        )
    }
}