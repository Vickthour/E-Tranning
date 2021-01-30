import React, {Component} from 'react';
import {StyleSheet,
ScrollView,Dimensions,Text,ActivityIndicator,TouchableOpacity,TextInput,View,Image,StatusBar,Modal,ImageBackground,
KeyboardAvoidingView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/AntDesign';
import { Toast,Container,Button,Content,Root,List,Card,Spinner, CardItem, ListItem, Thumbnail, Header, Left, Body, Right, Title, Subtitle } from 'native-base';
import styles from '../util/Style';
import Api from '../util/Api';
import {store} from '../util/Storage';



export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            matric: '',
            password: '',
            ActivityLoader: false,
            anotherip: '',
			URL:'',
			loading:false
		  }  
	}
	
	doLogin = () => {
		const {matric,password} = this.state;
		if(matric !== ''){
			if(password !== ''){
				this.setState({loading:true});
				return fetch(Api.LOGIN,{
					method: "POST",
					headers:{
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						matric: matric,
						password:password
					})
				}).then((response) => response.json() ).then( (server) => {
					if(server.status == 200)
					{
						this.setState({loading:false});
						alert(server.message);
						const storeData = async (value) => {
							try {
							  const jsonValue = JSON.stringify(value)
							  await AsyncStorage.setItem('@user', jsonValue)
							} catch (e) {
							  // saving error
							}
						  }
						//AsyncStorage.setItem('@user',server.data);
						storeData(server.data);
						this.props.navigation.navigate('App');
					}else if(server.status == 404 )
					{
						this.setState({loading:false});
						alert(server.message);
					}else{
						this.setState({loading:false});
						alert('Error connecting due to poor network')
					}
				}).catch((err) => {
					this.setState({loading:false});
					alert(err.toString());
				})
			}else{
				alert("Enter your password");
			}
		}else{
			alert("Enter your Student ID");
		}
		
	}

    render(){
        return(
		
		
		<Container>
			
			 {
				this.state.loading?(
					<View style={styles.ShowLoading}><Spinner color='white'/><Text style={{color:"white",fontWeight:"bold"}}>Authenticating... Please wait</Text></View>
				):<Text></Text>
			}
				<View style={styles.top}>
					<Image style={styles.image} source={require('./images/logo.png')} />
					<Text style={{fontWeight:"bold",fontSize:25,marginTop:10,color:"#000"}}>FPI Mobile EED App</Text>
				</View>
				<View style={styles.center}>
					<Text style={styles.logintext}>Students' Login</Text>
				</View>
		        
				<View style={styles.bottom}>
				<KeyboardAvoidingView behavior={"height"}  style={styles.container}>
						<TextInput
							style={styles.inputbox}
							placeholder="H/CS/00/0000"
							returnKeyType="next"
							autoCapitalize="none"
							autoCorrect={false}
							
							placeholderTextColor="#ccc"
							name="username"
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

						<View style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>

							<TouchableOpacity style={{marginTop:35}}>
								<Text style={{fontSize:16,fontWeight:'600'}}>Forget Password..?</Text>
							</TouchableOpacity>
					
							<TouchableOpacity style={styles.buttonContainerLogin} onPress={ this.doLogin }>
								{
								this.state.ActivityLoader ?(
									<Text style={[{fontFamily:"Roboto",textAlign: "center",color:"#FFF",fontSize:22}]}>
										<Icon style={{fontSize: 23, color: 'white'}} name="clockcircle"/> PLEASE WAIT 
									</Text>
									): <Text style={{fontFamily:"Roboto",textAlign: "center",color:"#FFF",fontSize:22}}><Icon style={{fontSize: 23, color: 'white'}} name="rightcircle"/></Text>

								}
							</TouchableOpacity>

						

						</View>

						
					</KeyboardAvoidingView> 
				
				</View> 
				
		
			</Container>
			
		
        )
    }
}