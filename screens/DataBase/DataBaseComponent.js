
import React, { Component } from 'react';
import { View } from 'react-native';
import * as firebase from 'firebase';
// import 'firebase/auth';
// import 'firebase/database';
export default class DataBasecomponent extends Component {
    // constructor(props) {
    //     super(props);
    constructor(props) {
        super(props);
        global.errorReset = "falsccce";
        global.MessagError = '';
        // this.forceUpdate();
        // this.render();
        // this.getDataOfUSer = this.getDataOfUSer.bind(this);
        this.state = {
            user_data_email: '',
            userForgmail: '',
            user_data_firstName: '',
            user_data_lastName: '',
            user_data_Gendre: '',
            user_data_blood_type: '',
            user_data_phoneNumber: '',
            user_data_age: '',
            user_data_id: '',
        }
    };
    // state = {
    //     user_data_email: '',
    //     user_data_password: '',
    //     user_data_firstName: '',
    //     user_data_lastName: '',
    //     user_data_Gendre: '',
    //     user_data_blood_type: '',
    //     user_data_phoneNumber: '',
    //     user_data_age: '',
    //     user_data_id: '',
    // }
    // console.log(props)
    // }



    componentDidMount = async () => {

        console.log('Im into componentDidMount DataBase')
       
        // console.log(typeof (this.props.data) + "mmmmm")
        // console.log(typeof (this.props.data) + " typeOf data")
        // if ("undefined" == typeof (this.props.data)) return;
        if (this.props.data[0] == "get_data") {
            try {
                console.log('call getDataOfUSer  DataBase  '),
                    await this.getDataOfUSer();
            }
            catch (error) { console.log('error getDataOfUSer') }

        }

        else if (this.props.data[0] == "insert") {
            try {
                console.log('i appel function INSERTED in DataBase!');
                await this.addUserInDataBase()
            }
            catch (error) { console.log('error n INSERTED in DataBase ') }
        }

        else if (this.props.data[0] == "get_data_for_gmail") {
            console.log(" call get_data_for_gmail")
            // // global.errorReset = "ooo";
            this.getDataforUSerGmail()
        }
        else if (this.props.data[0] == "get_dataEdit") {

            try {
                console.log('call getDataOfUSerEdit  DataBase  ')
                await this.getDataOfUSerEdit();
            }
            catch (error) { console.log('error getDataOfUSer') }

        } else if (this.props.data[0] == "insert_dataEdit") {
            console.log('call insert_dataEdit  DataBase  ')
            this.addUserEdit()
            // if(this.props.data[0] == "The email addre")
            //kan pass lih gmail bash ysepprimi lya l user selon email et password
            // this.deletUserInDataBase(this.props.data[1], this.props.data[2])
        } else { console.log('Else !!! ') }

        // else if (this.props.data[0] == "delet") {
        //     console.log(' call Deleted  DataBase !! ')

        //     // this.deletUserInDataBase(this.props.data[1], this.props.data[2])
        // } 


    }

    getDataforUSerGmail = async () => {

        firebase.database().ref('users').on('value', data => {
            data.forEach((item) => {
                // console.log(this.props.data[1])
                if (item.val().email == this.props.data[1]) {
                    console.log("Existe ")
                    this.state.user_data_password = item.val().password

                }
            })
            console.log(this.state.user_data_password + " : password")
            // console.log( this.state.user_data_password + "$$$")
            this.props.navigation.navigate("log_in", {

                password: this.state.user_data_password,

            })
        })
    }

    getDataOfUSerEdit = async () => {
        // console.log( this.props.data + " : data ")
        // window.location.reload(false);
        // const {user_data_firstName} = this.state ; 
        console.log(this.props.data[1] + " data1 ")
        // this.setState({ data: 'kkkkkkkkk' }) 
        await firebase.database().ref('users').on('value', data => {
            data.forEach((item) => {
                // console.log(this.props.data[1])
                if (item.val().email == this.props.data[1]) {
                    console.log(item.val().email + "tem.val().email ")
                    console.log(item.val().id + "The id  of element i found ")
                    this.state.user_data_email = item.val().email
                    this.state.userForgmail = item.val().userForgmail
                    this.state.user_data_firstName = item.val().firstName
                    this.state.user_data_lastName = item.val().lastName
                    this.state.user_data_phoneNumber = item.val().phoneNumber
                    this.state.user_data_age = item.val().age
                    this.state.user_data_Gendre = item.val().gendre
                    this.state.user_data_blood_type = item.val().bloodType
                    this.state.user_data_id = item.val().id

                }
            })



            // console.log( this.state.user_data_password + "$$$")
            this.props.navigation.navigate("navig_EditProfil", {
                email: this.state.user_data_email,
                userForgmail: this.state.userForgmail,
                firstName: this.state.user_data_firstName,
                lastName: this.state.user_data_lastName,
                phoneNumber: this.state.user_data_phoneNumber,
                age: this.state.user_data_age,
                gendre: this.state.user_data_Gendre,
                blood_type: this.state.user_data_blood_type,
                id: this.state.user_data_id
            })
        })
    }


