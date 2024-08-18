import React from 'react';
import { SafeAreaView, Text, ScrollView } from 'react-native';
import global from '../../styles/global';
import profile from '../../styles/profile';
import { userMail } from '../Login/Login';

import bank from '../../styles/bank';
import * as types from '../../custom-types'

const profileDetailsJSON = {
  "general": {
    "rollNumber": null,
    "name": null,
    "userID": null,
    "degree": null,
    "department": null,
    "specialisation": null,
    "dateOfBirth": null,
    "gender": null,
    "aadhaarNumber": null,
    "category": null,
    "admissionType": null,
    "academicYear": null,
    "mobile": null,
    "email": null,
    "fatherName": null,
    "motherName": null
  },
  "address": {
    "street": null,
    "location": null,
    "city": null,
    "state": null,
    "country": null,
    "zipCode": null
  }
}

const fieldNames: { [key: string]: { [key: string]: any } } = {
  "general": {
    "rollNumber": "Roll Number",
    "name": "Name",
    "userID": "User ID",
    "degree": "Degree",
    "department": "Department",
    "specialisation": "Specialisation",
    "dateOfBirth": "Date of Birth",
    "gender": "Gender",
    "aadhaarNumber": "Aadhaar Number",
    "category": "Category",
    "admissionType": "Admission Type",
    "academicYear": "Academic Year",
    "mobile": "Mobile",
    "email": "Email",
    "fatherName": "Father's Name",
    "motherName": "Mother's Name"
  },
  "address": {
    "street": "Street",
    "location": "Location",
    "city": "City",
    "state": "State",
    "country": "Country",
    "zipCode": "Zip Code"
  }
}


