/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Welcome from './screens/Welcome/WelcomeScreen';
import Login from './screens/Login/Login';
import Dashboard from './screens/Dashboard/Dashboard';
import LeaveApplication from './screens/LeaveApplication/LeaveApplication';
import BottomTab from './components/BottomTab';
import About from './screens/About/About';
import Notification from './screens/Notifications/Notifications';
import ProfileDetails from './screens/Profile/ProfilePage';
import BankDetails from './screens/Profile/BankDetails';
import EditBankDetails from './screens/Profile/EditBank';
import Sidebar from './components/Sidebar';
import SidebarDisplay from './components/SideBarDisplay';
import NoNetwork from './screens/Error/NoNetwork';
import MyLeaveRequests from './screens/LeaveApplication/components/MyLeaveRequests';
import Transcript from './screens/Transcript/Transcript';
import ViewAttendance from './screens/Attendance/Attendance';
import CourseAttendanceView from './screens/Attendance/CourseAttendanceView';

import * as types from './custom-types';

const Stack = createNativeStackNavigator<types.RootStackParamList>();

/* TODO:
add typing: https://reactnavigation.org/docs/typescript/
*/

function Navigation(): React.JSX.Element {
  return (
    <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
            headerBackImageSource: require('./assets/icons/back.png'),
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerTitleStyle: { fontSize: 16, fontWeight: "bold" },
          }}
          >
            <Stack.Screen name="WelcomeScreen" component={Welcome} options={{  headerShown: false}} />
            <Stack.Screen name="NoInternet" component={NoNetwork} options={{  headerShown: false}} />
            <Stack.Screen name="LoginScreen" component={Login} options={{  headerShown: false}} />
            <Stack.Screen name="SidebarDisplay" component={SidebarDisplay} options={{  headerShown: false}} />
            <Stack.Screen name="Sidebar" component={Sidebar} options={{ headerShown: false }}/>
            <Stack.Screen name="BottomTab" component={BottomTab} options={{  headerShown: false,headerBackVisible: false, headerBackTitleVisible: false}}/>
            <Stack.Screen name="ProfileDetails" component={ProfileDetails} options={{ title: 'Profile Details'}}/>
            <Stack.Screen name="BankDetails" component={BankDetails} options={{ headerShown: false, headerBackVisible: false, headerBackTitleVisible: false}} />
            <Stack.Screen name="EditBankDetails" component={EditBankDetails} />
            <Stack.Screen name="DashboardScreen" component={Dashboard} options={{  headerShown: false, headerBackTitleVisible: false}}/>
            <Stack.Screen name="LeaveApplicationScreen" component={LeaveApplication} options={{ title: 'Apply for Leave'}}/>
            <Stack.Screen name="MyLeaves" component={MyLeaveRequests} options={{ title: 'My Leave Requests'}}/>
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="MyTranscript" component={Transcript} options={{ title: 'My Transcript'}}/>
            <Stack.Screen name="MyAttendance" component={ViewAttendance} options={{ title: 'My Attendance'}}/>
            <Stack.Screen name="CourseAttendance" component={CourseAttendanceView} options={{ title: 'Course Attendance'}}/>
            <Stack.Screen name="Notifications" component={Notification} />
        </Stack.Navigator>

    </NavigationContainer>
    );
}

export default Navigation;
