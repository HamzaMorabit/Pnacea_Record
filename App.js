import React, {Component} from 'react';
import * as firebase from 'firebase';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ForgotPassword from './screens/ForgotPassword';
import { Image  } from 'react-native';

import Home from './screens/Home';
//  import { TouchableHighlight , TouchableOpacity, Text } from 'react-native';

import Loading from './screens/Loading';
import LogIn from './screens/LogIn';
import Account from './screens/screen_after_login/Account';
import EditProfil from './screens/screen_after_login/EditProfil';
import Maps from './screens/screen_after_login/Maps';
import Notifications from './screens/screen_after_login/Notifications';
import ResetPassword from './screens/screen_after_login/ResetPassword';
import Test from './screens/screen_after_login/Test';
import Searsh from './screens/screen_after_login/Searsh';
import SendPassword from './screens/SendPassword';
import SignUp from './screens/SignUp';
import SignUpGmail from './screens/SignUpGmail';
import Ionicons from "@expo/vector-icons"
// import headerLeftComponent from './screens/component/headerLeftComponent';

// import Icon from 'react-native-vector-icons/FontAwesome';
var firebaseConfig = {
  apiKey: "AIzaSyDmcfRCWfIWMEPNkX-JVqRxeMU72M1JgWY",
  authDomain: "myapp-80a7b.firebaseapp.com",
  databaseURL: "https://myapp-80a7b.firebaseio.com",
  projectId: "myapp-80a7b",
  storageBucket: "myapp-80a7b.appspot.com",
  messagingSenderId: "808651525934",
  appId: "1:808651525934:web:c1f13cd2fc25dc2d84f4bf"
};

//hadi dertha kan kaytela3 lya wahd l erreur bli rani aandi joj dyal firebase m installin
// 9albt aaliha o l9it hadi 
 if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// firebase.auth().onAuthStateChanged((user) => {
//   if(user){
//     this.setState({ loggedIn: true})
//   } else {
//     this.setState({loggedIn: false})
//   }
// })

const navig_test = createStackNavigator({
New_test:
{
  screen: Test,
  navigationOptions: {
    title: '',
    headerStyle: {
      backgroundColor: '#fff',
      elevation: 0
    },
    headerTitleStyle: {
      header: null,
    },
    headerLeft: null 
    
  },
},

})
    {/* <Image source={require('./images/gmailIcon1.png')}/> */}
function LogoTitle() {
  return (
    <Image
      style={{position:"relative",
        alignItems : "center",
      justifyContent:"center",
      left:120,
      top:-5,
      width: 150, height: 60 }}
      source={require('./images/logo1.png')}
    />
  );
}
const stack_home = createStackNavigator({
 
  Home:
  {
    screen: Home,
    navigationOptions: {
      // title: 'panacea',
      // headerStyle: {
      //   backgroundColor: '#fff',
      //   elevation: 1
      // },
      // headerTitleStyle: {
   
      //    left: 110,
      // },
      headerTitle :(
        <LogoTitle/>
    
      ),
      // tabBarIcon: ({ tintColor }) => {
      //   return (<Image
      //       style={{ width:2 50, height: 50 }}
      //       source={require('./images/gmailIcon1.png')}/>)
      //       },
        // tabBarIcon: (focused, tintColor) => (
        //   <Image style={{ width: 250, height: 250 }} 
        //          source={require('./images/gmailIcon1.png')} />
        // )
   
     
    }

    
  },

  

  SignUpGmail: {
    screen: SignUpGmail,
    navigationOptions: {
      title: 'Register',
      headerLeft: null,
      headerTitleStyle: {
       left: 110,
       fontSize:30
       // alignContent: 'center',
        // header: null,
      },
    },
  },
  // SignUpGmail: {
  //   screen: SignUpGmail,
  //   navigationOptions: {
  //     title: 'Sign up',

  //     headerTitleStyle: {
  //       // fontWeight: 'bold',
  //       left: 70,
  //     },
  //   },
  // },
  navig_maps:
  {
    screen: Maps,
    navigationOptions: {
      title: '',
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0
      },
      headerTitleStyle: {
        header: null,
      },
      headerLeft: null
    }
  },
  navig_account:
  {
    screen: Account,
    navigationOptions: {
      title: '',
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0
      },
      headerTitleStyle: {
        header: null,
      },
      headerLeft:   null,
      
      
    },
  },


  navig_searsh: {
    screen: Searsh,
    navigationOptions: {
      title: '',
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0
      },
      headerTitleStyle: {
        header: null,
      },
      headerLeft: null
    }
  },
  navig_notifactions: {
    screen: Notifications,
    navigationOptions: {
      title: '',
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0
      },
      headerTitleStyle: {
        header: null,
      },
      headerLeft: null
    }
  },
  navig_ResetPassword: {
    screen: ResetPassword,
    navigationOptions: {
      title: 'Update Password',
      headerLeft: null,
      // header: null,
      headerTitleStyle: {
        left: 80,
      },
   
    }
  },
  navig_EditProfil  :
  {
    screen: EditProfil,
    navigationOptions: {
      title: '',
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0
      },
      headerTitleStyle: {
        header: null,
      },
      headerLeft: null
      
    },
  },
})