    addUserEdit = async () => {
        // console.log('INSERTED !');
        await firebase.database().ref('users').on('value', data => {
            data.forEach((item) => {

                if (item.val().email == this.props.data[1]) {
                    console.log("users/user_" + item.val().id)

                    var path = "users/user_" + item.val().id
                    // this.props.data[1] = "user in base donne"
                    setTimeout(() => {
                        firebase.database().ref(path).set({
                            email: item.val().email,
                            userForgmail: item.val().userForgmail,
                            firstName: this.props.data[3],
                            lastName: this.props.data[4],
                            phoneNumber: this.props.data[5],
                            age: this.props.data[6],
                            gendre: this.props.data[7],
                            bloodType: this.props.data[8],
                            id: item.val().id,
                        }
                        ).then(() => {

                        }).catch((error) => {
                            console.log(error);
                        });

                    }, 2000);
                    return;
                }
            })
        }
        )

    }


    getDataOfUSer = async () => {
        // console.log( this.props.data + " : data ")
        // window.location.reload(false);
        // const {user_data_firstName} = this.state ; 
        //  console.log(this.props.data)
        // this.setState({ data: 'kkkkkkkkk' }) 
        await firebase.database().ref('users').on('value', data => {
            data.forEach((item) => {
                // console.log(this.props.data[1])
                if (item.val().email == this.props.data[1]) {

                    console.log(item.val().id + "The id  of element i found ")
                    this.state.user_data_email = item.val().email
                    this.state.userForgmail = item.val().userForgmail
                    this.state.user_data_firstName = item.val().firstName
                    this.state.user_data_lastName = item.val().lastName
                    this.state.user_data_phoneNumber = item.val().phoneNumber
                    this.state.user_data_age = item.val().age
                    this.state.user_data_Gendre = item.val().gendre
                    this.state.user_data_blood_type = item.val().bloodType
                    this.state.user_data_id = item.val().id

                }
            })



            // console.log( this.state.user_data_password + "$$$")
            this.props.navigation.navigate("navig_account", {
                email: this.state.user_data_email,
                userForgmail: this.state.userForgmail,
                firstName: this.state.user_data_firstName,
                lastName: this.state.user_data_lastName,
                phoneNumber: this.state.user_data_phoneNumber,
                age: this.state.user_data_age,
                gendre: this.state.user_data_Gendre,
                blood_type: this.state.user_data_blood_type,
                id: this.state.user_data_id
            })
        })
    }


    addUserInDataBase = () => {
        // console.log('INSERTED !');
        var exist = false;
        firebase.database().ref('users').on('value', data => {
            data.forEach((item) => {

                if (item.val().email == this.props.data[1].toLowerCase()) {
                    console.log("Existe user  !!! ")
                    this.props.data[1] = "user in base donne"
                    exist = true
                    return;
                }
            })
        }
        )

        if (!exist) {
            console.log("success insert ")
            var id_ = parseInt(Math.random() * 100) + parseInt(Math.random() * 50) + parseInt(Math.random() * 50),
                path = "users/user_" + id_
            setTimeout(() => {
                // console.log(this.props.data[1]);
                // console.log(this.props.data[1].toLowerCase());
                firebase.database().ref(path).set({

                    email: this.props.data[1].toLowerCase(),
                    userForgmail: this.props.data[2],
                    firstName: this.props.data[3],
                    lastName: this.props.data[4],
                    phoneNumber: this.props.data[5],
                    age: this.props.data[6],
                    gendre: this.props.data[7],
                    bloodType: this.props.data[8],
                    id: id_,
                }
                ).then(() => {

                }).catch((error) => {
                    console.log(error);
                });

            }, 2000);
        } else {
            console.log("error insert => user in dataBase ")
        }
    }


