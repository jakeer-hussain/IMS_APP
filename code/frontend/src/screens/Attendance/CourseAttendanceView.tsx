import React, { useState, useEffect } from 'react';
import { Alert, TouchableOpacity, FlatList, View, SafeAreaView, Text, StyleSheet, ScrollView} from 'react-native';
import global from '../../styles/global';
import { courseCode, courseName } from './Attendance';
import { rollno } from '../Login/Login';
import * as types from '../../custom-types';

interface Attendance {
	Date: string | null;
	Marked: string | null;
}

interface AttendanceJSON {
	AttendanceReport: {
		[key: string]: Attendance;
	}
}


function CourseAttendanceView({ route, navigation  }: types.CourseAttendanceProps): React.JSX.Element {

	const json_to_list = (AttJson: AttendanceJSON) => {
		if ( Object.values(AttJson.AttendanceReport).length == 0 || AttJson.AttendanceReport["1"].Date === null) {
			Alert.alert("Couldn't find any record for this course");
			navigation.goBack();
		}
		return Object.values(AttJson.AttendanceReport);
	}

  const [attendanceList, setAttendance] = React.useState<Attendance[]>([]);
  const fetchAttendance = async () => {
    await fetch(`https://ims-extr.iiit.ac.in/mobile_apis.php?typ=getAttendance&rollNumber=${rollno}&course_code=${courseCode}&key=IMS&secret=MA24LRst`)
      .then(response => response.json())
      .then(json => {
        setAttendance(json_to_list(JSON.parse(JSON.stringify(json))));
      })
    .catch(error => {
      // console.log("Error during Attendance API: ", error);
      Alert.alert("Could not fetch details successfully. Please try again later.");
    })

  }

	useEffect( () => {
		fetchAttendance();
	}, [])

	const RenderAttendance = ({item}: { item: Attendance }) => {
    if (item.Date == undefined) {
      return (
        <View>
        </View>
      )
    }
		return (
    <View key={item.Date} style={styles.row}>
      <View style={styles.date}>
        <Text style={styles.dateText}>{item.Date}</Text>
      </View>
      <View style={styles.marked}>
        <Text style={styles.markedText}>{item.Marked}</Text>
      </View>
    </View>
  	)
	};

	const RenderHeader = () => {
    return (
		  <View style={styles.headRow}>
        <View style={[styles.head, styles.date]}>
          <Text style={styles.headText}>Date</Text>
        </View>
        <View style={[styles.marked, styles.head ]}>
          <Text style={styles.headText}>Marked</Text>
        </View>
      </View>
    );
	}


  return (

    <SafeAreaView style={global.container}>
        <Text style={styles.heading}>
          {courseName} ({courseCode})
        </Text>
				<FlatList
					keyExtractor={(item: Attendance, index: number) => index.toString() }
					data={attendanceList}
					renderItem={RenderAttendance}
					ListHeaderComponent={RenderHeader}
				/>
    </SafeAreaView>

  );
}


const styles = StyleSheet.create({
  heading: {
		fontWeight: "bold",
		color: '#7a7a7a',
		textAlign: 'center',
    fontSize: 25,
	},
	row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
	date: {
    flex: 4,
    marginLeft: 40,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  marked: {
    flex: 1,
    paddingRight: 40,
  },
  markedText: {
    fontSize: 18,
  },
	headRow: {
    marginTop: 30,
		padding: 10,
    flexDirection: 'row',
    marginBottom: 20,
    borderTopWidth: 1,
    borderTopColor: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
	},
	head: {
    flex: 2,
	},
	headText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
	}
})

export default CourseAttendanceView;
