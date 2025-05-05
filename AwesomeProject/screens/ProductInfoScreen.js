import React, { useState } from "react";
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
import ProductInfoItem from '../components/ProductInfoItem';

export default function OrderScreen({route, navigation}) {
    const [product, setProduct] = useState(route.params.product);

    const [isLoading, setIsLoading] = useState(false);
    const [inputQuantity, setInputQuantity] = useState("");
    const [totalAmount, setToalAmount]= useState("0");
    const inputHandler = (value)=> {
        setInputQuantity(value);
        setToalAmount((value * product.price * product.discount).toFixed(2));
    }

    function submitOrder() {
        console.log("submit Order");
    }

    const refreshControl =(
        <RefreshControl
            refreshing={isLoading}
            onRefresh={() => updateProductData()}
        />
    )

    function updateProductData() {
        setIsLoading(true);
        console.log("Updating ProductData from server ....")
        const newProductData = route.params.product;
        setProduct(newProductData);
        setIsLoading(false);
    }

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.container}
                refreshControl={refreshControl}
            >
                <ProductInfoItem
                    product={product}
                    quantity={inputQuantity}
                    totalAmount={totalAmount}
                    inputHandler={inputHandler}
                />
            </ScrollView>

            <TouchableOpacity
                style={styles.orderButton}
                onPress={()=> navigation.navigate('Order', {
                
                    product: product
                })
            }        
            >
                <Text style={styles.buttonText}>Order Now</Text>
               
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
        backgroundColor: "blue",
        padding: 10,
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
