import React, {Component} from 'react';
import {StyleSheet,
ScrollView,Dimensions,Text,ActivityIndicator,TouchableOpacity,TextInput,View,Image,StatusBar,Modal,ImageBackground,
KeyboardAvoidingView,AsyncStorage} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/Ionicons';
import {Toast,Container,Button,Content,Root,List,Card,Spinner, CardItem, ListItem, Thumbnail, Header, Left, Body, Right, Title, Subtitle } from 'native-base';
import styles from '../util/Style';

export default class Feedback extends Component {
    constructor(){
        super();
        this.state = {
        	greeting: "Hi User",
            message: "",
            ActivityLoader: false
        }
    }
    sendfeedback = () => {
        this.setState({ActivityLoader:true})
        const {message} = this.state;
        alert("Message Sent")
        this.setState({ActivityLoader:false})
        //this.props.navigation.navigate('App');
    }
    render(){
        return(
            <Container>
                <Header style={styles.Header}>
                    <Left>
                        <Button transparent onPress={() => {this.props.navigation.toggleDrawer()}}>
                        <Icon name='menuunfold' style={{fontSize:23,color: 'white'}} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Send Feedback</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                        <Icon name='inbox' style={{fontSize:23,color: 'white'}} />
                        </Button>
                    </Right>
                </Header>
                <View style={styles.feedbackPage}>
                    <Text style={styles.feedbackMsg}>Send feedback if you encounter any problem using the system,we will be glad to receive your responses.</Text>
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
                    <TouchableOpacity style={styles.feedbackBtn} onPress={ this.sendfeedback }>
                            {
                            this.state.ActivityLoader ?(
                                <Text style={[{fontFamily:"Roboto",textAlign: "center",color:"#FFF",fontSize:22}]}>
                                    <Icon style={{fontSize: 23, color: 'white'}} name="clockcircle"/> PLEASE WAIT 
                                </Text>
                                ): <Text style={{fontFamily:"Roboto",textAlign: "center",color:"#FFF",fontSize:22}}> SUBMIT <Icon style={{fontSize: 23, color: 'white'}} name="rightcircle"/></Text>
                            }
                    </TouchableOpacity>
                </View>
          </Container>
        )
    }
}