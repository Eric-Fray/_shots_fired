import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Pressable } from 'react-native'; 
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreen from './src/screens/HomeScreen';
import MatchesScreen from './src/screens/MatchesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Amplify, Analytics, Hub } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import config from './src/aws-exports';

Analytics.disable();
Amplify.configure(config);


Fontisto.loadFont().catch((error) => { console.info(error); });
MaterialCommunityIcons.loadFont().catch((error) => { console.info(error); });
Ionicons.loadFont().catch((error) => { console.info(error); });
FontAwesome.loadFont().catch((error) => { console.info(error); });

const App = () => {
  const [ activeScreen, setActiveScreen ] = useState('HOME');

  const color = "#b5b5b5";
  const activeColor = '#F76C6B';

  useEffect(() => {
    const listener = Hub.listen('datastore', (data) => {
      const { payload } = data;
      this.onAuthEvent(payload);           
      console.log('A new auth event has happened: ', data.payload.data.username + ' has ' + data.payload.event);
    })
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.root}>
        <View style={styles.pageContainer}>
          <View style={styles.topNavigation}>
            <Pressable onPress={() => setActiveScreen('HOME')}>
              <Fontisto 
                name="tinder" 
                size={30} 
                color={activeScreen === 'HOME' ? activeColor : color}
              />
            </Pressable>
            <MaterialCommunityIcons 
              name="star-four-points" 
              size={30} 
              color={color} 
            />
            <Pressable onPress={() => setActiveScreen('CHAT')}> 
              <Ionicons 
                name="ios-chatbubbles" 
                size={30} 
                color={activeScreen === 'CHAT' ? activeColor : color}
              />
            </Pressable>
            <Pressable onPress={() => setActiveScreen('PROFILE')}> 
              <FontAwesome name="user" size={30} color={color} />
            </Pressable>
          </View>

          {activeScreen === 'HOME' && <HomeScreen />}
          {activeScreen === 'CHAT' && <MatchesScreen />}
          {activeScreen === 'PROFILE' && <ProfileScreen />}
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
    );
};
const styles = StyleSheet.create ({
    pageContainer: {
     justifyContent: 'center',
     alignItems: 'center',
     flex: 1,
    },
    root : {
      flex:1,
    },
    topNavigation: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      padding: 10,
    },
});

export default withAuthenticator(App);