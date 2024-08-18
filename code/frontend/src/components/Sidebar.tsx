import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import BottomTab from './BottomTab';
import { useNavigation } from '@react-navigation/native';
import LogOut from './LogOut';
import Notification from '../screens/Notifications/Notifications';
import About from '../screens/About/About';
import Transcript from '../screens/Transcript/Transcript';
import Attendance from '../screens/Attendance/Attendance';


const CustomHeader = () => {
  const navigation = useNavigation();

  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#231542', padding: 10 }}>
      <TouchableOpacity onPress={handleDrawerPress}>
        <Image
          source={require('../assets/icons/3_lines.jpg')}
          style={{ width: 30, height: 30, marginLeft: 10 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={{ fontSize: 18, color: '#ffffff',fontWeight: 'bold', marginLeft: 80, }}>IIIT Hyderabad</Text>
      <Image
        source={require('../assets/icons/IIIT_Logo2.png')}
        style={{ width: 80, height: 50, marginLeft: 25 }}
        resizeMode="contain"
      />
    </View>
  );
};

const Drawer = createDrawerNavigator();

const Seperator = () => <View style={styles.separator} />;

function Sidebar() {

  // // console.log(userEmail);
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      screenOptions={{
        header: () => <CustomHeader />,
        drawerStyle: {
          backgroundColor: '#231542',
          width: 240,
        },
        headerTitleStyle: {
          fontFamily: 'Quicksand-Light'
        },
      }}
    >
      <Drawer.Screen name="Dashboard" component={BottomTab}
			options={{ headerTitle: 'IIIT H', drawerActiveTintColor: '#ffffff', drawerInactiveTintColor: '#ffffff'}}/>


      <Drawer.Screen name="Notifications" component={Notification} options={{drawerActiveTintColor: '#ffffff', drawerInactiveTintColor: '#ffffff'}} />


      <Drawer.Screen name="Attendance" component={Attendance} options={{drawerActiveTintColor: '#ffffff', drawerInactiveTintColor: '#ffffff'}} />

      <Drawer.Screen name="Transcript" component={Transcript} options={{drawerActiveTintColor: '#ffffff', drawerInactiveTintColor: '#ffffff'}} />

      <Drawer.Screen name="About" component={About} options={{drawerActiveTintColor: '#ffffff', drawerInactiveTintColor: '#ffffff'}} />




      <Drawer.Screen name="Log Out" component={LogOut} options={{drawerActiveTintColor: '#ffffff', drawerInactiveTintColor: '#ffffff'}} />


    </Drawer.Navigator>
  );
}


const styles = StyleSheet.create({
 separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});

export default Sidebar;
