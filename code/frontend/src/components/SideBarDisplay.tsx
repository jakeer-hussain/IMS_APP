import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Sidebar from './Sidebar';

function SidebarDisplay({route}): React.JSX.Element {

    // let email  = route.params.email; 
    // // console.log(email);
    return (
    <Sidebar/>
    );
};

export default SidebarDisplay;
