import React, {Component} from 'react';
import {StyleSheet,
ScrollView,Dimensions,Text,ActivityIndicator,TouchableOpacity,TextInput,View,Image,StatusBar,Modal,ImageBackground,
KeyboardAvoidingView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/Feather';
import {Toast,Container,Button,Content,Root,List,Card,Spinner, CardItem, ListItem, Thumbnail, Header, Left, Body, Right, Title, Subtitle } from 'native-base';
import styles from '../util/Style';
import {retrieve} from '../util/Storage';

export default class Home extends Component {
    constructor(){
        super();
        this.state = {
          greeting: "Hi User",
          firstname: '',
          lastname: '',
          matric:''
        }
    }

    componentDidMount(){
      AsyncStorage.getItem('@user').then((data) =>{
        const val = JSON.parse(data);
        this.setState({firstname:val.surname,lastname:val.lastname,matric:val.matric_no});
      }); 
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
            <Title>Dashboard</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => {AsyncStorage.clear(); this.props.navigation.navigate('Auth')}}>
              <Icon name='poweroff' style={{fontSize:23,color: 'red'}} />
            </Button>
          </Right>
        </Header>
        
         <View style={styles.welcomePanel}>
        <Text style={styles.welcomePanelText}>Welcome, {this.state.lastname} {this.state.firstname} - {this.state.matric} </Text>
         </View>

         <View style={styles.menuPanel}>
          <View style={styles.menuItemPanel}>
            <TouchableOpacity  style={styles.menuItem} onPress={() =>{ this.props.navigation.navigate('Courses')} }>
              <Image style={styles.icon} source={require('./images/video.png')}/>
              <Text style={styles.menuItemText}>Vocations</Text>
            </TouchableOpacity >
          </View>
          <View style={styles.menuItemPanel}>
            <TouchableOpacity  style={styles.menuItem} onPress={() =>{this.props.navigation.navigate('Test')} }>
              <Image style={styles.icon} source={require('./images/exam.png')}/>
              <Text style={styles.menuItemText}>Vocational Assignment</Text>
            </TouchableOpacity >
          </View>
          <View style={styles.menuItemPanel}>
            <TouchableOpacity  style={styles.menuItem} onPress={() =>{this.props.navigation.navigate('MessageScreen')} }>
              <Image style={styles.icon} source={require('./images/mail.png')}/>
              <Text style={styles.menuItemText}>Notifications</Text>
            </TouchableOpacity >
          </View>
          <View style={styles.menuItemPanel}>
            <TouchableOpacity  style={styles.menuItem} onPress={() =>{this.props.navigation.navigate('Profile')} }>
              <Image style={styles.icon} source={require('./images/man.png')}/>
              <Text style={styles.menuItemText}>Student Profile</Text>
            </TouchableOpacity >
          </View>
         </View>

    
      </Container>
        )
    }
}