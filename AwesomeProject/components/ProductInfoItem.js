import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Image, TextInput, Platform} from 'react-native';
// New for datetime
import DateTimePicker from '@react-native-community/datetimepicker';

export default function InfoItem({ product, quantity, totalAmount, deliveryDate, inputHandler, onDateChange }) {
    const defaultImage = 'https://reactnative.dev/img/tiny_logo.png'
    // calculate the discount
    const discountText = ((1 - product.discount) * 100).toFixed(2);
    // New for datetime
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || deliveryDate;
        setShow(Platform.OS === 'ios');
        onDateChange(currentDate); 
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    // End of New for datetime

    return (
        // Main container
        <View style={styles.container}>
            {/* display the product image */}
            <Image
                style={styles.logo}
                source={{
                    uri: product.picture == null || product.picture == "" ?
                        defaultImage :
                        product.picture
                }}
            />

            {/* display the product info */}
            <Text style={styles.title}>{product.name}</Text>
            <View style={styles.desinfoBox}>
                <Text style={styles.destext}>{product.description}</Text>
            </View>
            <View style={styles.infoBox}>
                <Text style={styles.text}>Quantities left: {product.quantity}</Text>
                <Text style={styles.text}>Price: ${product.price}</Text>
                {
                    product.discount < 1 ? (
                        <Text style={styles.text}>
                            Discount: <Text style={styles.discountText}>{discountText}% OFF </Text>
                        </Text>
                    ) : null
                }
            </View>




        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        margin: 10,
        backgroundColor: 'white',
        alignItems: "center",
    },
    logo: {
        resizeMode: "contain",
        height: 100,
        width: 100,
        marginBottom: 10,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        margin: 10
    },
    infoBox: {
        alignSelf: 'flex-start',
    },
    desinfoBox: {
        alignSelf: 'stretch',
        borderBottomWidth: 2,
        borderBottomColor: "black",
        marginBottom: 5,
    },
    destext: {
        fontSize: 16,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
    },

    discountText: {
        fontSize: 20,
        color: 'red'
    },
    amountText: {
        fontSize: 20,
        alignSelf: 'flex-end',
    },
    textInput: {
        width: '100%',
        marginVertical: 20,
        padding: 10,
        borderWidth: 1,
        height: 40,
    }
})
