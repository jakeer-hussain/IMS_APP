
import React from "react";
import { Button, } from "@rneui/base";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

function LogOut() {
    const navigation = useNavigation();
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{color: 'black', margin: 10, fontSize: 20, marginBottom: 20}}>
            Are you sure you want to Log Out?
        </Text>
        <Button
          onPress={() => navigation.navigate('WelcomeScreen')}
          title="Yes" containerStyle={{width : 250, height: 50}}
          buttonStyle={{ backgroundColor: "#432390" }}
        />
        <View style={{marginTop: 10}}>


        <Button
          onPress={() => navigation.goBack()}
          title="No" containerStyle={{width : 250, height: 50}}
          buttonStyle={{ backgroundColor: "#432390" }}
        />
        </View>
      </View>
    );
  }

export default LogOut;
