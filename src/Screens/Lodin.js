
import React, { useState, createRef } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
    ImageBackground,
    Dimensions
} from 'react-native';

import { Authenticate } from '../Services';
import Spinner from 'react-native-loading-spinner-overlay';
import Person from 'react-native-vector-icons/Ionicons';
const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)


    const submitHandler = () => {
        if (username == null || username == "") {
            alert("Please enter username")
            return true
        }
        if (password == null || password == "") {
            alert("Please enter password")
            return true
        }
        if (username != "" && password != "") {
            setLoading(true)
            Authenticate(username, password).then((res) => {
                if(res.code == 200){
                    navigation.navigate("Home",{apitoken:res.token})
                    // alert("Successfully Login")
                    setLoading(false)
                }
                else if(res.code == 400){
                  alert(res.message)
                  setLoading(false)
                }
                else{
                    alert(res.message)
                    setLoading(false)
                }
                console.log("response", res)
                // if (res.uid) {
                //   props.navigation.navigate("dashboard")
                // }
                // else {
                //   setLoading(false)
                //   alert("Invalid username or password")
                // }
            }).catch(error => {
                setLoading(false)
                console.log("error", error)
                alert("Please Check Your Internet Connection")
            })
        }
    }



    return (
        <View style={styles.mainBody}>
            {
                loading ?
                    <Spinner visible={true} />
                    :
                    null
            }
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flexGrow: 1,

                }}>
                <ImageBackground style={{
                    flex: 1, position: 'absolute',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,

                }}
                    source={require("../../assets/background.png")}>

                    <View >
                        <KeyboardAvoidingView enabled>
                            <View style={styles.voterContainer}>
                                <Image
                                    source={{ uri: "https://aboutreact.com/wp-content/uploads/2020/05/success.png" }}
                                    style={{
                                        width: '17%',
                                        height: 50,
                                        resizeMode: 'contain',
                                        marginLeft: 10

                                    }}
                                />
                                <Text style={{ fontSize: 25, color: "#fff", textAlign: 'center', fontWeight: 'bold', width: "80%", }}>VOTER MANAGEMENT SYSTEM</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <Text style={{ fontSize: 20, color: "#FFF", fontWeight: 'bold' }}>MY ACCOUNT</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', margin: 20, }}>
                                <Person name="person-circle" size={70} color="#fff" />
                            </View>
                            <View style={styles.SectionStyle}>
                                <Person name="person-circle" size={30} color="#fff" style={{ marginLeft: 10, }} />
                                <TextInput
                                    style={styles.inputStyle}
                                    placeholder="Enter Username"
                                    placeholderTextColor="#fff"
                                    autoCapitalize="none"
                                    onChangeText={val => setUsername(val)}
                                    Value={username}


                                />
                            </View>
                            <View style={styles.SectionStyle}>
                                <Person name="lock-closed" size={30} color="#fff" style={{ marginLeft: 10, }} />
                                <TextInput
                                    style={styles.inputStyle}

                                    placeholder="Enter Password"
                                    placeholderTextColor="#fff"
                                    secureTextEntry={true}
                                    onChangeText={val => setPassword(val)}
                                    Value={password}

                                />

                            </View>
                            <TouchableOpacity onPress={() => submitHandler()}
                                style={styles.buttonStyle}
                                activeOpacity={0.5}>
                                <Text style={styles.buttonTextStyle}>LOGIN</Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </View>


                </ImageBackground>
            </ScrollView>
        </View>
    );
};
export default Login;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,

    },
    voterContainer: {
        height: "22%",
        backgroundColor: "transparent",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        width: '93%',
        alignSelf: 'center',
        marginTop: 15,
        borderRadius: 10,
        marginBottom: 15,
        padding: 20,
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.26,
        shadowRadius: 10,
        elevation: 15
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#fff',
    },
    buttonStyle: {
        backgroundColor: '#505762',
        width:"80%",
        padding:10,
        alignItems:"center",
        alignSelf:"center",
        marginTop:20,
        justifyContent:"center",  
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.26,
        shadowRadius: 10,
        elevation: 9,
        borderRadius:5
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
        fontWeight:"700"
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,

    },
    registerTextStyle: {
        color: '#FFFFFF',
        // textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 30,
        // alignSelf: 'center',
        padding: 10,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});