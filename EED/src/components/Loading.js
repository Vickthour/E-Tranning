import React, {Component} from 'react';
import {StyleSheet,
ScrollView,Dimensions,Text,ActivityIndicator,TouchableOpacity,TextInput,View,Image,StatusBar,Modal,ImageBackground,
KeyboardAvoidingView} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { Ionicons } from 'react-native-vector-icons';
import { Icon,Toast,Container,Button,Content,Root,List,Card,Spinner, CardItem, ListItem, Thumbnail, Header, Left, Body, Right, Title, Subtitle } from 'native-base';
import Colors from '../util/Colors';
import styles from '../util/Style';

export default class Loading extends Component {
    constructor(){
        super();
        this.state = {
        	greeting: "Hi User"
        }
    }

    render(){
    	return(
    		<View style={styles.Loading}>
             
                <Animatable.View animation="fadeIn">
                  <View>
                    <Image style={{width:200,height:200}} source={require("./images/logo.png")}/>
                  </View>
                     
                </Animatable.View>
              
            </View>
    	)
    }
}