    // deletUserInDataBase = (email_delet, password_delet) => {
    //     firebase.database().ref('users').on('value', data => {
    //         data.forEach((item) => {

    //             if (item.val().email == email_delet && item.val().password == password_delet) {
    //                 // console.log(item.val().id + "ppp")
    //                 console.log('Deleted  Success')
    //                 // console.log(item.val().email+" : Emaildeleted ******************")
    //                 var path = 'users/user_' + item.val().id
    //                 firebase.database().ref(path).remove();
    //             }
    //         })
    //     }
    //     )
    // }

    render() {


        return (
            <View>

            </View>
        );
    }
}

    // getDataOfUSerEdit = async () => {
    //     // console.log( this.props.data + " : data ")
    //     // window.location.reload(false);
    //     // const {user_data_firstName} = this.state ; 
    //     //  console.log(this.props.data)
    //     // this.setState({ data: 'kkkkkkkkk' }) 
    //     await firebase.database().ref('users').on('value', data => {
    //         data.forEach((item) => {
    //             // console.log(this.props.data[1])
    //             if (item.val().email == this.props.data[1]) {

    //                 console.log(item.val().id + "The id  of element i found ")
    //                 this.state.user_data_email = item.val().email
    //                 this.state.userForgmail = item.val().userForgmail
    //                 this.state.user_data_firstName = item.val().firstName
    //                 this.state.user_data_lastName = item.val().lastName
    //                 this.state.user_data_phoneNumber = item.val().phoneNumber
    //                 this.state.user_data_age = item.val().age
    //                 this.state.user_data_Gendre = item.val().gendre
    //                 this.state.user_data_blood_type = item.val().bloodType
    //                 this.state.user_data_id = item.val().id

    //             }
    //         })



    //          console.log(    this.state.user_data_id + "$$$")
    //         this.props.navigation.navigate("navig_EditProfil", {
    //             email: this.state.user_data_email,
    //             userForgmail: this.state.userForgmail,
    //             firstName: this.state.user_data_firstName,
    //             lastName: this.state.user_data_lastName,
    //             phoneNumber: this.state.user_data_phoneNumber,
    //             age: this.state.user_data_age,
    //             gendre: this.state.user_data_Gendre,
    //             blood_type: this.state.user_data_blood_type,
    //             id: this.state.user_data_id
    //         })
    //     })
    // }







//pour  calculer che7Al aandi f l base donne count_users
        // var count_users = 0, path;
        // firebase.database().ref('users').on('value', data_item => {
        //     data_item.forEach(() => { count_users += 1; })

        // })

        // var m = (Math.random() * 100)

        // path = "users/user_" + ++(count_users) +  parseInt(m)
        // console.log(count_users + "count_users");

        //To Await 5 seconds to insert a new user


// import React from 'react';
// import { View, Text } from 'react-native';
// import firebase from 'firebase';

// class App extends React.Component {

//     componentWillMount() {

//         // To Configure react native app with cloud of Google Firebase database !
//         var config = {
//             apiKey: "AIzaSyCCrQklY2JOaLbyriwCcnyW76SBRP_jh94",
//             authDomain: "reactnativedatabase-29573.firebaseapp.com",
//             databaseURL: "https://reactnativedatabase-29573.firebaseio.com",
//             projectId: "reactnativedatabase-29573",
//             storageBucket: "",
//             messagingSenderId: "1003641028384"
//         };
//         firebase.initializeApp(config);

//         // To select data from firebase every time data has changed !
//         firebase.database().ref('users').on('value', (data) => {
//             console.log(data.toJSON());
//         })

//         // To Await 5 seconds to insert a new user
//         setTimeout(() => {
//             firebase.database().ref('users/004').set(
//                 {
//                     name: 'Pheng Sengvuthy 004',
//                     age: 24
//                 }
//             ).then(() => {
//                 console.log('INSERTED !');
//             }).catch((error) => {
//                 console.log(error);
//             });
//         }, 5000);

//         // To Update a user
//         firebase.database().ref('users/004').update({
//             name: 'Pheng Sengvuthy'
//         });

//         // To Remove a user
//         firebase.database().ref('users/004').remove();

//     }

//     render() {
//         return (
//             <View style={{ alignItems: 'center', height: '100%', justifyContent: 'center' }}>
//                 <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
//                     Welcome To ------>
//                     {'\n'}Our Google Firebase Database !
//                 </Text>
//             </View>
//         )
//     }
// }

// export default App;