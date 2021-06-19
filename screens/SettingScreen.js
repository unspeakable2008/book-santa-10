import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Alert, ToastAndroid, FlatList, Modal, ScrollView} from 'react-native';
import firebase from "firebase"
import db from "../config"
import MyHeader from "../components/MyHeader"
export default class SettingScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            emailId:"",
            firstName:"",
            lastName:"",
            address:"",
            contact:"",
           docId:""
                    }
    }
    getUserDetails=()=>{
        var email = firebase.auth().currentUser.email
        db.collection("users").where("emailId","==",email).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var data = doc.data()
                this.setState({
                    emailId:data.emailId,
                    firstName:data.firstName,
                    lastName:data.lastName,
                    address:data.address,
                    contact:data.contact,
                    docId:doc.id
                })
            })
        })
    }
updateUserDetails = ()=>{
    db.collection("users").doc(this.state.docId).update({
        firstName:this.state.firstName,
            lastName:this.state.lastName,
            contact:this.state.contact,
            address:this.state.address
    })
    Alert.alert("profile updated succesfully")
}
componentDidMount(){
    this.getUserDetails()
}
render(){
    return(
        <View style = {styles.container}>
            <MyHeader title = "settings" navigation = {this.props.navigation}>
                
            </MyHeader>
            <View style = {styles.formContainer}>
                <TextInput style = {styles.formTextInput} placeholder={"firstName"} maxLength = {8}  onChangeText = {(text)=>{
                  this.setState({
                    firstName:text
                  })
                }}></TextInput>
                <TextInput style = {styles.formTextInput} placeholder={"lastName"} maxLength = {8}  onChangeText = {(text)=>{
                  this.setState({
                    lastName:text
                  })
                }}></TextInput>
                <TextInput style = {styles.formTextInput} placeholder={"contact"} maxLength = {10}  onChangeText = {(text)=>{
                  this.setState({
                    contact:text
                  })
                }} keyboardType = "numeric"></TextInput>
                <TextInput style = {styles.formTextInput} placeholder={"address"} multiline = {true}  onChangeText = {(text)=>{
                  this.setState({
                    address:text
                  })
                }}></TextInput>
            <TouchableOpacity style = {styles.button} onPress = {()=>{
                this.updateUserDetails()
            }}>
                <Text style = {styles.buttonText}>save</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}
}
const styles = StyleSheet.create({
    container : {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    formContainer:{
      flex:1,
      width:'100%',
      alignItems: 'center'
    },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
      width:"75%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
    },
    buttonText:{
      fontSize:25,
      fontWeight:"bold",
      color:"#fff"
    }
  })
  