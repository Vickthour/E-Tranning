import React, {Component} from 'react';
import {StyleSheet,
ScrollView,Dimensions,Text,ActivityIndicator,TouchableOpacity,TextInput,View,Image,StatusBar,Modal,ImageBackground,
KeyboardAvoidingView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/Ionicons';
import {Toast,Container,Button,Content,Root,List,Card,Spinner, CardItem, ListItem, Thumbnail, Header, Left, Body, Right, Title, Subtitle } from 'native-base';
import styles from '../util/Style';

export default class Profile extends Component {
    constructor(){
        super();
        this.state = {
          greeting: "Hi User",
          lastname:'',
          firstname:'',
          matric:''
        }

      this.profileImage = "https://user.marks222.com/uploads/editors/default-avatar.png";
    }

    componentDidMount()
    {
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
            <Title>My Profile</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='inbox' style={{fontSize:23,color: 'white'}} />
            </Button>
          </Right>
        </Header>
        <View style={styles.profilePage}>
            <View>
              <Image
                  source={{ uri: this.profileImage }}
                  style={styles.profileImage}
                />
            </View>
            <View style={styles.ProfileMeta}>
        <Text style={styles.text}>{this.state.lastname} {this.state.firstname}</Text>
              <Text style={styles.text_sm}>Computer Science, HND 2</Text>
        <Text style={styles.text_bold}>{this.state.matric}</Text>
            </View>
        </View>
      </Container>
        )
    }
}