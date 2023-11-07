import React, { useState, createRef } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
    PermissionsAndroid,
    TouchableOpacity,
} from 'react-native';
import { SearchCNIC,GetPdf } from '../Services';
import Spinner from 'react-native-loading-spinner-overlay';
import SearchIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaskedTextInput } from "react-native-mask-text";
import RNFetchBlob from 'rn-fetch-blob';
const Home = ({ route }) => {
    const apitoken = route.params.apitoken
    const [cnic, setCnic] = useState('')
    const [loading, setLoading] = useState(false)
    const [currentUser, setCurrentUser] = useState([])
    const [allMember, setAllMember] = useState([])
    const [showallMember, setShowAllMember] = useState(false)
    const [showbtn,setShowBtn]=useState(true)
    const [single,setSingle] =useState(1)

    const searchCnic = () => {
        if (cnic == "") {
            alert("Please enter CNIC")
        }
        else if (cnic.trim().length <= 13) {
            alert("CNIC must be 13 numbers long.")
        }
        else if (cnic != "") {
            setLoading(true)
            SearchCNIC(apitoken, cnic).then((res) => {
                 let tempCurrentUser =  [];
                 let temAllmembers =  [];
                if (res.code == 200) {
                    for (let i = 0; i < res.voters.length; i++) {
                        if (cnic === res.voters[i].cnic.value) {
                            console.log(res.voters[i])
                            tempCurrentUser.push(res.voters[i])
                        }
                        else {
                            temAllmembers.push(res.voters[i])
                        }
                    }
                    setCurrentUser(tempCurrentUser)
                    setAllMember(temAllmembers)
                    setLoading(false)
                }
                else if (res.code == 400) {
                    alert(res.message)
                    setLoading(false)
                }
                else {
                    alert(res.message)
                    setLoading(false)
                }
            }).catch(error => {
                setLoading(false)
                console.log("error", error)
                alert("Please Check Your Internet Connection")
            })
        }
    }
    const ShowAllRecord = () => {
        if (allMember != "") {
            setShowAllMember(true)
            setSingle(0)
        }
        else {
            alert("Please search CNIC")
        }
    }

    const hideAllRecord = () =>{
        setShowAllMember(false)
        setSingle(1)
    }

 const checkPermission = async (image_url,fileName) => {
    
        //Function to check the platform
        //If iOS the start downloading
        //If Android then ask for runtime permission
    
       
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'Storage Permission Required',
                message: 'This app needs access to your storage to download Photos',
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              //Once user grant the permission start downloading
              
             download(image_url,fileName);
            } else {
              //If permission denied then show alert 'Storage Permission Not Granted'
              alert('Storage Permission Not Granted');
            }
          } catch (err) {
            //To handle permission related issue
       
          }
        
      };

    const download=(image_url,name)=>{
        var date      = new Date();
        var url       = image_url;
        var ext       = extention(url);
        ext = "."+ext[0];
        const { config, fs } = RNFetchBlob
        let PictureDir = fs.dirs.PictureDir
        let options = {
          fileCache: true,
          addAndroidDownloads : {
            useDownloadManager : true,
            notification : true,
            path:  PictureDir + "/"+name+Math.floor(date.getTime() + date.getSeconds() / 2)+ext,
            description : 'Image'
          }
        }
        config(options).fetch('GET', url).then((res) => {
            setLoading(false)
        });
      }

    const extention=(filename)=>{
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
      }

      
    const getPdf = () => {
        if (cnic != "") {
            setLoading(true)
            GetPdf(apitoken, cnic,single).then((res) => {
                console.log(res)
                if (res.code == 200) {
                    checkPermission(res.pdf,"")
                }
                else if (res.code == 400) {
                    alert(res.message)
                    setLoading(false)
                }
                else {
                    alert(res.message)
                    setLoading(false)
                }
            }).catch(error => {
                setLoading(false)
                console.log("error", error)
                alert("Please Check Your Internet Connection")
            })
        }
        else{
            alert("Please enter cnic")
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
            <ScrollView keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flexGrow: 1, }}>
                <View style={{ flex: 1, margin: 15, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <MaskedTextInput
                            placeholder="Enter CNIC"
                            // placeholderTextColor="#000"
                            type="custom"
                            mask="99999-9999999-9"
                            keyboardType="numeric"
                            onChangeText={(val) => setCnic(val)}
                            style={styles.Searchable} />
                        <TouchableOpacity onPress={() => searchCnic()} style={styles.btnsearch}>
                            <SearchIcon name="account-search" size={55} color="#505762" style={{}} />
                        </TouchableOpacity>
                    </View>
                    {/* <Image style={{width: '60%', height: '5.5%'}}
                          source={{uri:"https://votex.stagingengine.com/assets/uploads/crops/1_27_3/2_11_name.jpg"}}/> */}
                    {/* <View style={{ marginTop: 10 }}>
                        <View style={{flexDirection:'row'}} >
                        <Image style={{width: '60%', height: '5.5%'}}
                          source={{uri:"https://votex.stagingengine.com/assets/uploads/crops/1_27_3/2_11_name.jpg"}}/>
                        
                        </View>
                        <Text style={{ color: "#fff", fontSize: 20, marginBottom: 10 }}>شناختی کارڈ نمبر :</Text>
                        <Text style={{ color: "#000", fontSize: 20, marginBottom: 10 }}>شماریاتی بلاک کوڈ نمبر :</Text>
                        <Text style={{ color: "#000", fontSize: 20, marginBottom: 10 }}>انتخابی علاقے کا نام :</Text>
                        <Text style={{ color: "#000", fontSize: 20, marginBottom: 10 }}>سلسلہ نمبر :</Text>
                        <Text style={{ color: "#000", fontSize: 20, marginBottom: 10 }}>گھرانہ نمبر :</Text>
                        <Text style={{ color: "#000", fontSize: 20, marginBottom: 10 }}>بوتھ نمبر :</Text>
                        <Text style={{ color: "#000", fontSize: 20, marginBottom: 10 }}>نام :</Text>
                        <Text style={{ color: "#000", fontSize: 20, marginBottom: 10 }}>پتہ :</Text>
                        <Text style={{ color: "#000", fontSize: 20, marginBottom: 10 }}>این سی/وسی نمبر/نام :</Text>
                        <Text style={{ color: "#000", fontSize: 20, marginBottom: 10 }}>حلقہ نمبر /نام :</Text>
                        <Text style={{ color: "#000", fontSize: 20, marginBottom: 10 }}>پولنگ اسٹیشن کا نمبر /نام :</Text>
                    </View> */}
                    <View style={{ flex: 1, marginTop: 10, flexDirection: 'row' }}>
                        {
                            currentUser.map((item, index) => {
                                return (
                                    <View style={{ flex: 1, flexDirection: "column" }} >
                                        <View style={{ flexDirection: "row", padding: 5 }}>
                                            {item.name.type == "text" ?
                                                <Text style={{ color: "#000", fontSize: 20, marginBottom: 10, flex: 1 }}>{item.name.value}</Text> :
                                                <Image style={{ flex: 1 }} resizeMode="contain" source={{ uri: item.name.value }} />
                                            }
                                            <Text style={{ color: "#000", fontSize: 20, marginBottom: 10, }}>نام :</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", padding: 5 }}>
                                            {item.father_name.type == "text" ?
                                                <Text style={{ color: "#000", fontSize: 20, marginBottom: 10, flex: 1 }}>{item.father_name.value}</Text> :
                                                <Image style={{ flex: 1 }} resizeMode="contain" source={{ uri: item.father_name.value }} />
                                            }
                                            <Text style={{ color: "#000", fontSize: 20, marginBottom: 10, }}>ولدیت/ذوجیت :</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", padding: 5, }}>
                                            {item.address.type == "text" ?
                                                <Text style={{ color: "#000", fontSize: 20, marginBottom: 10, flex: 1 }}>{item.address.value}</Text> :
                                                <Image style={{ flex: 1 }} resizeMode="contain" source={{ uri: item.address.value }} />
                                            }
                                            <Text style={{ color: "#000", fontSize: 20, marginBottom: 10, }}>پتہ :</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", padding: 5 }}>
                                            {item.vote_no.type == "text" ?
                                                <Text style={{ color: "#000", fontSize: 20, marginBottom: 10, flex: 1 }}>{item.vote_no.value}</Text> :
                                                <Image style={{ flex: 1 }} resizeMode="contain" source={{ uri: item.vote_no.value }} />
                                            }
                                            <Text style={{ color: "#000", fontSize: 20, marginBottom: 10 }}>ووٹ نمبر :</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", padding: 5 }}>
                                            {item.gharana_no.type == "text" ?
                                                <Text style={{ color: "#000", fontSize: 20, marginBottom: 10, flex: 1 }}>{item.gharana_no.value}</Text> :
                                                <Image style={{ flex: 1 }} resizeMode="contain" source={{ uri: item.gharana_no.value }} />
                                            }
                                            <Text style={{ color: "#000", fontSize: 20, marginBottom: 10 }}>گھرانہ نمبر :</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", padding: 5 }}>
                                            {item.cnic.type == "text" ?
                                                <Text style={{ color: "#000", fontSize: 20, marginBottom: 10, flex: 1 }}>{item.cnic.value}</Text> :
                                                <Image style={{ flex: 1 }} resizeMode="contain" source={{ uri: item.cnic.value }} />
                                            }
                                            <Text style={{ color: "#000", fontSize: 20, marginBottom: 10, flex: 1 }}>شناختی کارڈ نمبر :</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", padding: 5 }}>
                                            {item.block_code.type == "text" ?
                                                <Text style={{ color: "#000", fontSize: 20, marginBottom: 10, flex: 1 }}>{item.block_code.value}</Text> :
                                                <Image style={{ flex: 1 }} resizeMode="contain" source={{ uri: item.block_code.value }} />
                                            }
                                            <Text style={{ color: "#000", fontSize: 20, marginBottom: 10 }}>شماریاتی بلاک کوڈ نمبر :</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", padding: 5 }}>
                                            {item.booth.type == "text" ?
                                                <Text style={{ color: "#000", fontSize: 20, marginBottom: 10, flex: 1 }}>{item.booth.value}</Text> :
                                                <Image style={{ flex: 1 }} resizeMode="contain" source={{ uri: item.booth.value }} />
                                            }
                                            <Text style={{ color: "#000", fontSize: 20, marginBottom: 10 }}>بوتھ نمبر :</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", padding: 5 }}>
                                            {item.uc_no.type == "text" ?
                                                <Text style={{ color: "#000", fontSize: 20, marginBottom: 10, flex: 1 }}>{item.uc_no.value}</Text> :
                                                <Image style={{ flex: 1 }} resizeMode="contain" source={{ uri: item.uc_no.value }} />
                                            }
                                            <Text style={{ color: "#000", fontSize: 20, marginBottom: 10 }}>یونین کونسل نمبر :</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", padding: 5 }}>
                                            {item.ps_no.type == "text" ?
                                                <Text style={{ color: "#000", fontSize: 15, marginBottom: 10, marginRight: 14, flex: 1 }}>{item.ps_no.value}</Text> :
                                                <Image style={{ flex: 1 }} resizeMode="contain" source={{ uri: item.ps_no.value }} />
                                            }
                                            <Text style={{ color: "#000", fontSize: 18, marginBottom: 10 }}>پولنگ اسٹیشن نمبر /نام :</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                   
                    {
                        showallMember ?
                        <View>
                        {
                            allMember.map((item, index) => {
                                return (
                                    <View style={{ flex: 1, marginTop: 10, }}>
                                        <View style={{ borderColor: "#000", borderWidth: 1 }} />
                                        <View style={{ flex: 1, flexDirection: "column" }} >
                                            <View style={{ flexDirection: "row", padding: 5 }}>
                                                {item.name.type == "text" ?
                                                    <Text style={{ color: "#000", fontSize: 20, marginBottom: 10, flex: 1 }}>{item.name.value}</Text> :
                                                    <Image style={{ flex: 1 }} resizeMode="contain" source={{ uri: item.name.value }} />
                                                }
                                                <Text style={{ color: "#000", fontSize: 20, marginBottom: 10, }}>نام :</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", padding: 5 }}>
                                                {item.father_name.type == "text" ?
                                                    <Text style={{ color: "#000", fontSize: 20, marginBottom: 10, flex: 1 }}>{item.father_name.value}</Text> :
                                                    <Image style={{ flex: 1 }} resizeMode="contain" source={{ uri: item.father_name.value }} />
                                                }
                                                <Text style={{ color: "#000", fontSize: 20, marginBottom: 10, }}>ولدیت/ذوجیت :</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", padding: 5, }}>
                                                {item.address.type == "text" ?
                                                    <Text style={{ color: "#000", fontSize: 20, marginBottom: 10, flex: 1 }}>{item.address.value}</Text> :
                                                    <Image style={{ flex: 1 }} resizeMode="contain" source={{ uri: item.address.value }} />
                                                }
                                                <Text style={{ color: "#000", fontSize: 20, marginBottom: 10, }}>پتہ :</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", padding: 5 }}>
                                                {item.vote_no.type == "text" ?
                                                    <Text style={{ color: "#000", fontSize: 20, marginBottom: 10, flex: 1 }}>{item.vote_no.value}</Text> :
                                                    <Image style={{ flex: 1 }} resizeMode="contain" source={{ uri: item.vote_no.value }} />
                                                }
                                                <Text style={{ color: "#000", fontSize: 20, marginBottom: 10 }}>ووٹ نمبر :</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", padding: 5 }}>
                                                {item.gharana_no.type == "text" ?
                                                    <Text style={{ color: "#000", fontSize: 20, marginBottom: 10, flex: 1 }}>{item.gharana_no.value}</Text> :
                                                    <Image style={{ flex: 1 }} resizeMode="contain" source={{ uri: item.gharana_no.value }} />
                                                }
                                                <Text style={{ color: "#000", fontSize: 20, marginBottom: 10 }}>گھرانہ نمبر :</Text>
                                            </View>

                                            <View style={{ flexDirection: "row", padding: 5 }}>
                                                {item.cnic.type == "text" ?
                                                    <Text style={{ color: "#000", fontSize: 20, marginBottom: 10, flex: 1 }}>{item.cnic.value}</Text> :
                                                    <Image style={{ flex: 1 }} resizeMode="contain" source={{ uri: item.cnic.value }} />
                                                }
                                                <Text style={{ color: "#000", fontSize: 20, marginBottom: 10, flex: 1 }}>شناختی کارڈ نمبر :</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", padding: 5 }}>
                                                {item.block_code.type == "text" ?
                                                    <Text style={{ color: "#000", fontSize: 20, marginBottom: 10, flex: 1 }}>{item.block_code.value}</Text> :
                                                    <Image style={{ flex: 1 }} resizeMode="contain" source={{ uri: item.block_code.value }} />
                                                }
                                                <Text style={{ color: "#000", fontSize: 20, marginBottom: 10 }}>شماریاتی بلاک کوڈ نمبر :</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", padding: 5 }}>
                                                {item.booth.type == "text" ?
                                                    <Text style={{ color: "#000", fontSize: 20, marginBottom: 10, flex: 1 }}>{item.booth.value}</Text> :
                                                    <Image style={{ flex: 1 }} resizeMode="contain" source={{ uri: item.booth.value }} />
                                                }
                                                <Text style={{ color: "#000", fontSize: 20, marginBottom: 10 }}>بوتھ نمبر :</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", padding: 5 }}>
                                                {item.uc_no.type == "text" ?
                                                    <Text style={{ color: "#000", fontSize: 20, marginBottom: 10, flex: 1 }}>{item.uc_no.value}</Text> :
                                                    <Image style={{ flex: 1 }} resizeMode="contain" source={{ uri: item.uc_no.value }} />
                                                }
                                                <Text style={{ color: "#000", fontSize: 20, marginBottom: 10 }}>یونین کونسل نمبر :</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", padding: 5 }}>
                                                {item.ps_no.type == "text" ?
                                                    <Text style={{ color: "#000", fontSize: 15, marginBottom: 10, marginRight: 14, flex: 1 }}>{item.ps_no.value}</Text> :
                                                    <Image style={{ flex: 1 }} resizeMode="contain" source={{ uri: item.ps_no.value }} />
                                                }
                                                <Text style={{ color: "#000", fontSize: 18, marginBottom: 10 }}>پولنگ اسٹیشن نمبر /نام :</Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }

                    </View>
                            :
                           null
                    }
                    {
                        allMember.length> 1 && single == 1?
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                <TouchableOpacity onPress={() => ShowAllRecord()} style={styles.btndetails}>
                                    <Text style={{ color: '#fff', textAlign: 'center', fontSize: 15 }}>VIEW THE DETAILS OF OTHERS FAMILY MEMBERS</Text>
                                </TouchableOpacity>
                            </View>
                        :
                        allMember.length > 1 && single == 0?
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <TouchableOpacity onPress={() => hideAllRecord()} style={styles.btndetails}>
                            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 15 }}>Go BACK FIRST MEMBER</Text>
                        </TouchableOpacity>
                    </View>
                    :null
                    }
                     {allMember.length>0 || currentUser.length>0?
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <TouchableOpacity onPress={() => getPdf()} style={styles.btndetails}>
                            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 15 }}>DOWNLOAD VOTER RECIPT</Text>
                        </TouchableOpacity>
                    </View>
                    :null}
                </View>
            </ScrollView>
        </View>
    );
};
export default Home;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        backgroundColor: "#fff"

    },
    Searchable: {
        borderBottomColor: "#000",
        borderBottomWidth: 1,
        width: "75%",
        fontSize: 18,
        color: "#000"

    },
    btnsearch: {
        // borderColor:"#000",
        // borderWidth:1,
        // backgroundColor:"#fff",
        marginLeft: 20,
        marginTop: 4,






    },
    btndetails: {


        backgroundColor: "#505762",

        width: "95%",
        alignSelf: 'center',
        borderRadius: 10,
        // marginTop: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.26,
        shadowRadius: 10,
        elevation: 9,



        padding: 12
    }

});