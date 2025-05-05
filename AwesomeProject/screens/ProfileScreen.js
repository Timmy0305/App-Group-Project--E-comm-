import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Alert , Button, ImageBackground} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../navigation/context';


export default function ProfileScreen({ navigation }) {
    const [userToken, setUserToken] = useState('')
    const { signOut } = useContext(AuthContext);

    return (
        <ImageBackground
        source={require("../assets/images/login_background.jpg")}
        style={styles.bgImage}
        >
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to your profile</Text>
            <Text style={styles.text}>{userToken}</Text>
            <Button
                title='Logout'
                onPress={() => signOut()}
            />
        </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    bgImage: {
        width: "100%",
        height: "100%",
      },
      text:{
        fontSize: 30,
      }
}) 
