import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Image, TextInput, Platform} from 'react-native';
// New for datetime
import DateTimePicker from '@react-native-community/datetimepicker';

export default function OrderItem({ product, quantity, totalAmount, address, deliverTime, deliveryDate, inputHandler,inputAddressHandler, onDateChange }) {
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
            <Text style={styles.text}>Order Amount: </Text>
            {/* User quantiry input field */}
            <TextInput
                style={styles.textInput}
                value={quantity}
                onChangeText={inputHandler}
                keyboardType='numeric'
            />
            <Text style={styles.text}>Address: </Text>
            <TextInput
                style={styles.textInput}
                value={address}
                onChangeText={inputAddressHandler}
            />

            <Text style={styles.text}>Delivery Date: {deliveryDate.toString()}</Text>
            



            {/* New for Datetime-Picker */}
            <View>
                <View>
                    <Button onPress={showDatepicker} title="Choose Your delivery Date" />
                </View>
                <View>
                    <Button onPress={showTimepicker} title="Choose Your delivery Time" />
                </View>
                {show && (
                    <DateTimePicker
                        value={deliveryDate}
                        minimumDate={new Date()}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
            </View>

            {/* display total amount */}
            <Text style={styles.amountText}>Total: ${totalAmount}</Text>

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
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20
    },
    infoBox: {
        alignSelf: 'flex-start',
    },
    text: {
        fontSize: 12,
        marginBottom: 2,
        alignSelf: 'flex-start'
    },
    discountText: {
        fontSize: 12,
        color: 'red'
    },
    amountText: {
        fontSize: 12,
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
