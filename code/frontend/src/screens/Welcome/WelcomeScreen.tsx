import React, { useEffect } from 'react';
import { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Image, PermissionsAndroid } from 'react-native';
import * as types from '../../custom-types'
import { Button } from '@rneui/base';
import Connectionstatus from '../../components/Connectionstatus';
import notifee from '@notifee/react-native';
import RNFS from 'react-native-fs';

function Welcome({ route, navigation }: types.WelcomeScreenProps): React.JSX.Element {

    async function askNotificationPermission() {
        // Request permissions (required for iOS) of Notifications
        // console.log("Please get to know")
        await notifee.requestPermission()
    }

    useEffect(() => {
        askNotificationPermission(); // Call the function when the component mounts
    }, []);



    return (
        <SafeAreaView>
            <View style={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center', paddingVertical: 30 }} >
                <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>
                    Welcome
                </Text>
            </View>
            <Image
                source={require('../../assets/icons/IIIT_Logo.png')}
                style={{ width: "70%", resizeMode: "stretch", height: "30%", alignSelf: "center" }}
            />
            <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', paddingVertical: 60 }}>
                <Button title="Get Started" containerStyle={{ width: 250, height: 50 }}
                    onPress={() => navigation.navigate("LoginScreen")}
                    color="#432390"
                />
            </View>
            <Connectionstatus />
        </SafeAreaView>
    );
};

export default Welcome;
