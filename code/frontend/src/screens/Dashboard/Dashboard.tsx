import React from 'react';
import { SafeAreaView, View, Image, StyleSheet, Text, TouchableOpacity, ImageBackground,ScrollView } from 'react-native';
import global from '../../styles/global';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HIMESSAGE from './components/HiMessage';
import CourseTable from './components/CourseTable';
import { userMail, userType } from '../Login/Login';
import { UserTypes } from '../../custom-types';
// import { ScrollView  } from 'react-native-gesture-handler';



import * as types from '../../custom-types';

function Dashboard({ route, navigation }: types.DashboardScreenProps): React.JSX.Element {


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <HIMESSAGE />
      <SafeAreaView style={styles.vertical_2}>
        <SafeAreaView>
          <Image source={require('../../assets/icons/profile.png')} resizeMode='contain' style={styles.dashboard_parent_section} />
        </SafeAreaView>
        <Text style={styles.dashboard_parent_title}>
          My Profile
        </Text>
      </SafeAreaView>

      <SafeAreaView style={styles.vertical}>

          {userType === UserTypes.Student || userType === UserTypes.Faculty || userType === UserTypes.Staff ?
          <TouchableOpacity onPress={() => navigation.navigate("ProfileDetails")}>
            <View style={{ alignItems: "center" }}>
              <Image source={require('../../assets/icons/general.png')} resizeMode='contain' style={styles.dashboard_children_section} />
              <Text style={{ marginTop: 7, color: "#000000" }}>
                Profile
              </Text>
            </View>
          </TouchableOpacity>
          : null}

          {userType === UserTypes.Student || userType === UserTypes.Faculty || userType === UserTypes.Staff ?
          <TouchableOpacity onPress={() => navigation.navigate("BankDetails")}>
            <View style={{ alignItems: "center" }}>
              <Image source={require('../../assets/icons/piggy.png')} resizeMode='contain' style={styles.dashboard_children_section} />
              <Text style={{ marginTop: 7, color: "#000000" }}>
                Bank Details
              </Text>
            </View>
          </TouchableOpacity>
          : null}
      </SafeAreaView>


      {/* Second Row */}
        <SafeAreaView style={styles.vertical_2}>
          <SafeAreaView>
            <Image source={require('../../assets/icons/features.png')} resizeMode='contain' style={styles.dashboard_parent_section} />
          </SafeAreaView>
          <Text style={styles.dashboard_parent_title}>
            Features
          </Text>
        </SafeAreaView>

        <SafeAreaView style={styles.vertical}>

          {userType === UserTypes.Student || userType === UserTypes.Faculty || userType === UserTypes.Staff ?
          <TouchableOpacity onPress={() => navigation.navigate("LeaveApplicationScreen")}>
            <View style={{ alignItems: "center" }}>
              <Image source={require('../../assets/icons/leaves.png')} resizeMode='contain' style={styles.dashboard_children_section} />
              <Text style={{ marginTop: 7, color: "#000000" }}>
                Request Leave
              </Text>
            </View>
          </TouchableOpacity>
          : null}

          {userType === UserTypes.Student || userType === UserTypes.Faculty || userType === UserTypes.Staff ?
          <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.navigate("MyLeaves")}>
          <View style={{ alignItems: "center" }}>
            <Image source={require('../../assets/icons/result.png')} resizeMode='contain' style={styles.dashboard_children_section} />
            <Text style={{ marginTop: 7, color: "#000000" }}>
            Leave Status
            </Text>
          </View>
          </TouchableOpacity>
          </View>
          : null}

      </SafeAreaView>

      <SafeAreaView style={styles.vertical}>
          {userType === UserTypes.Student ?
          <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.navigate("MyAttendance")}>
          <View style={{ alignItems: "center" }}>
            <Image source={require('../../assets/icons/attendance.png')} resizeMode='stretch' style={styles.dashboard_children_section} />
            <Text style={{ marginTop: 7, color: "#000000" }}>
              Attendance
            </Text>
          </View>
            </TouchableOpacity>
          </View>
          : null }

          {userType === UserTypes.Student ?
          <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.navigate("MyTranscript")}>
          <View style={{ alignItems: "center" }}>
            <Image source={require('../../assets/icons/transcript.png')} resizeMode='contain'
              style={styles.dashboard_children_section}
            />
            <Text style={{ marginTop: 7, color: "#000000" }}>
              Transcript
            </Text>
            </View>
            </TouchableOpacity>
          </View>
          : null }

      </SafeAreaView>

			{/* Third row */}
			<SafeAreaView style={styles.vertical_2}>
        <SafeAreaView>
          <Image source={require('../../assets/icons/courses.png')} resizeMode='contain' style={styles.dashboard_parent_section} />
        </SafeAreaView>
        <Text style={styles.dashboard_parent_title}>
          Course List
        </Text>
      </SafeAreaView>

      <CourseTable/>
      <View style={{marginTop: 20}}>
        {/* <Text>
        </Text> */}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
  },
  vertical: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'space-evenly',
    backgroundColor: '#FAFAFA',
    paddingBottom: 20,
  },
  vertical_2: {
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
  },

  dashboard_parent_section: {
    width: 37,
    height: 37,
    marginLeft: 5,
    marginBottom: 0,
  },

  dashboard_parent_title: {
    fontSize: 24,
    marginLeft: 10,
  },

  dashboard_children_section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginTop: 15,
    width: 35,
    height: 35,
    overflow: 'hidden',
    marginLeft: 0,
  },
})

export default Dashboard;
