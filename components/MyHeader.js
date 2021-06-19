import React,{Component} from "react"
import  {Header,Icon,Badge,ListItem} from "react-native-elements"
import { StyleSheet,View,FlatList,Text} from "react-native"
import db from "../config"
import { compose } from "async"
export default class MyHeader extends Component{
    constructor(props){
        supper(props)
        this.state={
            value:""
        }
    }
getNumberOfUnreadNotifications(){
    db.collection("allNotifications").where("notificationStatus","==","unread").onSnapshot((snapshot)=>{
        var unreadNotifications = snapshot.docs.map((doc)=>doc.data())
        this.setState({
            value:unreadNotifications.length
        })
        
    })
}

componentDidMount(){
this.getNumberOfUnreadNotifications
}
bellIconWithBadge = ()=>{
    return(
        <View>
            <Icon name = "bell" type = "font-awesome" color = "#696969" size = {25} onPress = {()=>{this.props.navigation.navigate("Notifications")}}></Icon>
            <Badge value = {this.state.value} containerStyle = {{position:"absolute",top:-4,right:-4}}></Badge>
            </View>
    )
}
render(){
    return(
<Header backgroundColor = "#eaf8fe" centerComponent = {{text:props.title,styles:{color:"#90a5a9",fontSize:20,fontWeight:"bold"}}}
leftComponent = {<Icon name = "bars" type = "font-awesome" color = "#696969" size = {25} onPress = {()=>{this.props.navigation.toggleDrawer()}} ></Icon>}rightComponent = {<this.bellIconWithBadge{...this.props}/>}></Header>
    )
}
}