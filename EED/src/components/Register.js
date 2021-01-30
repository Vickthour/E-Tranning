import React, {Component} from 'react';
import {StyleSheet,
ScrollView,Dimensions,Text,ActivityIndicator,TouchableOpacity,TextInput,View,Image,StatusBar,Modal,ImageBackground,
KeyboardAvoidingView} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/AntDesign';
import { Toast,Container,Button,Content,Root,List,Card,Spinner, CardItem, ListItem, Thumbnail, Header, Left, Body, Right, Title, Subtitle } from 'native-base';
import styles from '../util/Style';
import Api from '../util/Api';
import {store} from '../util/Storage';



export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email:'',
            password:'',
            matric:'',
            ActivityLoader: false,
			loading:false
          }
    }

    clearText(fieldName) {
        this.refs[fieldName].setNativeProps({text: ''});
    }

    gotoLogin()
    {
        this.props.navigation.navigate('LoginScreen');
    }

    create = () =>{
        
        const {firstname,lastname,email,matric,password} = this.state;
        if(firstname !== ''){
			if(lastname !== ''){
                if(matric !== ''){
                    if(password !== ''){
                        if(email !== ''){
                            this.setState({loading:true});
                            return fetch(Api.REGISTER,{
                                method:"POST",
                                header:{
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    matric: matric,
                                    password: password,
                                    email: email,
                                    lastname:lastname,
                                    firstname: firstname
                                })
                            }).then(response => response.json()).then((server) => {
                                if(server.status == 200)
                                {
                                    this.forceUpdate();
                                    this.setState({loading:false});
                                    alert("Registration successful. You may now login");
                                    this.props.navigation.navigate('LoginScreen');
                                }else if(server.status == 600){
                                    this.setState({loading:false});
                                    alert("Email/Matric already associated with an account.");
                                }else if(server.status == 500)
                                {
                                    this.setState({loading:false});
                                    alert("Error creating account. Try again");
                                }else{
                                    this.setState({loading:false});
                                    alert("Error due to unknown error");
                                }
                            });
                        }else{
                            alert("Email Address is missing.");
                        }
                    }else{
                        alert("Password is missing");
                    }
                }else{
                    alert("Student ID is missing");
                }
            }else{
                alert("Last Name is missing");
            }
        }else{
            alert("First Name is missing");
        }
    }

    render(){
        return(
		<Container>
			 {
				this.state.loading?(
					<View style={styles.ShowLoading}><Spinner color='white'/><Text style={{color:"white",fontWeight:"bold"}}>Loading... Please wait</Text></View>
				):<Text></Text>
			}
				
				<View style={styles.center}>
					<Text style={styles.headerText}>Become a user</Text>
                    <Text style={{color:"#333",fontStyle:"italic"}}>All fields must be filled</Text>
				</View>
		
				<View style={styles.bottom}>
				<KeyboardAvoidingView behavior={"height"}  style={styles.container}>
                        <TextInput
							style={styles.inputbox}
							placeholder="First Name"
							returnKeyType="go"
							autoCapitalize="none"
							blurOnSubmit={true}
							ref={(input) => this.firstnameInput = input}
							placeholderTextColor="#ccc"
							name="firstname"
							onChangeText={(TextInput) => this.setState({firstname: TextInput})}
						/>
                        <TextInput
							style={styles.inputbox}
							placeholder="Last Name"
							returnKeyType="go"
							autoCapitalize="none"
							blurOnSubmit={true}
							ref={(input) => this.lastnameInput = input}
							placeholderTextColor="#ccc"
							name="lastname"
							onChangeText={(TextInput) => this.setState({lastname: TextInput})}
						/>
						<TextInput
							style={styles.inputbox}
							placeholder="H/CS/00/0000"
							returnKeyType="next"
							autoCapitalize="none"
							autoCorrect={false}
							
							placeholderTextColor="#ccc"
							name="matric"
							keyboardType="email-address"
							blurOnSubmit={true}
							onChangeText={(TextInput) => this.setState({matric: TextInput})}
						/>

                        <TextInput
							style={styles.inputbox}
							placeholder="Password"
							returnKeyType="go"
							autoCapitalize="none"
							secureTextEntry
							blurOnSubmit={true}
							ref={(input) => this.passwordInput = input}
							placeholderTextColor="#ccc"
							name="password"
							onChangeText={(TextInput) => this.setState({password: TextInput})}
						/>

                        <TextInput
							style={styles.inputbox}
							placeholder="abc@example.com"
							returnKeyType="next"
							autoCapitalize="none"
							autoCorrect={false}
							
							placeholderTextColor="#ccc"
							name="email"
							keyboardType="email-address"
							blurOnSubmit={true}
							onChangeText={(TextInput) => this.setState({email: TextInput})}
						/>

						
				
						<TouchableOpacity style={styles.buttonContainer} onPress={ this.create }>
							<Text style={{fontFamily:"Roboto",textAlign: "center",color:"#FFF",fontSize:22}}> 
                                REGISTER <Icon style={{fontSize: 23, color: 'white'}} name="rightcircle"/>
                            </Text>
						</TouchableOpacity>

                    
					</KeyboardAvoidingView> 
				</View>  
			</Container>
        )
    }
}