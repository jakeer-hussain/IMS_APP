import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Image, ImageBackground, Text, View, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import { Button } from '@rneui/base';
import FromToDate from './components/FromToDate';
import DocumentAdd from './components/DocumentUpload';
import Remarks from './components/Remarks';
import ReasonForLeave from './components/ReasonForLeave';
import MissedExams from './components/MissedExams';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { userMail } from '../Login/Login';
import { rollno } from '../Login/Login';
import notifee from '@notifee/react-native';



function LeaveApplication(): React.JSX.Element {
	const navigation = useNavigation();
	const [fromDate, setFromDate] = useState(new Date());
	const [toDate, setToDate] = useState(new Date());
	const [showBox, setShowBox] = useState(true);
	const [totalDays, setTotalDays] = useState(1);
	const [sportsleave, setSportsLeave] = useState(null)
	const [justificationforleave, setJustificationForLeave] = useState(null);
	const [remarks, setRemarks] = useState(null);
	const [todayDate, setTodayDate] = useState(new Date());
	const [file1, setFile1] = useState(null);
	const [file2, setFile2] = useState(null);
	const [file1_base64, setFILE1BASE64] = useState("");
	const [file2_base64, setFILE2BASE64] = useState("");
	const [reasonforleave, setReasonForLeave] = useState(null);
	const [patientCategory, setPatientCategory] = useState(null)
	const [doctorCategory, setDoctorCategory] = useState(null)
	const [EventCategory, setEventCategory] = useState(null)
	const [Presentation, setPresentation] = useState(null)
	const [url, setUrl] = useState(null);
	const [missedexams, setmissedexams] = useState(null);
	const [listOfCoursesMissed, setLISTOFCOURSESMISSED] = useState([]);



	const sendDataToServer = async (json_to_send) => {
		try {
			const response = await fetch(`https://ims-extr.iiit.ac.in/mobile_apis.php?typ=addLeaveRequest&user_email=${userMail}&key=IMS&secret=MA24LRst`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(json_to_send),
			});
			// const json = await response.json();
			// // console.log(json);
			// console.log(response);
			// // console.log(json_to_send);
			onDisplayNotification("Your Leave Request Applied successfully.");
			navigation.navigate("MyLeaves")
		} catch (error) {
			console.error(error);
			// console.log("FAILED TO SEND THE DETAILS. Please try again");
			onDisplayNotification("Error during sending your leave request, please try again sometime later.");

		}
	};

	async function onDisplayNotification(message: string) {
        // Request permissions (required for iOS)
        await notifee.requestPermission()

        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        // Display a notification
        await notifee.displayNotification({
            title: message,
            body: 'Click for more details',
            android: {
                channelId,
                // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
                // pressAction is needed if you want the notification to open the app when pressed
                pressAction: {
                    id: 'default',
                },
            },
        });
    }

	useEffect(() => {
		if (reasonforleave === "Sickness") {
			setEventCategory(null);
			setUrl(null);
			setPresentation(null);
		} else if (reasonforleave === "Family Emergency" || reasonforleave === "Any Other") {
			setEventCategory(null);
			setUrl(null);
			setPresentation(null);
			setDoctorCategory(null);
			setPatientCategory(null);
		} else if (reasonforleave === "Technical Event") {
			setDoctorCategory(null);
			setPatientCategory(null);
		} else if (reasonforleave === "Sports Event" || reasonforleave === "Cultural Event") {
			setEventCategory(null);
			setUrl(null);
			setPresentation(null);
			setDoctorCategory(null);
			setPatientCategory(null);
		}
	}, [reasonforleave]);


	const showConfirmDialog = () => {

		// // console.log(fromDate.toLocaleDateString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' }));
		// // console.log(toDate.toLocaleDateString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' }));
		// // console.log(totalDays);
		// // console.log(sportsleave);
		// // console.log(justificationforleave)
		// // console.log(remarks)
		// // console.log(todayDate)
		// // console.log(todayDate.toLocaleDateString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' }))
		// // console.log(file1)
		// // console.log(file2)
		// console.log(missedexams);
		// // console.log(file1_base64)
		// // console.log(file2_base64)
		// // console.log("FILE READ SUCCESSFULLY.");
		if (fromDate.getTime() > toDate.getTime()) {
			return Alert.alert(
				"Alert",
				"Please select To Date greater than From Date.",
				[{ text: "OK" }]
			)
		}
		else if (
			file1 == null
		) {
			return Alert.alert(
				"Alert",
				"Please Upload the Relevant Document.",
				[{ text: "OK" }]
			);
		}
		else if (!justificationforleave) {
			return Alert.alert(
				"Alert",
				"Please Fill the Justification for the leave application.",
				[{ text: "OK" }]
			);
		}
		else if (!sportsleave || sportsleave == "Select...") {
			return Alert.alert(
				"Alert",
				"Please Choose Whether the Leave is for Sports/Yoga or Not.",
				[{ text: "OK" }]
			);
		}
		else if (!missedexams) {
			return Alert.alert(
				"Alert",
				"Please Fill whether the exams missed or not.",
				[{ text: "OK" }]
			)
		}
		else if (!reasonforleave) {
			return Alert.alert(
				"Alert",
				"Please Choose the reason for Leave",
				[{ text: "OK" }]
			)
		}
		else if (reasonforleave == "Sickness" && patientCategory == null) {
			return Alert.alert(
				"Alert",
				"Please Choose the Patient Category",
				[{ text: "OK" }]
			)
		}
		else if (reasonforleave == "Sickness" && doctorCategory == null) {
			return Alert.alert(
				"Alert",
				"Please Choose the Doctor Category",
				[{ text: "OK" }]
			)
		}
		else if (reasonforleave == "Technical Event" && EventCategory == null) {
			return Alert.alert(
				"Alert",
				"Please Choose the Event Type",
				[{ text: "OK" }]
			)
		}
		else if (reasonforleave == "Technical Event" && EventCategory == "Conference" && Presentation == null) {
			return Alert.alert(
				"Alert",
				"Please Choose if you are presenting paper or not",
				[{ text: "OK" }]
			)
		}

		else if(reasonforleave == "Technical Event" && url == null){
			return Alert.alert(
				"Alert",
				"Please enter the URL",
				[{ text: "OK" }]
			)
		}
		else {
			return Alert.alert(
				"Alert",
				"Are you sure you want to Submit?",
				[
					{
						text: "Yes",
						onPress: () => {
							setShowBox(false);
							const json_to_send = {
								"rollNumber": rollno,
								"fromDate": fromDate,
								"toDate": toDate,
								"totalDays": totalDays,
								"reasonForLeave": reasonforleave,
								"leaveForOnlyPT_Sports": sportsleave,
								"justificationForLeave": justificationforleave,
								"patientCategory": patientCategory,
								"doctorCategory": doctorCategory,
								"eventType": EventCategory,
								"areYouPresentingAPaper": Presentation,
								"eventStartDate": fromDate,
								"eventEndDate": toDate,
								"eventURL": url,
								"missedExamsForLeave": missedexams,
								"semesterCourses": listOfCoursesMissed,
								"remarks": remarks,
								"applicationDate": todayDate,
								"attachment1": {
									"filename": file1,
									"content": file1_base64
								},
								"attachment2": {
									"filename": file2,
									"content": file2_base64
								}

							};


							sendDataToServer(json_to_send);

							Alert.alert(
								"Alert",
								"Submitted Successfully",
							)

						},
					},

					{
						text: "No",
					},
				]
			);

		}

	};



	return (

		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView style={{ backgroundColor: "#ffffff" }}>
				<FromToDate setfromdate={setFromDate} settodate={setToDate} settotaldays={setTotalDays} fromdatetext="From Date" todatetext="To Date" />
				<ReasonForLeave leavereason={setReasonForLeave} patientscategory={setPatientCategory} doctorscategory={setDoctorCategory} eventscategory={setEventCategory} presentation={setPresentation} URL={setUrl} />
				<MissedExams leaveforsports={setSportsLeave} setmissedexams={setmissedexams} setCOURSESMISSED={setLISTOFCOURSESMISSED}/>
				<Remarks leavejustification={setJustificationForLeave} leaveremarks={setRemarks} />
				<DocumentAdd pickfile1={setFile1} pickfile2={setFile2} file1_base64={setFILE1BASE64} file2_base64={setFILE2BASE64}/>
				<View style={{ alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
					<Button title="Submit" containerStyle={{ width: 250, height: 50 }} onPress={() => showConfirmDialog()} color="#432390" />
				</View>
			</ScrollView>
		</SafeAreaView>

	)
}

export default LeaveApplication;
