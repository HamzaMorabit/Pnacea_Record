import { LinearGradient } from 'expo-linear-gradient';
import * as firebase from 'firebase';
import React, { Component } from 'react';
import { Alert, Picker, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';
import DataBasecomponent from './DataBase/DataBaseComponent';
import { YellowBox } from 'react-native';
import Loader from './Loader';
YellowBox.ignoreWarnings(['Setting a timer']);

export default class SignUp extends Component {

   state = {

      name: "",
      email: "",
      password: "",
      confirm_password: "",
      first_name: "",
      last_name: "",
      age: "",
      phone_number: "",
      checked: 'male',
      selectedValue: 'A+',


      error_msg_: null,
      error_msg_email: null,
      error_msg_pwd: null,
      error_msg_confim_pwd: null,
      first_name_error: null,
      last_name_error: null,
      error_msg_age: null,
      error_msg_phone: null,

      is_click_confirm: null,//lakherin bayenin hadi dertha hyt anbghy n afficher les erreurs façon dyanmique
      //mnin l user aydkhal ila mkontsh dayer hadi ay t aficha l messag leta7tf l code  atban mzn 
      loading: false,
      _insert_data: null,//for base donnee

   }


   componentWillUnmount = () => {
      console.log("componentWillUnmount Sing Up")
   }

   onLoginSuccess() {
      firebase.auth().signOut()
      console.log("gooofcreateUserWithEmailAndPassword ")
      this.props.navigation.navigate("stack_log_in")
   }

   handleSignUp = async () => {
      try {

         // firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)


         //$ const response = 
         await firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)

         //       await  firebase.auth().signOut() 
         //   console.log(" !!! !!! !!! !!! !!! !!! !!! ")   
         //       this.props.navigation.navigate("stack_log_in")
         //kaymshi loading bash ydkhal ana kankkhajo ywali mdeconnecter bash ydir sign in



      } catch (error) {
         console.log("erro Sign up  create User With Email And Password")
         //$this.props.navigation.navigate("stack_log_in")

         //erreur li kayun hena howa dak l gmail f l formlaire ykon sehih mais hena
         // la hyt y9edar ukon m staamlo onther user dkshu aalash momkin ykon aandi erreur
         // kandir navigation f blastiihyt par defaut kaymshi y naviguer  l login !!!!
         this.props.navigation.navigate("SignUp")
         this.setState({ error_msg_: error.message })
         this.setState({ loading: true })

         //Alert bash nzid n2dk aalih naviguer f blastiii 
         //kaymshi lya l if kayle9a deja aandi erreur kaydir   this.state._insert_data "null"
         //moraha kay executer hadi 
         //f cas mashy erreur kaymshy nishan y naviguer mkaydkhalsh l hena aslan so had alert maydirhash
         setTimeout(() => {
            this.setState({ loading: false })
            this.setState({ error_msg_email: error.message })

            if (this.state.error_msg_email == null)
               this.setState({ error_msg_email: "The email address is already in use by another account" })
            Alert.alert(
               'Email error',
               this.state.error_msg_email + "try again",
               [
                  {
                     text: 'Cancel',
                     onPress: () => { this.props.navigation.navigate("SignUp") },
                     style: 'cancel',
                  },
                  {
                     text: 'OK', onPress: () => {
                        console.log("Alert  press Ok");
                        //$ console.log(this.state._insert_data);
                        this.props.navigation.navigate("SignUp")
                     }
                  },
               ]
            );

         }, 5000);

         //$ console.error(error)
      }

      //$ console.log("this.state.error_msg_emai" + this.state.error_msg_emai)
      if (this.state.error_msg_ == null) {

         console.log("Sign up good")


      } else {
         console.log("Sign up null !!!!!!!")
         this.state._insert_data = null
      }

   }


   handleChangeText = (...args) => {


      switch (args[1]) {

         //chaque fois user kaydekhal kan afficher lih 
         //si email vide  -> error_msg_email: "Please fill this field
         //si tous ok  > error_msg_email: null
         //si error f l format dyal l email  - > error_msg_email: 'The email address is badly formatted
         //les autres same logic 'pwd age ..'
         case 'email': {
            if (args[0] == "") {
               this.setState({ error_msg_email: "Please fill this field" })
            } else {
               if (new RegExp(/^[\w.+\-]+@gmail\.com$/).test(args[0])) {
                  this.setState({ error_msg_email: null })
                  this.setState({ email: args[0] })
               } else {
                  this.setState({ error_msg_email: 'The email address is badly formatted.' })
               }
            }
            ; break;
         }

         case 'password': {
            if (args[0].length < 6) {
               if (args[0] == "") this.setState({ error_msg_pwd: "Please fill this field" })

               else { this.setState({ error_msg_pwd: 'The password must be 6 characters or more' }) }
            } else {
               this.setState({ error_msg_pwd: null })
               this.setState({ password: args[0] })
               if (args[0] == this.state.confirm_password) {
                  this.setState({ error_msg_confim_pwd: null })
               } else {
                  if (this.state.confirm_password != "")
                     this.setState({ error_msg_confim_pwd: 'The confirm password does not match' })
               }
            }
            ; break;
         }

         case 'confirm': {
            if (args[0] == '') {
               this.setState({ error_msg_confim_pwd: "Please fill this field" })
               //$ console.log(this.state.error_msg_confim_pwd);
            } else {
               if (args[0] != this.state.password) {
                  this.setState({ error_msg_confim_pwd: 'The confirm password does not match' })

               } else {
                  this.setState({ error_msg_confim_pwd: null })
                  this.setState({ confirm_password: args[0] })
               }
            }; break;
         }

         case 'first_name': {

            if (args[0] == '') {
               this.setState({ first_name_error: "Please fill this field" })
               //$ console.log(this.state.error_msg_confim_pwd);
            } else {
               if (!(new RegExp(/^[a-zA-Z ]+$/).test(args[0]))) {
                  this.setState({ first_name_error: 'The first name is badly formatted' })

               } else {
                  this.setState({ first_name_error: null })
                  this.setState({ first_name: args[0] })
               }
            }; break;
         }

         case 'last_name': {
            if (args[0] == '') {
               this.setState({ last_name_error: "Please fill this field" })
               //$ console.log(this.state.error_msg_confim_pwd);
            } else {
               if ((!new RegExp(/^[a-zA-Z ]+$/).test(args[0]))) {
                  this.setState({ last_name_error: 'The last name is badly formatted' })

               } else {
                  this.setState({ last_name_error: null })
                  this.setState({ last_name: args[0] })
               }
            }; break;
         }

         case 'age': {
            if (args[0] == '') {
               this.setState({ error_msg_age: "Please fill this field" })

            } else {
               if (new RegExp(/^(([1]{1}[0-9]{0,2})|([1-9]{1}[0-9]{0,1}))$/).test(args[0])) {
                  this.setState({ error_msg_age: null })
                  // $console.log('kkk ')
                  this.setState({ age: args[0] })
               } else {
                  this.setState({ error_msg_age: 'The age is badly formatted' })
               }
            }; break;
         }

         case 'phone': {
            //maroc
            if (new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/).test(args[0])) {
               //$ ((0[0-9])[\-]([0-9]{2}[\-]){3}(([0-9]){2})){1}

               this.setState({ error_msg_phone: null })
               //si une seul verifier return true s-il depass 06-10..92 22 

            } else if (args[0] == '') {
               this.setState({ error_msg_phone: 'Please fill this field' })

            } else {
               this.setState({ error_msg_phone: "The phone number is badly formatted " })
            }; break;
         }

         default: { console.log('default'); break; }
      }
   }


   handl_confirm = async () => {

      let { age, first_name, last_name, email, password, phone_number, confirm_password
      } = this.state;
      this.setState({ is_click_confirm: true })

      if (email == "") this.state.error_msg_email = 'Please fill this field';
      //$ this.setState({error_msg_email: 'Please fill this field'}) } 
      if (password == "") this.state.error_msg_pwd = 'Please fill this field'
      if (confirm_password == "") this.state.error_msg_confim_pwd = 'Please fill this field'
      if (first_name == "") this.state.first_name_error = 'Please fill this field'
      if (last_name == "") this.state.last_name_error = 'Please fill this field'
      if (age == "") this.state.error_msg_age = 'Please fill this field'
      if (phone_number == "") this.state.error_msg_phone = 'Please fill this field'

      //$ console.log(this.state.error_msg_email)

      // if (this.state.error_msg_email == null
      //    && this.state.error_msg_pwd == null) {
      //    this.state._insert_data = "true"
      //    //$ this.state._delet_data = null

      //    await this.handleSignUp()
      // }

      //tous est valider  (error_msg_email, ... ) rest null
      if (this.state.error_msg_email == null
         && this.state.error_msg_confim_pwd == null
         && this.state.error_msg_pwd == null
         && this.state.first_name_error == null && this.state.last_name_error == null && this.state.error_msg_age == null && this.state.error_msg_phone == null
      ) {

         /*  $ // console.log("email :" + email)
           // console.log("password :" + password)
           // console.log("confirm_password :" + confirm_password)
           // console.log("first_name :" + first_name)
           // console.log("last_name :" + last_name)
           // console.log("age :" + age)
           //$ console.log("phone_number :" + phone_number)
           // console.log("checked :" + checked)
           //$ console.log("selectedValue :" + selectedValue)
           //console.log("correct") $*/


         //bash n inserer f base donne car et l'insertion si ila mkansh l user aandi  deja 
         this.state._insert_data = "true"

         setTimeout(() => { this.handleSignUp() }, 2000)
      }

   }









   render() {

      const {
         // _delet_data,
         selectedValue, _insert_data, error_msg_age, checked, age, is_click_confirm, first_name_error, last_name_error,
         first_name, last_name, email, password, phone_number, error_msg_email, error_msg_pwd
         , error_msg_confim_pwd, confirm_password, error_msg_phone
      } = this.state;

      return (
         <View style={styles.container}>
            <Text style={styles.greeting}></Text>
            <Loader
               loading={this.state.loading} />
            <ScrollView contentContainerStyle={styles.contentContainer}>

               {/* // email */}
               {/* l methde bash khedmat hena  b7al lakhrin same logic
                  ila kan aandi error null o deja clikit aala confirm anghyr style o n afficher
                   textError 'error_msg_email'
                  this.handleChangeText(email, 'email') bash yykon aandi dkshy dynamiq  
                  dert email hyt f dak l methode selon type kandir changement*/}
               <View style={{ marginTop: 10 }}>
                  <Text style={styles.etoilText}>*</Text>
                  <TextInput style={error_msg_email != null && is_click_confirm ? styles.inputErrorStyle : styles.input}
                     autoCapitalize="none"
                     placeholder="email"
                     onChangeText={email => {
                        this.setState({ email })
                        this.handleChangeText(email, 'email')
                     }}
                     keyboardType="email-address"
                     value={email}
                  ></TextInput>

                  {/* {this.state.error_msg_email != null && this.state.is_click_confirm ? (<Text style={styles.errorEmail}>{this.state.error_msg_email}</Text>) : (null)} */}
               </View>
               {error_msg_email != null && is_click_confirm ? (<Text style={styles.errorTextStyle}>{error_msg_email}</Text>) : (<Text style={styles.errorTextStyle}></Text>)}


               {/* // password */}
               <View style={{ marginTop: 10 }}>
                  <Text style={styles.etoilText}>*</Text>
                  <TextInput style={error_msg_pwd != null && is_click_confirm ? styles.inputErrorStyle : styles.input} secureTextEntry
                     autoCapitalize="none"
                     placeholder="password"
                     onChangeText={password => {
                        this.setState({ password })
                        this.handleChangeText(password, 'password')
                     }}

                     value={password}
                  ></TextInput>
               </View>
               {error_msg_pwd != null && is_click_confirm ? (<Text style={styles.errorTextStyle}>{error_msg_pwd}</Text>) : (<Text style={styles.errorTextStyle}></Text>)}



               {/* // Cofirm password */}
               <View style={{ marginTop: 10 }}>
                  <Text style={styles.etoilText}>*</Text>
                  <TextInput style={error_msg_confim_pwd != null && is_click_confirm ? styles.inputErrorStyle : styles.input}
                     secureTextEntry
                     autoCapitalize="none"
                     placeholder="confirm password"
                     onChangeText={confirm_pwd_val => {
                        this.setState({ confirm_password: confirm_pwd_val })
                        this.handleChangeText(confirm_pwd_val, 'confirm')
                     }}
                     value={confirm_password}
                  ></TextInput>
               </View>
               {error_msg_confim_pwd != null && is_click_confirm ? (<Text style={styles.errorTextStyle}>{error_msg_confim_pwd}</Text>) : (<Text style={styles.errorTextStyle}></Text>)}



               {/* // First Name */}
               <View style={{ marginTop: 10 }}>
                  <Text style={styles.etoilText}>*</Text>
                  <TextInput
                     style={first_name_error != null && is_click_confirm ? styles.inputErrorStyle : styles.input}
                     value={first_name}
                     placeholder="First Name"
                     onChangeText={first_name => {
                        this.setState({ first_name })
                        this.handleChangeText(first_name, 'first_name')
                     }} ></TextInput>
               </View>
               {first_name_error != null && is_click_confirm ? (<Text style={styles.errorTextStyle}>
                  {first_name_error}</Text>) : (<Text style={styles.errorTextStyle}></Text>)}


               {/* // last name */}
               <View style={{ marginTop: 10 }}>
                  {/* <Text style={styles.inputTitle}>Email Address </Text> */}
                  <Text style={styles.etoilText}>*</Text>
                  <TextInput
                     style={last_name_error != null && is_click_confirm ? styles.inputErrorStyle : styles.input}
                     // autoCapitalize="none"
                     placeholder="Last Name"
                     onChangeText={last_name => {
                        this.setState({ last_name })
                        this.handleChangeText(last_name, 'last_name')
                     }}
                     value={last_name}
                  ></TextInput>
               </View>
               {last_name_error != null && is_click_confirm ? (<Text style={styles.errorTextStyle}>{last_name_error}</Text>) : (<Text style={styles.errorTextStyle}></Text>)}

               {/* // phone number */}
               <View style={{ marginTop: 10 }}>
                  <Text style={styles.etoilText}></Text>
                  {/* <Text style={styles.inputTitle}>Email Address </Text> */}
                  <TextInput
                     style={error_msg_phone != null && is_click_confirm ? styles.inputErrorStyle : styles.input}
                     keyboardType="numeric"
                     placeholder="Phone number"
                     onChangeText={(phone_number) => {
                        this.setState({ phone_number })
                        this.handleChangeText(phone_number, 'phone')
                     }}
                     // onChangeText={email => { this.setState({ email }) }}
                     value={phone_number}
                  ></TextInput>
               </View>
               {error_msg_phone != null && is_click_confirm ? (<Text style={styles.errorTextStyle}>{error_msg_phone}</Text>) : (<Text style={styles.errorTextStyle}></Text>)}


               {/* // age  */}
               <View style={{ marginTop: 10 }}>
                  {/* <Text style={styles.inputTitle}>Password</Text> */}
                  <Text style={styles.etoilText}></Text>
                  <TextInput
                     style={error_msg_age != null && is_click_confirm ? styles.inputAgeError : styles.inputAge}
                     onChangeText={(age) => {
                        this.setState({ age })
                        this.handleChangeText(age, 'age')
                     }}
                     autoCapitalize="none"
                     placeholder="Age"
                     keyboardType="numeric"
                     // onChangeText={password => { this.setState({ password }) }}
                     value={age}
                  ></TextInput>

               </View>
               {error_msg_age != null && is_click_confirm ? (<Text style={styles.errorTextStyle}>{error_msg_age}</Text>) : (<Text style={styles.errorTextStyle}></Text>)}


               {/* // RadioButton */}
               <View style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 30, flexDirection: 'row'
               }}>
                  <Text style={{ left: 8, marginRight: 40 }}>Gender</Text>
                  <RadioButton
                     // style={{ backgroundColor: this.state.checked ? 'red' : 'white' }}
                     color="#6979F8"
                     style={{ color: "red" }}
                     // style={{ marginRight: 20 }}
                     value="male"
                     status={checked === 'male' ? 'checked' : 'unchecked'}
                     onPress={() => { this.setState({ checked: 'male' }); }}
                  />
                  <Text style={{ marginRight: 20 }}>Male</Text>
                  <RadioButton
                     color="#6979F8"
                     value="female"
                     status={checked === 'female' ? 'checked' : 'unchecked'}
                     onPress={() => { this.setState({ checked: 'female' }); }}
                  />
                  <Text style={{ marginRight: 40 }}>Female</Text>
               </View>


               {/* Picker */}
               <View style={{
                  justifyContent: 'center',
                  alignItems: 'center', marginTop: 30, flexDirection: 'row'
               }}>
                  <Text style={{ marginRight: 17, left: 12 }}>Blood Type</Text>

                  <Picker
                     selectedValue={this.state.selectedValue}
                     style={{ height: 50, marginRight: 120, width: 95 }}
                     onValueChange={(itemValue) => { this.setState({ selectedValue: itemValue }) }}
                  >
                     <Picker.Item label="A+" value="A+" />
                     <Picker.Item label="B+" value="B+" />
                     <Picker.Item label="O+" value="O+" />
                     <Picker.Item label="AB+" value="AB+" />
                     <Picker.Item label="A-" value="A-" />
                     <Picker.Item label="B-" value="B-" />
                     <Picker.Item label="O-" value="O-" />
                     <Picker.Item label="AB-" value="AB-" />
                  </Picker>
               </View>



               {/* Confirm button */}
               <View style={{ marginTop: 10 }}>
                  <TouchableOpacity
                     onPress={() => { this.handl_confirm(); }}

                     style={styles.buttom1}>
                     <LinearGradient start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        locations={[0.0, 100]}
                        colors={['#8461c9', '#BD7AE3']}
                        style={styles.gradient}>
                        <Text style={{ color: "#fff" }}>Confirm</Text>

                     </LinearGradient>
                  </TouchableOpacity>
               </View>


            </ScrollView>


            {/* {si _insert_data deffranc de null kan ajouter f l base donn  dkshy kansyfto f data 
            li hya tableau o kandir f lawl dyaleha type wash l insert ola delet bash nlshy l component
            dyali n tchecki type bash naarf wash an inser ola an delet */}
            {(_insert_data != null) ? (<DataBasecomponent
               navigation={this.props.navigation}
               data={["insert", email, "false", first_name, last_name, phone_number
                  , age, checked, selectedValue]} />) : (null)}

            {/* {si l user deja kan kan supprimih men l base donn o kan passi ghyr gmail o howa
             f  kay9alb aalih b gmail  o kaysprimih} */}
            {/* {(_delet_data != null) ? (<DataBasecomponent data={["delet", email, password]} />) : (null)} */}

         </View>

      );

   }


}

