import React, { useState, useContext } from 'react'
import { apiLogin, apiRegister } from '../services/api';
import { AuthContext } from '../navigation/context';

import {
    ImageBackground,
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';

import { Input, Icon } from "@rneui/base";

export default function LoginScreen() {
       // Context Hook
    const { signIn, signUp } = useContext (AuthContext);

    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [isNewUser, setIsNewUser] = useState(false);

    const [errorMessage, setErrorMessage] = useState(null);

    // Handling button press
    const onPressSubmit = async () => {
        setIsLoading(true);

        // isNewUser check for user login or register
        if (isNewUser) {
            // when register, check 2 password match
            if (password != password2) {
                setErrorMessage("Password does not match")
                setIsLoading(false);
                return; // if not match, return message to user and do nothing
            }
            // if 2 password match, using apiRegister to send
            // username and 2 passwords to server
            const { created } = await apiRegister({ username, password, password2 });
            // user create successfull
            if (created) {
                // log user in
                const response = await apiLogin({ username, password })
                if (response.error) {
                    // display any errors from server
                    setErrorMessage(response.error)
                } else {
                    // use signIn function to log down 
                    // the username and usertoken in local device
                    setErrorMessage(null)
                    signIn(response.token, response.username)
                }
            }
        } else {
            // when login, using apiLogin to send username and password to server
            const response = await apiLogin({ username, password })
            if (response.error) {
                // display error response from server
                setErrorMessage(response.error)
            } else {
                // use signIn function to log down 
                // the username and usertoken in local device
                setErrorMessage(null)
                signIn(response.token, response.username)
            }
        }

        setIsLoading(false);
    }



    return (
        <ImageBackground
            source={require("../assets/images/login_background.jpg")}
            style={styles.bgImage}
        >
            <KeyboardAvoidingView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Image
                    source={require("../assets/images/logo.png")}
                    style={styles.logo}
                />

                <Input
                    placeholder="USERNAME"
                    returnKeyType="next"
                    textContentType="username"
                    containerStyle={styles.container}
                    inputContainerStyle={styles.input}
                    underlineColorAndroid="transparent"
                    onChangeText={setUsername}
                    defaultValue={username}
                    autoCapitalize="none"
                    leftIcon={
                        <Icon
                            name='person'
                            size={24}
                            color='black'
                        />
                    }
                />
                <Input
                    placeholder="PASSWORD"
                    // secureTextEntry prop used to masked the input for password input
                    secureTextEntry
                    returnKeyType="done"
                    textContentType="password"
                    containerStyle={styles.inputContainer}
                    inputContainerStyle={styles.input}
                    underlineColorAndroid="transparent"
                    onChangeText={setPassword}
                    autoCapitalize="none"
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='black'
                        />
                    }
                />
                {isNewUser ? 
                <Input
                    placeholder="PASSWORD AGAIN"
                    // secureTextEntry prop used to masked the input for password input
                    secureTextEntry={true}
                    returnKeyType="done"
                    textContentType="password"
                    containerStyle={styles.inputContainer}
                    inputContainerStyle={styles.input}
                    underlineColorAndroid="transparent"
                    onChangeText={setPassword2}
                    autoCapitalize="none"
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='black'
                        />
                    }
                />
                :null} 

                {errorMessage == null ? null :
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                }


                <TouchableOpacity
                    disabled={isLoading}
                    style={styles.submitButton}
                    onPress={onPressSubmit}
                >
                <Text style={styles.submitText}>{isNewUser ? "REGISTER" : "LOGIN"} </Text>
                
                </TouchableOpacity>

                <TouchableOpacity
                    disabled={isLoading}
                    style={styles.alternativeButton}
                    onPress={() => setIsNewUser(!isNewUser)
                    }
                >
                <Text style={styles.alternativeButtonText}>{isNewUser? "Already have account?" : "Register"}</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgImage: {
        width: '100%',
        height: "100%"
    },
    scrollView: {
        marginTop: 40,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    logo: {
        resizeMode: 'contain',
        width: 200,
        height: 200,
        marginBottom: 10
    },
    input: {
        paddingHorizontal: 10,
        backgroundColor: "white",
        opacity: 0.7,
        borderRadius: 15
    },
    submitButton: {
        width: 300,
        padding: 10,
        backgroundColor: "#00acc1",
        borderRadius: 15,
        marginVertical: 5,
    },
    submitText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    },
    alternativeButton: {
        padding: 10,
        marginVertical: 5,
    },
    alternativeButtonText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    errorMessage: {
        color: 'red',
        marginBottom: 10,
    },
    
})

