import React from 'react';
import { SafeAreaView, Text, View, Image, TouchableOpacity, Alert, ScrollView, TextInput } from 'react-native';
import { Card } from '@rneui/themed'
import { rollno } from '../Login/Login';

import global from '../../styles/global';
import card from '../../styles/card';
import bank from '../../styles/bank';
import * as types from '../../custom-types'

const bankDetailsJSON = {
  "hasBankDetails": null,
  "applicationStatus": null,
  "bankDetails": {
    "accountHolderName": null,
    "accountNumber": null,
    "bankName": null,
    "branchName": null,
    "ifscCode": null,
    "bankAddress": null,
    "remarks": null,
    "viewAttachment": null
  }
}

const fieldNames: { [key: string]: any } = {
  "applicationStatus": "Application Status",
  "accountHolderName": "Account Holder Name as per Bank",
  "accountNumber": "Account Number",
  "bankName": "Bank Name",
  "branchName": "Branch Name",
  "ifscCode": "IFSC Code",
  "bankAddress": "Bank Address",
  "remarks": "Remarks",
  "viewAttachment": "Passbook / Canceled Cheque Leaf"
}


function BankDetails({ route, navigation }: types.BankDetailsProps): React.JSX.Element {

  let detailsJSON = bankDetailsJSON;
  let details = JSON.parse(JSON.stringify(detailsJSON));
  const [detailsState, setDetails] = React.useState(details);
  const [isFetchFine, setIsFetchFine] = React.useState(true);

  const fetchBankDetails = async () => {
    fetch(`https://ims-extr.iiit.ac.in/mobile_apis.php?typ=getBankDetails&rollNumber=${rollno}&key=IMS&secret=MA24LRst`)
      .then(response => response.json())
      .then(json => {
        setIsFetchFine(true);
        setDetails(JSON.parse(JSON.stringify(json))); // why did this work?
      })
      .catch(error => {
        setIsFetchFine(false);
        // console.log("Error during Bank Details GET API: ", error);
      })
  }

  React.useEffect(() => {
    fetchBankDetails();
  }, []);

  let headerComponent =
    <SafeAreaView style={bank.bankDetailsHeader}>
      <TouchableOpacity style={bank.bankHeaderBack}
        onPress={() => {
          navigation.navigate("SidebarDisplay");
        }}>
        <View>
          <Image source={require('../../assets/icons/back.png')} resizeMode='contain' style={global.dashboard_children_section} />
        </View>
      </TouchableOpacity>

      <Text style={bank.bankHeaderText}>
        Bank Details
      </Text>

      <TouchableOpacity style={bank.bankHeaderEdit}
        onPress={() => {
          // TODO: fix one attribute
          if (detailsState.hasBankDetails === false || detailsState.applicationStatus === null || detailsState.applicationStatus === "Applied" || detailsState.applicationStatus === "Rejected") {
            navigation.navigate("EditBankDetails");
          }
          else if (detailsState.applicationStatus === "Approved" || detailsState.hasBankDetails === true) {
            Alert.alert("", "You are not allowed to add another record. Contact Academic office for any change in Bank Account Details.");
          }
        }}>
        <View>
          <Image source={require('../../assets/icons/edit.png')} resizeMode='contain' style={global.dashboard_children_section} />
        </View>
      </TouchableOpacity>
    </SafeAreaView>;

  if (isFetchFine === false) {
    return (
      <SafeAreaView style={global.container}>
        {headerComponent}
        <Text style={bank.noDetailsText}>
          Could not fetch details successfully. Please try again later.
        </Text>
      </SafeAreaView>
    )
  }

  // TODO: fix one attribute
  if (detailsState.hasBankDetails === false) {
    return (
      <SafeAreaView style={global.container}>
        {headerComponent}
        <Text style={bank.noDetailsText}>
          No bank details provided. Please press the edit button and upload required details.
        </Text>
      </SafeAreaView>
    );
  }

  let fields = Object.keys(detailsState.bankDetails);
  // ASSUMPTION: leaving fields blank if `null` value given, no filler text
  let objectList: Array<React.JSX.Element> = fields.map((value, index) => {
    if (value === "viewAttachment") {
      return (
        <SafeAreaView key={index} style={card.container}>
          <Text style={card.sectionHeader}>
            {fieldNames[value]}
          </Text>
          <Card containerStyle={card.card}>
            <TextInput style={card.cardTextInput}
              editable={false}
              value={detailsState.bankDetails[value] ? detailsState.bankDetails[value].toString() : ""}
              multiline={true}
            />
          </Card>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView key={index} style={card.container}>
        <Text style={card.sectionHeader}>
          {fieldNames[value]}
        </Text>
        <Card containerStyle={card.card}>
          <TextInput style={card.cardTextInput}
            editable={false}
            value={detailsState.bankDetails[value] ? detailsState.bankDetails[value].toString() : ""}
            multiline={true}
          />
        </Card>
      </SafeAreaView>
    );
  })

  objectList.push(
    <SafeAreaView key={objectList.length} style={card.container}>
      <Text style={card.sectionHeader}>
        {fieldNames["applicationStatus"]}
      </Text>
      <Card containerStyle={card.card}>
        <TextInput style={card.cardTextInput}
          editable={false}
          value={detailsState.applicationStatus ? detailsState.applicationStatus : ""}
        />
      </Card>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={global.container}>
      {headerComponent}
      <ScrollView>
        {objectList}
      </ScrollView>
    </SafeAreaView>
  )
}

export default BankDetails;