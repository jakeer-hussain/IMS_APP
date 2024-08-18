import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, ActivityIndicator, PermissionsAndroid } from 'react-native';
import { Button } from '@rneui/base';
import * as types from '../../custom-types';
import TreeLogo from './Components/TreeLogo';
import Credentials from './Components/Credentials';
import UpdatePassword from './Components/UpdatePassword';
import styles from "../Login/Styles/LoginStyles";
import Connectionstatus from '../../components/Connectionstatus';
import { UserTypes } from '../../custom-types';

// better to pass to navigation params but easier this way
let userMail = "";
let userName = "";
let rollno = ""
let userType: UserTypes = UserTypes.Default; // should not be default post login

function Login({ route, navigation }: types.LoginScreenProps): React.JSX.Element {
  const [Email, onChangeEmail] = React.useState('');
  const [Password, onChangePassword] = React.useState('');
  const [isloading, setIsLoading] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');

  const handleLoginPress = async () => {
    setIsLoading(true);
    try {
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('Request timed out'));
        }, 10000);
      });

      const responsePromise = fetch(`https://ims-extr.iiit.ac.in/mobile_apis.php?typ=getAuthentication&key=IMS&secret=MA24LRst&username=${Email}`);

      const response = await Promise.race([responsePromise, timeoutPromise]);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      if (responseData.success === true) {
        userMail = Email;
        userName = responseData.user.name;
        rollno = responseData.user.rollNumber;

        if (responseData.user.userType === 'Academics Students' && responseData.user.category === 'Student') {
          userType = UserTypes.Student;
        } else if (responseData.user.userType === 'EMPLOYEE' && responseData.user.category === 'Faculty') {
          userType = UserTypes.Faculty;
        } else if (responseData.user.userType === 'EMPLOYEE' && responseData.user.category === 'Staff') {
          userType = UserTypes.Staff;
        }

        navigation.navigate('SidebarDisplay');
        setIsLoading(false);
      } else {
        setErrorText('Invalid Credentials');
        setIsLoading(false);
      }
    } catch (e) {
      setErrorText('Error during Login, Please try again after sometime');
      setIsLoading(false);
    }
  };


  const askFILEACCESSPERMISSION = async () => {

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'READ FILE PERMISSIONS',
          message:
            'Please ALLOW IMS TO READ FILES ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('GRANTED PERMISSION for FILE ACCESS.');
      } else {
        // console.log('DENIED PERMISSION');

      }
    } catch (err) {
      console.warn(err);
    }

  }

  useEffect(() => {
    // askNotificationPermission(); // Call the function when the component mounts
    askFILEACCESSPERMISSION();
  }, []);

  return (
    <SafeAreaView style={styles.container2}>
      <SafeAreaView style={{ marginTop: 140 }}>
        <TreeLogo />
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: 'red', fontSize: 20 }}>{errorText}</Text>
        </View>
        <Credentials onChangeEmail={onChangeEmail} onChangePassword={onChangePassword} />
        <UpdatePassword />
        <View style={{ alignItems: 'center' }}>
          <Button
            containerStyle={{ width: 250, height: 50 }}
            onPress={handleLoginPress}
            disabled={isloading}
            color="#432390"
          >
            {isloading ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ActivityIndicator size="small" color="white" style={{ marginRight: 10 }} />
                <Text style={{ color: 'white' }}>Logging In...</Text>
              </View>
            ) : (
              <Text style={{ color: 'white' }}>Login</Text>
            )}
          </Button>
        </View>
      </SafeAreaView>
      <Connectionstatus />
    </SafeAreaView>
  );
};

export default Login;
export { userMail };
export { userName };
export { rollno };
export { userType };
