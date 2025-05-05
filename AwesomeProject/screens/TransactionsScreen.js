import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Button, ImageBackground } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { getOrders } from '../services/api';

export default function TransactionsScreen({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);
    const [ordersList, setOrdersList] = useState([]);
    const [currentDate, setcurrentDate] = useState('');

    
    // function to call api then update the product data
    async function fetchOrders() {
        setIsLoading(true);
        console.log("fetching transaction list from server ...");
        const transactionsList = await getOrders();
        setOrdersList(transactionsList);
        setIsLoading(false);
    }

    // useEffect hook run immediately when the screen loaded
    useEffect(() => {
        fetchOrders();
    }, [])

       //current Time
       useEffect(() => {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        setcurrentDate(
          date + '/' + month + '/' + year 
          + ' ' + hours + ':' + min + ':' + sec
        );
      }, []);

    return (
        <ImageBackground
        source={require("../assets/images/login_background.jpg")}
        style={styles.bgImage}
        >
        <View style={styles.container}>
        <Text style={styles.time}>Transaction Last Updated:{currentDate}</Text>
            <Text style={styles.topText}>Transaction Records</Text>
            {ordersList.length > 0 ?
                <FlatList
                    data={ordersList}
                    keyExtractor={(item, index) => index.toString()}

                    renderItem={({item}) => (
                        <View style= {styles.whitebox}>
                            <View>
                            <Text style= {styles.text}>Invoice: {item.invoice_no}</Text>
                            <Text style= {styles.text}>Product: {item.product.name}</Text>
                            <Text style= {styles.text}>Quantity: {item.quantity}</Text>
                            <Text style= {styles.text}>Total Price: {item.total_amount}</Text>
                            <Text style= {styles.text}>Address: {item.address}</Text>
                            <Text style= {styles.text}>Delivery Time: {item.delivery_time}</Text>
                            <Text style= {styles.text}>Delivery Date: {item.delivery_date}</Text>
                            </View>
                        </View>
                    )}
                    refreshing={isLoading}
                    onRefresh={()=>fetchOrders()}
                /> :
                <View style={styles.emptyView}>
                    <Text>No Transction records</Text>
                    <Button title="Refresh" onPress={() => fetchOrders()} />
                </View>
            }
        </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    whitebox: {
        flex: 1,
        flexDirection: "row",
        alignSelf:'center',
        padding: 30,
        borderBottomWidth: 1,
        borderBottomColor: "green",
        backgroundColor: 'white',   
    },
    emptyView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    topText: {
        marginBottom: 20,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "white",
        color:'red',
        width: '100%',
    
    },
    text: {
        fontSize: 20,
        margin: 5,  
    },
    bgImage: {
        width: "100%",
        height: "100%",
      },
    time: {
        width:'100%',
        backgroundColor:'white',
        fontSize: 10,
        textAlign:'center',
    
    }
})