const log_in = createStackNavigator({
  LogIn: {
    screen: LogIn,
    navigationOptions: {
      title: '',
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0
      },
      headerTitleStyle: {
      },
    },
  },

})

// },})
// stack concerne log in fin anb9a n naviguer bteween screen
const stack_log_in = createStackNavigator({


  LogIn: {
    screen: LogIn,
    navigationOptions: {
      title: '',
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0
      },
      headerTitleStyle: {
      },
    },
  },


  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: {
      title: 'Reset password',
      headerTitleStyle: {
        left: 40,
      },
    },
  },

  SendPasswordConfirm: {
    screen: SendPassword,
    navigationOptions: {
      title: 'Reset password',

      headerTitleStyle: {
        // fontWeight: 'bold',
        left: 40,
      },
    },
  },
  LogIn: {
    screen: LogIn,
    navigationOptions: {
      title: '',
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0
      },
      headerTitleStyle: {
      },
    },
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: 'Sign up',

      headerTitleStyle: {
        // fontWeight: 'bold',
        left: 70,
      },
    },
  },
  
  LogIn: {
    screen: LogIn,
    navigationOptions: {
      title: '',
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0
      },
      headerTitleStyle: {
      },
    },
  },
})


export default createAppContainer(
  createSwitchNavigator({

    Loading: Loading,
    log_in:log_in,
    stack_log_in: stack_log_in,
    //  SignUp_:SignUp_,
    navig_test : navig_test,
    // navig_EditProfil : navig_EditProfil,
    // LogIn : LogIn ,
    //Home : Home ,
    stack_home: stack_home,

  },
    {
    initialRouteName: "Loading"
    }
  )
)



 // elevation: 0
      // tabBarIcon: ({ focused, tintColor }) => {
      //   let iconName;

      //     iconName = 'ios-information-circle-outline';


      //   // You can return any component that you like here! We usually use an
      //   // icon component from react-native-vector-icons
      //   return <Ionicons name={iconName} size={25} color={tintColor} />;
      // },
      // tabBarOptions: {
      //   activeTintColor: 'tomato',
      //   inactiveTintColor: 'gray',
      // },
      // tabBarComponent: TabBarBottom,
      // tabBarPosition: 'bottom',
      // animationEnabled: false,
      // swipeEnabled: false,

      // tabBarIcon : () =><Ionicons
      // name="ios-home"
      // backgroundColor="#3b5998" Ionicons from @expo/vector-icons
      // color="red"
      // onPress={this.loginWithFacebook} />  
       // onPress={this.loginWithFacebook} />  
        // onPress={this.loginWithFacebook} />  
         // onPress={this.loginWithFacebook} />  
          // onPress={this.loginWithFacebook} />  
