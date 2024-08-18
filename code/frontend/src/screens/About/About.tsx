import React from 'react';
import { View, SafeAreaView, Text, StyleSheet } from 'react-native';
import global from '../../styles/global';

import IIIT_Logo from '../../components/HiMessage';

function About(): React.JSX.Element {

    return (
        <SafeAreaView style={global.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.subHeading}>
                    IMS Application for IIIT Hyderabad
                </Text>
                <Text style={styles.description}>
                    {"     "}
                    This project involves the development of a mobile application for Android and iOS platforms
                    dedicated to the IMS website of IIIT Hyderabad. Students can utilise the application to submit
                    requests for leave, view their attendance and transcript.
                </Text>
                <Text style={styles.description}>
                    Furthermore, students can access and
                    view their profile details including address, bank details and general information. Additionally
                    students can add or edit bank details.
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        color: "black"
    },
    subHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: "black"
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default About;
