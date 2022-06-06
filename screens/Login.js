import { StyleSheet, Text, View ,TextInput, TouchableOpacity} from 'react-native'
import React, {useState, useEffect, useLayoutEffect} from 'react'
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
    const [lastname, setLastname] = useState("")
    const [firstname, setFirstname] = useState("")

    useLayoutEffect(() => {
        load()
    }, [])
    const handlePress = async () => {
        if(lastname.length > 0 && firstname.length > 0){
            try {
                let user = {
                    firstname: firstname,
                    lastname: lastname
                }
                await AsyncStorage.setItem("user",JSON.stringify(user))
                navigation.navigate("Home")
            }
            catch(error){
                alert(error)
            }

        }else{
            alert("Veuillez remplir tous les champsr !")
        }
    }

    const load = async() => {
        try{
            let jsonValue = await AsyncStorage.getItem("user");
            if(jsonValue !== null){
                navigation.navigate("Home")
            }
        }
        catch(error){
            alert(error)
        }

    }

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <AntDesign name="twitter" size={80} color="white" />
      </View>
      <View style={styles.inputContainer}>
          <Text style={styles.text}>{firstname} {lastname}</Text>
        <TextInput style={styles.input} placeholder="Votre nom" onChangeText={(val) => setLastname(val)} />
        <TextInput style={styles.input} placeholder="Votre prénom" onChangeText={(val) => setFirstname(val)} />
        <TouchableOpacity style={styles.touchable} onPress={() => handlePress()}>
            <View style={styles.btnContainer}>
                <Text style={styles.btnText}>Valider</Text>
            </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#1A91DA",
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    }
    ,logo: {
        marginBottom:50
    },
    inputContainer:{
        width:"100%",
        paddingHorizontal:50
    },
    input:{
        backgroundColor: "white",
        borderRadius:25,
        padding:10,
        textAlign: "center",
        fontSize:19,
        marginVertical:10
    },
    touchable:{
        marginVertical: 9
    },
    text:{
        color: "white",
        fontSize: 25,
        textAlign: "center"
    },
    btnContainer:{
        backgroundColor: "turquoise",
        borderRadius:7,
        padding: 9,

    },
    btnText:{
        fontSize:17,
        textAlign: "center",
        textTransform: "uppercase"
    }
})