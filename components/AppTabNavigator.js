import React,{Component} from "react"
import {Image} from "react-native"
import {createBottomTabNavigator} from "react-navigation-tabs"
import BookDonateScreen from "../screens/BookDonateScreen"
import BookRequestScreen from "../screens/BookRequestScreen"
import {AppStackNavigator} from "./AppStackNavigator"
export const AppTabNavigator = createBottomTabNavigator({
   
     DonateBooks:{screen:AppStackNavigator,navigationOptions:{tabBarIcon:<Image source = {require("../assets/bookDonate.png")}style = {{width:20,height:20}}></Image>,tabBarLabel:"DonateBooks "}},
     RequestBooks:{screen:BookRequestScreen,navigationOptions:{tabBarIcon:<Image source = {require("../assets/book request.png")}style = {{width:20,height:20}}></Image>,tabBarLabel:"RequestBooks "}}
    })
    