import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, ScrollView } from 'react-native';
import { Card } from '@rneui/themed';
import { rollno } from '../../Login/Login';

function MyLeaveRequests(): React.JSX.Element {
    const [leaveRequests, setLeaveRequests] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    const checkLeaveRequest = async () => {
        try {
            const response = await fetch(`https://ims-extr.iiit.ac.in/mobile_apis.php?typ=getLeaveDetails&key=IMS&secret=MA24LRst&rollNumber=${rollno}`);
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            if (responseData && responseData.Applications) {
                const applications = Object.values(responseData.Applications);
                setLeaveRequests(applications);
            }
        } catch (e) {
            // console.log(e);
            setError('Error while fetching the data, please try again later.');
        }
    };

    useEffect(() => {
        checkLeaveRequest(); 
    }, []);

    return (
        <SafeAreaView>
            <ScrollView>
               
                {error ? (
                    <Text style={{ marginVertical: 10, fontSize: 20, color: 'red', marginLeft: 50 }}>
                        {error}
                    </Text>
                ) : (
                    <>
                        <Text style={{ marginVertical: 10, fontSize: 20, color: 'black', marginLeft: 50 }}>
                            Total Number of Applications: {leaveRequests.length}
                        </Text>
                        {leaveRequests.map((request, index) => (
                            <Card key={index} containerStyle={{ marginTop: 15 }}>
                                <Card.Title>Status: {request.LeaveStatus}</Card.Title>
                                <Card.Divider />
                                <Text>Total Days: {request.TotalDays}</Text>
                                <Text>Submit Date: {request.SubmitDate}</Text>
                                <Text>Application With: {request.application_with}</Text>
                                <Text>From Date: {request.fromdate}</Text>
                                <Text>To Date: {request.todate}</Text>
                                <Text>Reason for Leave: {request.ReasonForLeave}</Text>
                            </Card>
                        ))}
                    </>
                )}
                <View style={{ margin: 20 }}>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default MyLeaveRequests;
