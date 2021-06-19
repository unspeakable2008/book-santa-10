import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem, Card, Header, Icon } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
export default class RecieverDetailScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            userId:firebase.auth.currentUser.email,
            recieverId:this.props.navigation.getParam("details")["userId"],
            requestId:this.props.navigation.getParam("details")["requestId"],
            bookName:this.props.navigation.getParam("details")["bookName"],
            reason_for_requesting:this.props.navigation.getParam("details")["reasonToRequest"],
            recieverName:"",
            recieverContact:"",
            recieverAdress:"",
            recieverRequestDocId:"",
            userName:""
        }
}
getRecieverDetails(){
    db.collection('users').where('emailId','==',this.state.recieverId).get()
    .then(snapshot=>{
      snapshot.forEach(doc=>{
        this.setState({
          recieverName    : doc.data().firstName,
          recieverContact : doc.data().contact,
          recieverAddress : doc.data().address,
        })
      })
    });
  
    db.collection('requestedBooks').where('requestId','==',this.state.requestId).get()
    .then(snapshot=>{
      snapshot.forEach(doc => {
        this.setState({recieverRequestDocId:doc.id})
     })
  })}
  
  updateBookStatus=()=>{
    db.collection('allDonations').add({
      bookName           : this.state.bookName,
      requestId          : this.state.requestId,
      requestedBy        : this.state.recieverName,
      donorId            : this.state.userId,
      requestStatus      :  "Donor Interested"
    })
  }
  
  getUserDetail=(userId)=>{
    db.collection('users').where(
      "emailId","==",userId
    ).get().then((snapshot)=>{
     snapshot.forEach((doc)=>{
      this.setState({
        userName:doc.data().firstName+" "+doc.data().lastName
      })
     })
    })
  }
  
  componentDidMount(){
    this.getRecieverDetails()
  }
  
  addNotification = ()=>{
    var message = this.state.userName+" has shown interest in donating a book"
    db.collection("allNotifications").add({
    targetUserId:this.state.recieverId,
    donorId:this.state.userId,
    requestId:this.state.requestId,
      bookName:this.state.bookName,
      date:firebase.firestore.FieldValue.serverTimestamp(),
      notificationStatus:"unread",
      message:message
    })
  }
  componentDidMount(){
    this.getRecieverDetails()
    this.getUserDetails()

  }
    render(){
      return(
        <View style={styles.container}>
          <View style={{flex:0.1}}>
            <Header
              leftComponent ={<Icon name='arrow-left' type='feather' color='#696969'  onPress={() => this.props.navigation.goBack()}/>}
              centerComponent={{ text:"Donate Books", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
              backgroundColor = "#eaf8fe"
            />
          </View>
          <View style={{flex:0.3}}>
            <Card
                title={"Book Information"}
                titleStyle= {{fontSize : 20}}
              >
              <Card >
                <Text style={{fontWeight:'bold'}}>Name : {this.state.bookName}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>Reason : {this.state.reason_for_requesting}</Text>
              </Card>
            </Card>
          </View>
          <View style={{flex:0.3}}>
            <Card
              title={"Reciever Information"}
              titleStyle= {{fontSize : 20}}
              >
              <Card>
                <Text style={{fontWeight:'bold'}}>Name: {this.state.recieverName}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>Contact: {this.state.recieverContact}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>Address: {this.state.recieverAddress}</Text>
              </Card>
            </Card>
          </View>
          <View style={styles.buttonContainer}>
            {
              this.state.recieverId !== this.state.userId
              ?(
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                      this.updateBookStatus()
                      this.addNotification()
                      this.props.navigation.navigate('MyDonations')
                    }}>
                  <Text>I want to Donate</Text>
                </TouchableOpacity>
              )
              : null
            }
          </View>
        </View>
      )
    }
  
  }
  
  
  const styles = StyleSheet.create({
    container: {
      flex:1,
    },
    buttonContainer : {
      flex:0.3,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:200,
      height:50,
      justifyContent:'center',
      alignItems : 'center',
      borderRadius: 10,
      backgroundColor: 'orange',
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       },
      elevation : 16
    }
  })
