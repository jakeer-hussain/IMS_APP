import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import LeaveApplicationCss from '../styles/LeaveScreenStyles';
function Remarks({leavejustification,leaveremarks}): React.JSX.Element {
	const [justification, setJustification] = useState(null);
	const [remarks, setRemarks] = useState(null);
	const [todayDate, setTodayDate] = useState(new Date());
	const handleJustificationChange = (text: string) => {
        setJustification(text);
		leavejustification(text)
		if(text == ""){
			leavejustification(null)
		}
    };

	const handleRemarksChange = (text: string) => {
		setRemarks(text);
		leaveremarks(text);
		if(text == ""){
			leaveremarks(null)
		}
	}
    return (
        <SafeAreaView>
            <View>
					<View style={{display: 'flex', flexDirection: 'row'}}>
						<Text style = {LeaveApplicationCss.text}>
							Justification for Leave
						</Text>
						<Image
							source={require('../../../assets/icons/red_dot.jpeg')}
							style={LeaveApplicationCss.image}
						/>
					</View>
					<TextInput style={LeaveApplicationCss.input3} placeholder="Write your response here." multiline={true} numberOfLines={5} inputMode="text" onChangeText={handleJustificationChange}/>
				</View>
            <View>
					<View style={{display: 'flex', flexDirection: 'row'}}>
						<Text style = {LeaveApplicationCss.text}>
							Remarks
						</Text>
					</View>
					<TextInput style={LeaveApplicationCss.input3} placeholder="Write your response here." multiline={true} numberOfLines={5} inputMode="text" onChangeText={handleRemarksChange}/>
				</View>
				<View>
					<Text style = {LeaveApplicationCss.text}>
						Application Date
					</Text>
					<View style={LeaveApplicationCss.input2} ><Text>{todayDate.toLocaleDateString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' })}</Text></View>
				</View>
        </SafeAreaView>
    )
}
export default Remarks;
