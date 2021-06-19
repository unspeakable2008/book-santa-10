import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity, Dimensions, Animated, TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import { SwipeListView } from 'react-native-swipe-list-view';

export default class SwipeableFlatlist extends Component{
    constructor(props){
        super(props)
        this.state = {
            allNotifications:this.props.allNotifications
        }   
    }
    updateMarkAsRead = (notification)=>{
        db.collection("allNotifications").doc(notification.docId).update({
            notificationStatus:"read"
        })
    }
    onSwipeValueChange = (swipeData)=>{
        var allNotifications = this.state.allNotifications
        const{key,value} = swipeData
        if (value<-Dimensions.get("window").width){
            const newData = [...allNotifications]
            this.updateMarkAsRead(allNotifications[key])
            newData.splice(key,1)
            this.setState({
                allNotifications:newData
            })
                }
    }
renderItem = (data)=>(
<Animated.View>
    <ListItem bottomDivider>
        <ListItem.Content>
            <ListItem.Title>{data.item.bookName}</ListItem.Title>
            <ListItem.Subtitle>{data.item.message}</ListItem.Subtitle>
            
        </ListItem.Content>
    </ListItem>
</Animated.View>
)
renderHiddenItem = ()=>(
    <View style = {styles.rowBack}>
        <View atyle = {[styles.backRightBtn,styles.backRightBtnRight]}>
            <Text style = {styles.backTextWhite}>mark as read</Text>
        </View>
    </View>
)

render(){
    return(
        <View style = {styles.container}> 
            <SwipeListView disableRightSwipe data = {this.state.allNotifications} renderItem = {this.renderItem} renderHiddenItem = {this.renderHiddenItem} rightOpenValue = {-Dimensions.get("window").width} previewRowKey = {"0"} previewOpenValue = {-40} previewOpenDelay = {3000} onSwipeValueChange = {this.onSwipeValueChange} keyExtractor = {(item,index)=>index.toString()}></SwipeListView>
        </View>
    )
}
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      flex: 1
    },
    backTextWhite: {
      color: "#FFF",
      fontWeight: "bold",
      fontSize: 15,
      textAlign: "center",
      alignSelf: "flex-start"
    },
    rowBack: {
      alignItems: "center",
      backgroundColor: "#29b6f6",
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      paddingLeft: 15
    },
    backRightBtn: {
      alignItems: "center",
      bottom: 0,
      justifyContent: "center",
      position: "absolute",
      top: 0,
      width: 100
    },
    backRightBtnRight: {
      backgroundColor: "#29b6f6",
      right: 0
    }
  });
  