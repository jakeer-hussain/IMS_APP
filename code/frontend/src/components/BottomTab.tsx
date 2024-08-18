import React, {useEffect} from 'react';
import { View, Image, BackHandler, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/Dashboard/Dashboard';
import About from '../screens/About/About';
import Notification from '../screens/Notifications/Notifications';

const Tab = createBottomTabNavigator();

function BottomTab(): React.JSX.Element {

//   useEffect(() => {
    
//     const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
//         BackHandler.exitApp();
//         return true;
//     });

//     return () => backHandler.remove();
// }, []);

  return (
    <Tab.Navigator  >
      <Tab.Screen name="Home" component={Dashboard}
      options={{
        tabBarIcon: ({focused}) => (
            <View>
                <Image
                source = {require('../assets/icons/home.png')}
                resizeMode = 'contain'
                style={{
                    width: 25
                }}
                />
            </View>
        ), 
        headerShown: false, 
        tabBarStyle:{
            height: 50
        },
        tabBarLabelStyle:{
          fontSize: 14
        },
        
      }}
      />
      <Tab.Screen name="Notifications" component={Notification} 
      options={{
        tabBarIcon: ({focused}) => (
            <View>
                <Image 
                source = {require('../assets/icons/notification.png')}
                resizeMode = 'contain'
                style={{
                    width: 25
                }}
                />
            </View>
        ),
        tabBarStyle:{
          height: 50
      },
      tabBarLabelStyle:{
        fontSize: 14
      },
      }}
      />
      <Tab.Screen name="About" component={About} 
      options={{
        tabBarIcon: ({focused}) => (
            <View>
                <Image 
                source = {require('../assets/icons/info.png')}
                resizeMode = 'contain'
                style={{
                    width: 25
                }}
                />
            </View>
        ), 
        tabBarStyle:{
          height: 50
      },
      tabBarLabelStyle:{
        fontSize: 14
      },
      }}
      />
    </Tab.Navigator>
    );
};

export default BottomTab;
