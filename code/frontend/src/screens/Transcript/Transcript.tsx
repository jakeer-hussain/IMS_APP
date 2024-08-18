import React, { useState } from 'react';
import { View, SafeAreaView, Text, Dimensions } from 'react-native';
import { ScrollView } from 'react-native';
import styles from './styles/transcriptstyles';
import GeneralDetails from './components/generaldetails';
import { selectedyear } from './components/generaldetails';
import { Semester } from './components/generaldetails';
import { Alert } from 'react-native';
import { coursedetails} from '../Dashboard/components/CourseTable';
import { userMail } from '../Login/Login';
import { rollno,userName } from '../Login/Login';
import { Button, ScreenWidth } from '@rneui/base';

function Transcript(): React.JSX.Element {
  const screenWidth = Dimensions.get('window').width;
  const [semesterData, setSemesterData] = useState([]);
  const [gpaDataList, setGpaDataList] = useState([]);
  const columnFractions = [0.25, 0.45, 0.15, 0.15];
  const [record, setRecord] = useState(false)
  const [concatyear, setConcatYear] = useState([]);

  let year = []
  let semester = []

  const checkdetails = () => {
    if (selectedyear == null || selectedyear == "Select..." || Semester == null || Semester == "Select...") {
      return Alert.alert(
        "Alert",
        "Please fill all the fields",
        [{ text: "OK" }]
      )
    }
    setRecord(true);
    const newData = coursedetails;
    const semesterData = {};
    if (Semester === "All") {
      for (let i = 1; i <= 2; i++) {
        const semester = i === 1 ? "Monsoon" : "Spring";
        semesterData[semester] = [];

        for (const courseId in newData.Courses) {
          const course = newData.Courses[courseId];
          if (course.Year === selectedyear && course.Semester === semester) {
            if (!semesterData[semester]) {
              semesterData[semester] = [];
            }
            semesterData[semester].push(course);
          }
        }
      }
    } else {
      semesterData[Semester] = [];
      for (const courseId in newData.Courses) {
        const course = newData.Courses[courseId];
        if (course.Year === selectedyear && course.Semester === Semester) {
          if (!semesterData[Semester]) {
            semesterData[Semester] = [];
          }
          semesterData[Semester].push(course);
        }
      }
    }
    setSemesterData(semesterData);
    const yearparser = parseInt(selectedyear.substring(0, 4), 10);
    if (Semester == "All"){
      semester.push("Monsoon" + yearparser)
      semester.push("Spring" + (yearparser+1))
      year.push(yearparser)
      year.push(yearparser+1)
    }
    else if (Semester == "Monsoon" ){
      semester.push("Monsoon" + yearparser)
      year.push(yearparser)
    }
    else{
      semester.push(Semester + (yearparser+1));
      year.push(yearparser+1)
    }
    fetchgpa()
    // console.log("finalcheck + "+ semester)
    // console.log("finalcheck + "+ year)
    setConcatYear(year)
  };

  const fetchgpa = async () => {

    try {
        const url = `https://ims-extr.iiit.ac.in/mobile_apis.php?typ=getTranscript&user_email=${userMail}&key=IMS&secret=MA24LRst`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch GPA data');
        }

        const responseData = await response.json();

        const semestergpa = responseData.semesters;
        const gpaData = [];
        for (const [semesterName] of Object.entries(semestergpa)) {
            const cgpa = semestergpa[semesterName].cgpa;
            const sgpa = semestergpa[semesterName].sgpa;
            if (semester[0] === semesterName || semester[1] === semesterName) {
              gpaData.push({ semester: semesterName, CGPA: cgpa, SGPA: sgpa });
            }
        }
        setGpaDataList(gpaData);
        // // console.log(gpaDataList);
    } catch (e) {
        // console.log('Error during API request:');
    }
};

  const renderTableCells = (courses: any, semester: any) => {
    const cells = [];
    const headings = ["CourseCode", "CourseName", "Credits", "Grade"];
    const headingRowCells = headings.map((heading, index) => (
      <View key={index} style={[styles.cell, { width: (screenWidth - 30) * columnFractions[index] }]}>
        <Text style={styles.headingText}>{heading}</Text>
      </View>
    ));
    cells.push(
      <View key={`${semester}-heading`} style={[styles.row, styles.headingRow]}>
        {headingRowCells}
      </View>
    );
    courses.forEach((course: any, index: any) => {
      const rowCells = headings.map((heading, columnIndex) => (
        <View key={`${semester}-${index}-${columnIndex}`} style={[styles.cell, { width: (screenWidth - 30) * columnFractions[columnIndex] }]}>
          <Text>{course[heading]}</Text>
        </View>
      ));
      cells.push(
        <View key={`${semester}-${index}`} style={styles.row}>
          {rowCells}
        </View>
      );
    });
    return cells;
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.box}>
        <GeneralDetails />
        <View style={{marginVertical: 30, alignItems: 'center'}} >
          <Button
            containerStyle={{ width: 200 }}
            onPress={checkdetails}
            title="Proceed"
            color="#432390"
          />
        </View>
    </SafeAreaView>

    {Object.entries(semesterData).map(([semester, courses], index) => (
      <View key={semester}>
        <View style={{marginTop: 10}}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginVertical: 10, marginLeft: screenWidth * 0.03 }}>{semester + concatyear[index]}</Text>
        </View>
        <View style={[styles.table, { width: screenWidth - 30 }]}>
          {renderTableCells(courses, semester)}
        </View>

      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: screenWidth * 0.05, marginTop: 10 }}>
        <Text style={{fontSize: 17, fontWeight: 'bold'}}>
          SGPA: {(gpaDataList[index]?.SGPA) || ''}
        </Text>
        <Text style={{fontSize: 17, fontWeight: 'bold'}}>
          CGPA: {(gpaDataList[index]?.CGPA) || ''}
        </Text>
      </View>

      </View>
    ))}
    {record && (
      <View style={{ marginBottom: 10, alignItems: 'center', marginTop: 8 }}>
      <Text style={{ fontWeight: '900', fontSize: 15 }}>
        *End of Record*
      </Text>
      <Text></Text>
    </View>
    )}
  </ScrollView>
  );
}

export default Transcript;
