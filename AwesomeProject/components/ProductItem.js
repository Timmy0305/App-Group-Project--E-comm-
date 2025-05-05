import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import { Fontisto } from '@expo/vector-icons';

export default function ProductItem({item, pressHandler}) {
    const defaultImage = "https://reactnative.dev/img/tiny_logo.png"
    const discountText = ((1-item.discount)*100).toFixed(0);
    return (
        <TouchableOpacity
        style={styles.whitebox}
        activeOpacity={1}
        onPress={() => pressHandler(item)}
    >
        <Image
            style={styles.logo}
            source={{uri:item.picture==null || item.picture== "" ? defaultImage: item.picture}}
        />
            <View style={styles.infoBox}>
                <Text style={styles.content}>{item.name}</Text>
                <View>
                    <Text style={styles.number}>Quantity: {item.quantity}</Text>
                    <Text style={styles.number}>Price: ${item.price}</Text>
                    {
                    item.discount < 1? (
                        <Text style={styles.text}>
                            Discount: <Text style={styles.discountText}>{discountText}% OFF </Text>
                        </Text>
                    ) : null
                }
                    <Text>Last Updated: {item.updated}</Text>
                    </View>
            </View>


    </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    whitebox: {
        flex: 1,
        flexDirection: "row",
        alignSelf:'center',
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: "green",
        backgroundColor: 'white',   
    },
    logo: {
        width: 100,
        height: 100,
    },
    infoBox: {
        marginHorizontal: 20,
        flexGrow: 1,
    },

    rightIcon: {
        alignSelf: "center",
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
    },
    content: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    number: {
        fontSize: 15,
    },
    discountText: {
        fontSize: 15,
        color: 'red',
    }
})