const styles = StyleSheet.create({

   container: {
      alignItems: "center",
      flex: 1,
      backgroundColor: 'white'
   },
   errorChecked: {
      backgroundColor: 'rgba(0,0,0,0.6)',
   },
   contentContainer: {
      // padding: 20,

   },

   gradient: {
      width: 230,
      height: 47,

      flex: 1,
      borderRadius: 3,
      justifyContent: 'center',
      alignItems: 'center',
      // borderRadius: 10
   },

   buttom1: {
      // marginHorizontal: 30,
      // backgroundColor: "#8A8F9E",
      borderRadius: 4,
      height: 45,
      marginTop: 50, marginBottom: 10,
      alignItems: "center",
      justifyContent: "center",
      // top: 85,
   },

   etoilText: {
      top: 34,
      left: 270
   },

   greeting: {
      marginTop: 10,
      fontSize: 22,
      fontWeight: "400",
      textAlign: "center"
   },

   errorTextStyle: {
      color: "#E9446A",
      left: 12,
      marginTop: -10
   },

   errorMessage: {
      height: 72,
      alignItems: "center",
      justifyContent: 'center',
      marginHorizontal: 30
   },


   form: {
      marginBottom: 48,
      marginHorizontal: 30,
   },

   input: {
      // textTransform: "uppercase",
      width: 300,
      borderRadius: 25,
      paddingHorizontal: 16,
      fontSize: 16,
      color: '#161F30',
      marginVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#CFCFCF',
      alignItems: "center",
      // left: 25,
   },

   inputErrorStyle: {
      width: 300,
      borderRadius: 25,
      paddingHorizontal: 16,
      fontSize: 16,
      color: '#161F30',
      marginVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'red',

      alignItems: "center",
   },

   inputAge: {
      // textTransform: "uppercase",
      width: 90,
      borderRadius: 25,
      paddingHorizontal: 16,
      fontSize: 16,
      color: '#161F30',
      marginVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#CFCFCF',

      alignItems: "center",
   },

   inputAgeError: {
      // textTransform: "uppercase",
      width: 90,
      borderRadius: 25,
      paddingHorizontal: 16,
      fontSize: 16,
      color: '#161F30',
      marginVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'red',

      alignItems: "center",
   },

   buttom: {
      // marginHorizontal: 30,
      // backgroundColor: "#8A8F9E",
      borderRadius: 4,
      height: 45,
      alignItems: "center",
      justifyContent: "center",
      top: 85,
   },

});
