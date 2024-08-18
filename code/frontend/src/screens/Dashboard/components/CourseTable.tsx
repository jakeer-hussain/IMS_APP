import React, { useState, useEffect } from 'react';
import { ActivityIndicator, TouchableOpacity, Linking, View, SafeAreaView,
  Text, StyleSheet, Dimensions, FlatList, ScrollView } from 'react-native';
import { rollno } from '../../Login/Login';


// define interface for typescript
export interface Course {
  CourseCode: string;
  CourseName: string;
  Credits: number;
  Semester: string;
  Year: string;
  Grade: string | null;
}

export interface Attendance {
	absents: string;
}

export interface CourseDetails {
  Courses: { [key: string]: Course };
  Attendance: { [key: string]: Attendance };
}

export interface CourseRow {
	key: string;
	name: string;
}

let coursedetails = {};
let courserows = {};

function CourseTable(): React.JSX.Element {
  const screenWidth = Dimensions.get('window').width;
  const columnFractions = [0.7, 0.1, 0.1, 0.1];
  const [isLoading, setIsLoading] = React.useState(false);
	const [detailsState, setDetails] = React.useState<CourseDetails>();
	const [courseRows, setCourseRows] = React.useState<CourseRow[]>([]);

  const fetchCourseDetails = async () => {
    setIsLoading(true);
		const timeoutPromise = new Promise((_, reject) => {
    	setTimeout(() => {
    	  reject(new Error('Request timed out'));
    	}, 10000);
  	});
    fetch(`https://ims-extr.iiit.ac.in/mobile_apis.php?typ=getCourses&rollNumber=${rollno}&key=IMS&secret=MA24LRst`)
      .then(responsePromise => Promise.race([responsePromise, timeoutPromise]))
      .then(response => response.json())
      .then(json => {
        setDetails(JSON.parse(JSON.stringify(json)));
        filterPresentCourses();
        setIsLoading(false);
      })
    .catch(error => {
        // console.log("Error during Course API: ", error);
    })
  }

  const filterPresentCourses = () => {
		const Rowslist: CourseRow[] = [];
    if (detailsState == undefined) {
      return;
    }
		const presentCourses = (Object.values(detailsState.Courses) as Course[]).filter(course => course.Grade === null);
		presentCourses.forEach( course => {
			Rowslist.push({key: course.CourseCode, name: course.CourseName});
		});
		setCourseRows(Rowslist);
	  coursedetails = detailsState;
    courserows = courseRows;
	}


	useEffect( () => {
		fetchCourseDetails();
	}, [detailsState])

  const handleCourseClick = () => {
    const url = 'https://courses.iiit.ac.in';
    Linking.openURL(url)
    	.catch((err) => console.error('Failed to open courses url: ', err));
  };

  const RenderCourseRow = ({item}: { item: CourseRow }) => {
		return (
    <TouchableOpacity onPress={handleCourseClick}>
      <View key={item.key} style={styles.row}>
        <View style={styles.courseName}>
          <Text style={styles.courseNameText}>{item.name}</Text>
        </View>
        <View style={styles.courseCode}>
          <Text style={styles.courseCodeText}>{item.key}</Text>
        </View>
      </View>
		</TouchableOpacity>
  	)
	};

	return (
    <ScrollView style={styles.box} nestedScrollEnabled={true} >
    {isLoading ?(
      <View style={{alignItems: 'center', marginVertical: 30}}>
        <ActivityIndicator size="large" color="grey" />
      </View>
    ): <View/>}
        {courseRows.map((course, index) => (
            <RenderCourseRow key={index} item={course} />
        ))}
    </ScrollView>
	)
}


const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  box: {
    borderRadius: 10,
    backgroundColor: '#FAFAFA',
		height: 270,
    paddingHorizontal: 30,
    paddingTop: 10,
  },

  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  courseName: {
    flex: 2,
    marginRight: 10,
  },
  courseNameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  courseCode: {
    flex: 1,
  },
  courseCodeText: {
    fontSize: 16,
    textAlign: 'right',
		marginRight: 10,
  },

});


export {coursedetails, courserows};
export default CourseTable;