function ProfileDetails({ route, navigation }: types.ProfileDetailsProps): React.JSX.Element {
  let details = JSON.parse(JSON.stringify(profileDetailsJSON));
  const [detailsState, setDetails] = React.useState(details);
  const [isFetchFine, setIsFetchFine] = React.useState(true);

  const fetchProfileDetails = async () => {
    await fetch(`https://ims-extr.iiit.ac.in/mobile_apis.php?typ=getProfile&username=${userMail}&key=IMS&secret=MA24LRst`)
      .then(response => response.json())
      .then(json => {
        setIsFetchFine(true);
        setDetails(JSON.parse(JSON.stringify(json))); // why did this work?
      })
      .catch(error => {
        setIsFetchFine(false);
        // console.log("Error during Profile API: ", error);
      })
  }

  React.useEffect(() => {
    fetchProfileDetails();
  }, []);

  if (isFetchFine === false) {
    return (
      <SafeAreaView style={global.container}>
        <Text style={bank.noDetailsText}>
          Could not fetch details successfully. Please try again later.
        </Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={global.container}>
      <ScrollView>
        <Text style={profile.sectionHeader}>
          General Details
        </Text>
        <SafeAreaView style={profile.safeAreaContainer}>
          <SafeAreaView style={profile.container}>
            <Text style={profile.fieldHeader}>
              {fieldNames.general["rollNumber"]}
            </Text>
            <Text style={profile.text}>
              {detailsState.general["rollNumber"]}
            </Text>
          </SafeAreaView>

          <SafeAreaView style={profile.container}>
            <Text style={profile.fieldHeader}>
              {fieldNames.general["name"]}
            </Text>
            <Text style={profile.text}>
              {detailsState.general["name"]}
            </Text>
          </SafeAreaView>

          <SafeAreaView style={profile.container}>
            <Text style={profile.fieldHeader}>
              {fieldNames.general["userID"]}
            </Text>
            <Text style={profile.text}>
              {detailsState.general["userID"]}
            </Text>
          </SafeAreaView>

          <SafeAreaView style={profile.coupleContainer}>
            <SafeAreaView style={{ ...profile.container, flex: 0.55, alignSelf: "flex-start" }}>
              <Text style={profile.fieldHeader}>
                {fieldNames.general["degree"]}
              </Text>
              <Text style={profile.text}>
                {detailsState.general["degree"]}
              </Text>
            </SafeAreaView>

            <SafeAreaView style={{ ...profile.container, flex: 0.4, alignSelf: "flex-end" }}>
              <Text style={profile.fieldHeader}>
                {fieldNames.general["department"]}
              </Text>
              <Text style={profile.text}>
                {detailsState.general["department"]}
              </Text>
            </SafeAreaView>
          </SafeAreaView>

          <SafeAreaView style={profile.coupleContainer}>
            <SafeAreaView style={{ ...profile.container, flex: 0.55, alignSelf: "flex-start" }}>
              <Text style={profile.fieldHeader}>
                {fieldNames.general["specialisation"]}
              </Text>
              <Text style={profile.text}>
                {detailsState.general["specialisation"] ? detailsState.general["specialisation"] : "None"}
              </Text>
            </SafeAreaView>

            <SafeAreaView style={{ ...profile.container, flex: 0.4, alignSelf: "flex-end" }}>
              <Text style={profile.fieldHeader}>
                {fieldNames.general["dateOfBirth"]}
              </Text>
              <Text style={profile.text}>
                {detailsState.general["dateOfBirth"]}
              </Text>
            </SafeAreaView>
          </SafeAreaView>

          <SafeAreaView style={profile.coupleContainer}>
            <SafeAreaView style={{ ...profile.container, flex: 0.55, alignSelf: "flex-start" }}>
              <Text style={profile.fieldHeader}>
                {fieldNames.general["gender"]}
              </Text>
              <Text style={profile.text}>
                {detailsState.general["gender"]}
              </Text>
            </SafeAreaView>

            <SafeAreaView style={{ ...profile.container, flex: 0.4, alignSelf: "flex-end" }}>
              <Text style={profile.fieldHeader}>
                {fieldNames.general["aadhaarNumber"]}
              </Text>
              <Text style={profile.text}>
                {detailsState.general["aadhaarNumber"]}
              </Text>
            </SafeAreaView>
          </SafeAreaView>

          <SafeAreaView style={profile.coupleContainer}>
            <SafeAreaView style={{ ...profile.container, flex: 0.55, alignSelf: "flex-start" }}>
              <Text style={profile.fieldHeader}>
                {fieldNames.general["category"]}
              </Text>
              <Text style={profile.text}>
                {detailsState.general["category"]}
              </Text>
            </SafeAreaView>

            <SafeAreaView style={{ ...profile.container, flex: 0.4, alignSelf: "flex-end" }}>
              <Text style={profile.fieldHeader}>
                {fieldNames.general["admissionType"]}
              </Text>
              <Text style={profile.text}>
                {detailsState.general["admissionType"]}
              </Text>
            </SafeAreaView>
          </SafeAreaView>

          <SafeAreaView style={profile.coupleContainer}>
            <SafeAreaView style={{ ...profile.container, flex: 0.55, alignSelf: "flex-start" }}>
              <Text style={profile.fieldHeader}>
                {fieldNames.general["academicYear"]}
              </Text>
              <Text style={profile.text}>
                {detailsState.general["academicYear"]}
              </Text>
            </SafeAreaView>

            <SafeAreaView style={{ ...profile.container, flex: 0.4, alignSelf: "flex-end" }}>
              <Text style={profile.fieldHeader}>
                {fieldNames.general["mobile"]}
              </Text>
              <Text style={profile.text}>
                {detailsState.general["mobile"]}
              </Text>
            </SafeAreaView>
          </SafeAreaView>

          <SafeAreaView style={profile.container}>
            <Text style={profile.fieldHeader}>
              {fieldNames.general["email"]}
            </Text>
            <Text style={profile.text}>
              {detailsState.general["email"]}
            </Text>
          </SafeAreaView>


          <SafeAreaView style={profile.coupleContainer}>
            <SafeAreaView style={{ ...profile.container, flex: 0.55, alignSelf: "flex-start" }}>
              <Text style={profile.fieldHeader}>
                {fieldNames.general["fatherName"]}
              </Text>
              <Text style={profile.text}>
                {detailsState.general["fatherName"]}
              </Text>
            </SafeAreaView>

            <SafeAreaView style={{ ...profile.container, flex: 0.4, alignSelf: "flex-end" }}>
              <Text style={profile.fieldHeader}>
                {fieldNames.general["motherName"]}
              </Text>
              <Text style={profile.text}>
                {detailsState.general["motherName"]}
              </Text>
            </SafeAreaView>
          </SafeAreaView>

        </SafeAreaView>

        <SafeAreaView
          style={profile.horizontalLine}
        />

        <Text style={profile.sectionHeader}>
          Address Details
        </Text>

        <SafeAreaView style={profile.safeAreaContainer}>
          <SafeAreaView style={profile.container}>
            <Text style={profile.fieldHeader}>
              {fieldNames.address["street"]}
            </Text>
            <Text style={profile.text}>
              {detailsState.address["street"]}
            </Text>
          </SafeAreaView>

          <SafeAreaView style={profile.container}>
            <Text style={profile.fieldHeader}>
              {fieldNames.address["location"]}
            </Text>
            <Text style={profile.text}>
              {detailsState.address["location"]}
            </Text>
          </SafeAreaView>

          <SafeAreaView style={profile.container}>
            <Text style={profile.fieldHeader}>
              {fieldNames.address["city"]}
            </Text>
            <Text style={profile.text}>
              {detailsState.address["city"]}
            </Text>
          </SafeAreaView>

          <SafeAreaView style={profile.container}>
            <Text style={profile.fieldHeader}>
              {fieldNames.address["state"]}
            </Text>
            <Text style={profile.text}>
              {detailsState.address["state"]}
            </Text>
          </SafeAreaView>

          <SafeAreaView style={profile.coupleContainer}>
            <SafeAreaView style={{ ...profile.container, flex: 0.55, alignSelf: "flex-start" }}>
              <Text style={profile.fieldHeader}>
                {fieldNames.address["country"]}
              </Text>
              <Text style={profile.text}>
                {detailsState.address["country"]}
              </Text>
            </SafeAreaView>

            <SafeAreaView style={{ ...profile.container, flex: 0.3, alignSelf: "flex-end" }}>
              <Text style={profile.fieldHeader}>
                {fieldNames.address["zipCode"]}
              </Text>
              <Text style={profile.text}>
                {detailsState.address["zipCode"]}
              </Text>
            </SafeAreaView>
          </SafeAreaView>

        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileDetails;
