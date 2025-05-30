import React, { useState, useEffect } from "react";
import {
    Alert,
    Image,
    RefreshControl,
    StyleSheet,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import OrderItem from '../components/OrderItem';

import PaypalView from "../components/PaypalView";
import { getProduct, makePayment } from '../services/api';
export default function OrderScreen({ route, navigation }) {
    const [product, setProduct] = useState(route.params.product);

    //for user input
    const [isLoading, setIsLoading] = useState(false);
    const [inputQuantity, setInputQuantity] = useState("");
    const [inputAddress, setInputAddress] = useState("");
    const [totalAmount, setTotalAmount] = useState("0");
    const [showModal, setShowModal] = useState(false);
    const [approvalUrl, setApprovalUrl] = useState("");
    // New in datetime
    const [deliveryDate, setDeliveryDate] = useState(new Date());
    const [deliveryTime, setDeliveryTime] = useState(new Date());
    
    const inputHandler = (value) => {
        setInputQuantity(value);
        setTotalAmount((value * product.price * product.discount).toFixed(2));
    }
    
    const inputAddressHandler =(value) =>{
        setInputAddress(value)
    }
    async function submitOrder() {
        setIsLoading(true);

        // validate the quantity input
        if (isNaN(inputQuantity) || inputQuantity == "0" || inputQuantity == "") {
            Alert.alert("ERROR", "Please input a valid quantity", [
                { text: "Okay" },
            ]);
            setIsLoading(false);
            return;
        }

        console.log("Sending order data to server for making payment")
        // new for datetime
        // format: yyyy-mm-dd
        var formamtedDate = deliveryDate.getFullYear() + "-" + (deliveryDate.getMonth()+1) + "-" + deliveryDate.getDate();
        var formamtedTime =  deliveryDate.getHours() + ":" + (deliveryDate.getMinutes()) + ":" + deliveryDate.getSeconds();
        
        const orderData = {
            product: product.id,
            quantity: inputQuantity,
            total_amount: totalAmount, 
            address: inputAddress,
            // New for datetime
            delivery_date: formamtedDate,
            delivery_time: formamtedTime,
        };
        // using orderData to make payment request to server
        const response = await makePayment(orderData);
        if (response.error) {
            // Show Error Alert about paypal errors
            if (response.error.details) {
                Alert.alert("ERROR", response.error.details[0].issue, [
                    { text: "Okay" },
                ]);
                setIsLoading(false);
                return;
            }
            // Show Error Alert about server error
            Alert.alert("ERROR", response.error, [
                { text: "Try again later" },
            ]);
            setIsLoading(false);
            return;
        }
        // get paypal approval url successfully
        if (response.approval_url !== undefined) {
            setApprovalUrl(response.approval_url)
            setShowModal(true)
        }

        setIsLoading(false);
    }

    const refreshControl=(
        <RefreshControl
        refreshing={isLoading}
        onRefresh={updateProductDate}
        />
    )

    async function updateProductDate() {
        setIsLoading(true);
        console.log("updateing ProductData from server ...")
        const newProductData = await getProduct(product.id);
        const newProductTime = await getProduct(product.id);
        setProduct(newProductTime);
        setProduct(newProductData);
        setIsLoading(false);
    }

    function closeModal() {
        setShowModal(false);
    }

    function paypalHandler(navState) {
        // Keep track of going back navigation within component
        if (navState.title == "success") {
            closeModal();
            Alert.alert("Success", "Payment success", [
                { text: "Okay" },
            ]);
            navigation.pop()
        } else if (navState.title == "cancelled") {
            closeModal();
            Alert.alert("Cancelled", "Payment cancelled", [
                { text: "Okay" },
            ]);
            navigation.pop()
        }
    }

    return (
        <View style={styles.container}>

            {/* Paypal modal */}
            <PaypalView
            url={approvalUrl}
            showModal={showModal}
            closeModal={closeModal}
            paypalHandler={paypalHandler}
            />

            {/* ScrollView is the main content view for displaying product detail */}
            <ScrollView
                contentContainerStyle={styles.container}
                refreshControl={refreshControl}
            > 

                <OrderItem
                    product={product}
                    quantity={inputQuantity}
                    totalAmount={totalAmount}
                    address={inputAddress}
                    deliveryDate={deliveryDate}
                    deliveryTime={deliveryTime}
                    inputHandler={inputHandler}
                    inputAddressHandler={inputAddressHandler}
                    onDateChange={(date) => {setDeliveryDate(date)}
                    }
                    onTimeChange={(time) => {setDeliveryDate(time)}
                    }
                />

            </ScrollView>

            <TouchableOpacity
                style={styles.orderButton}
                onPress={() => {
                    submitOrder();
                }}
            >
                <Text style={styles.buttonText}>PAY by</Text>
                <FontAwesome name="cc-paypal" size={40} color="#3b7bbf" />
            </TouchableOpacity>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    orderBox: {
        flex: 1,
        padding: 10,
        margin: 10,
        backgroundColor: 'white',
        alignItems: "center",
    },
    orderButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightblue",
        padding: 5,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        marginRight: 5,
        textAlign: "center",
    },
    textInput: {
        width: '100%',
        marginVertical: 20,
        padding: 10,
        borderWidth: 1,
        height: 40,
    },
    amountText: {
        fontSize: 20,
        alignSelf: 'flex-end',
    },
})

