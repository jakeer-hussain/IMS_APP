import React, { useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { Button } from '@rneui/base';
import { TouchableOpacity, View, SafeAreaView, Text, Dimensions ,StyleSheet, FlatList, ScrollView} from 'react-native';
import { rollno } from '../Login/Login';
import { coursedetails } from '../Dashboard/components/CourseTable';
import { Course, Attendance, CourseDetails, CourseRow } from '../Dashboard/components/CourseTable';
import global from '../../styles/global';
import { DataTable } from 'react-native-paper';
import * as types from '../../custom-types';


interface CourseItem {
  Key: string;
  CourseName: string;
  Total: number;
  Present: number;
  Absent: number;
}

let courseCode = "";
let courseName = "";

function ViewAttendance({ route, navigation  }: types.MyAttendanceProps): React.JSX.Element {

  // code for SelectionList
  const screenWidth = Dimensions.get('window').width;
  const [yearSelected, setYearSelected] = React.useState('');
  const [semSelected, setSemSelected] = React.useState('');

	  const year_data = [
    { key: '2023', value: '2023-24' },
    { key: '2022', value: '2022-23' },
    { key: '2021', value: '2021-22' },
    { key: '2020', value: '2020-21' },
    { key: '2019', value: '2019-20' },
    { key: '2018', value: '2018-19' },
    { key: '2017', value: '2017-18' },
    { key: '2016', value: '2016-17' },
  ];

  const sem_data = [
    { key: 'spring', value: 'Spring' },
    { key: 'monsoon', value: 'Monsoon' },
    { key: 'all', value: 'All' },
  ];

  const setSemester = () => {
    filterCourseList();
	};


  // code for courseList
	const [courseList, setCourseList] = React.useState<CourseItem[]>([]);

  const filterCourseList = () => {
    const rowslist: CourseItem[] = [];
    const details = coursedetails as CourseDetails;
    const len = Object.keys(details.Courses).length;
    for (let i = 1; i <= len; i+= 1) {
      const course = details.Courses[i.toString()];
      const CourseName = course.CourseName;
      const Key = course.CourseCode;
      const Total = 7*course.Credits;
      const Absent = parseInt(details.Attendance[i.toString()].absents);
      const Present = Total - Absent;
			if (course.Year === yearSelected && ( semSelected === 'All' || course.Semester === semSelected  )){
      	rowslist.push({Key, CourseName, Total, Present, Absent});
			}
    }
    setCourseList(rowslist);
  }

  const handleCourseClick = (item: CourseItem) => {
    courseCode = item.Key;
    courseName = item.CourseName;
    navigation.navigate('CourseAttendance');
  }

	const RenderRows = () => {
	  return courseList.map((item) => (
    <TouchableOpacity key={item.Key} onPress={() => handleCourseClick(item)}>
	    <DataTable.Row >
	      <DataTable.Cell  style={{flex: 10}}><Text numberOfLines={2}>{item.CourseName}</Text></DataTable.Cell>
	      <DataTable.Cell  style={{flex: 3}} numeric>{item.Total}</DataTable.Cell>
	      <DataTable.Cell  style={{flex: 4}} numeric>{item.Present}</DataTable.Cell>
	      <DataTable.Cell  style={{flex: 3}} numeric>{item.Absent}</DataTable.Cell>
	    </DataTable.Row>
		</TouchableOpacity>
	  ));
	}

  const CourseList = () => {
    return (
		<View style={styles.box2}>
		  <DataTable>

   			<DataTable.Header key="Header">
    		  <DataTable.Title style={{flex: 15}}>Course Name</DataTable.Title>
    		  <DataTable.Title style={{flex: 3}}>Total</DataTable.Title>
    		  <DataTable.Title style={{flex: 4}}>Present</DataTable.Title>
    		  <DataTable.Title style={{flex: 3}}>Absent</DataTable.Title>
    		</DataTable.Header>

        {RenderRows()}
      </DataTable>
		</View>
	  );
  }

  return (
    <SafeAreaView style={global.container}>
      <ScrollView>
      <SafeAreaView style={styles.box}>
        <Text style={styles.heading}>
          Filter Selection
        </Text>

			<View>
		  	<View><Text style={styles.text}>Year:</Text></View>
        <SelectList
          setSelected={(val: any) => setYearSelected(val)}
          data={year_data}
          save="value"
		  		search={false}
        />
		  	<View><Text style={styles.text}>Semester:</Text></View>
        <SelectList
          setSelected={(val: any) => setSemSelected(val)}
          data={sem_data}
          save="value"
		  		search={false}
        />
		  	<View style={{marginTop: 20}}></View>
		  	<Button
		  	  onPress={setSemester}
		  	  title="Proceed"
		  	  color="#432390"
		  	  accessibilityLabel="Button setting semester"
		  	/>
      </View>


      </SafeAreaView>

      <CourseList />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
	heading: {
		fontWeight: "bold",
		color: '#7a7a7a',
		marginTop: 20,
		fontSize: 20,
		textAlign: 'center',
	},
  box: {
    borderRadius: 10,
    justifyContent: 'space-evenly',
    backgroundColor: '#FAFAFA',
    padding: 40,
    paddingTop: 0,
    paddingBottom: 20,
    marginBottom: 20,
  },
  box2: {
    borderRadius: 10,
    backgroundColor: '#FAFAFA',
    padding: 10,
    height: 450,
  },
  text: {
		fontWeight: "bold",
		fontSize: 19,
		color: "#000000",
		margin: 10,
		marginTop: 10,
	},
});


export {courseCode, courseName};
export default ViewAttendance;
