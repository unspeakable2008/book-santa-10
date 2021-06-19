import React ,{Component} from 'react'
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet} from 'react-native';
import {Card,Icon,ListItem} from 'react-native-elements'
import MyHeader from '../components/MyHeader.js'
import firebase from 'firebase';
import db from '../config.js'

export default class MyDonationScreen extends Component {
  static navigationOptions = { header: null };

   constructor(){
     super()
     this.state = {
       userId : firebase.auth().currentUser.email,
       allDonations : [],
       donorName:""
     }
     this.requestRef= null
   }
   geDonorDetails=(userId)=>{
    db.collection('users').where(
      "emailId","==",userId
    ).get().then((snapshot)=>{
     snapshot.forEach((doc)=>{
      this.setState({
        donorName:doc.data().firstName+" "+doc.data().lastName
      })
     })
    })
  }
  
   sendBook = (bookDetails)=>{
  if(bookDetails.requestStatus == "Book Sent"){
    var requestStatus = "Donor Interested"
    db.collection("allDonations").doc(bookDetails.docId).update({
      requestStatus:("Donor Interested")
    })
    this.sendNotification(bookDetails,requestStatus)  
  }
else{
  var requestStatus = "Book Sent"
  db.collection("allDonations").doc(bookDetails.docId).update({
    requestStatus:("Book Sent")
  })
  this.sendNotification(bookDetails,requestStatus)
}
}
sendNotification = (bookDetails,requestStatus)=>{
  var requestId = bookDetails.requestId;
  var donorId = bookDetails.donorId

  db.collection("allNotifications").where("requestId","==",requestId).where("donorId","==",donorId).get().then((snapshot)=>{
    snapshot.forEach((doc)=>{
      var message = ""
      if (requestStatus=="Book Sent"){
        message = this.state.donorName+" Sent You The Book "
      }
      else{
        message = this.state.donorName+" Has Shown Interest In Donating The Book"
      }
      db.collection("allNotifications").doc(doc.id).update({
        message:message,
        notificationStatus:"unread",
        date:firebase.firestore.FieldValue.serverTimestamp()
      })
    })
  })
}
   getAllDonations =()=>{
     this.requestRef = db.collection("allDonations").where("donorId" ,'==', this.state.userId)
     .onSnapshot((snapshot)=>{
       var allDonations = snapshot.docs.map(document => document.data());
       this.setState({
         allDonations : allDonations,
       });
     })
   }

   keyExtractor = (item, index) => index.toString()

   renderItem = ( {item, i} ) =>(
     <ListItem
       key={i}
       bottomDivider>
           <ListItem.Content>
      <ListItem.Title>{item.bookName}</ListItem.Title>
       <ListItem.Subtitle>{"Requested By : " + item.requestedBy +"\nStatus : " + item.requestStatus}</ListItem.Subtitle>
       <Icon name="book" type="font-awesome" color ='#696969'/>
           <TouchableOpacity style={styles.button} onPress = {()=>{
             this.sendBook(Item)
           }}>
             <Text style={{color:'#ffff'}}>Send Book</Text>
           </TouchableOpacity>      </ListItem.Content>
      </ListItem>
   )


   componentDidMount(){
     this.getAllDonations(),
     this.getDonorDetails()
   }

   componentWillUnmount(){
     this.requestRef();
   }

   render(){
     return(
       <View style={{flex:1}}>
         <MyHeader navigation={this.props.navigation} title="My Donations"/>
         <View style={{flex:1}}>
           {
             this.state.allDonations.length === 0
             ?(
               <View style={styles.subtitle}>
                 <Text style={{ fontSize: 20}}>List of all book Donations</Text>
               </View>
             )
             :(
               <FlatList
                 keyExtractor={this.keyExtractor}
                 data={this.state.allDonations}
                 renderItem={this.renderItem}
               />
             )
           }
         </View>
       </View>
     )
   }
   }


const styles = StyleSheet.create({
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16
  },
  subtitle :{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  }
})
