import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, Button, ImageBackground } from 'react-native'

import ProductItem from '../components/ProductItem';
import { getProducts } from '../services/api';
import { TextInput } from 'react-native-gesture-handler';


export default function ProductsScreen({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);
    const [productsList, setProductsList] = useState([]);
    const [searchQuery,setSearchQuery] =useState('');
    const [SearchProductsList, setSearchProductsList] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setSearchProductsList(productsList);
    } else {
      const filteredProductsList = productsList.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchProductsList(filteredProductsList);
    }
  }, [searchQuery, productsList]);

    // item pressed handler, send product data to OrderScreen
   const pressHandler = (product) => {
        navigation.navigate('Information', {
            product: product
        })
    }

    // function to call api then update the product data
    async function fetchProducts() {
        setIsLoading(true);
        console.log("fetching product list from server ...");
        const products = await getProducts();
        setProductsList(products);
        setIsLoading(false);
    }
    

    // useEffect hook run immediately when the screen loaded
    useEffect(() => {
        fetchProducts();
    }, [])


    return (
        <ImageBackground
        source={require("../assets/images/login_background.jpg")}
        style={styles.bgImage}
        >
        <View style={styles.container}>
        <Text style={styles.topText}>Purchase Full $300, No Delivery Charge</Text>
            <TextInput
                style = {styles.searchInput}
                placeholder='Search fruit...'
                value={searchQuery}
                onChangeText={(text)=> setSearchQuery(text)}
                onSubmitEditing={fetchProducts}/>

            {productsList.length > 0 ?
                <FlatList
                    data={SearchProductsList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <ProductItem
                           item={item}
                            pressHandler={pressHandler}
                        />
                    )}
                    refreshing={isLoading}
                    onRefresh={() => fetchProducts()}
                /> :
                <View style={styles.emptyView}>
                    <Text>No Products</Text>
                    <Button title="Refresh" onPress={() => fetchProducts()} />
                </View>
            }
        </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    emptyView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    topText: {
        marginTop: 0,
        marginBottom: 10,
        fontSize: 17,
        padding: 30,
        fontWeight: "bold",
        textAlign: "left",
        fontFamily: "Papyrus",
        color: 'black',
        backgroundColor: "#ACE145",
        alignSelf: 'stretch',
        textAlign: 'right',
    },
    searchInput: {
        width: '95%',
        height: 40,
        alignSelf:'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor:'white',
      },
      bgImage: {
        width: "100%",
        height: "100%",
      },
})
