import React, { useState, useEffect } from 'react';
import {View, StyleSheet} from 'react-native'; 
import Card from '../components/TinderCard';
import AnimatedStack from '../components/AnimatedStack';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { DataStore } from '@aws-amplify/datastore';
import { Auth } from 'aws-amplify'
import { User } from '../models';
import { Match } from '../models';

Entypo.loadFont().catch((error) => { console.info(error); });
Ionicons.loadFont().catch((error) => { console.info(error); });
FontAwesome.loadFont().catch((error) => { console.info(error); });

const HomeScreen = ({ isUserLoading }) => {
    const[users, setUsers] = useState([]);
    const[currentUser, setCurrentUser] = useState(null);
    const [me, setMe] = useState(null);

    useEffect(() => {
        if (isUserLoading) {
            return;
        };
        const getCurrentUser = async () => {
            const user = await Auth.currentAuthenticatedUser();
            const dbUsers = await DataStore.query(
                User, 
                (u) => u.sub.eq(user.attributes.sub))
            if (dbUsers.length <= 0) {
                return;
            };
            setMe(dbUsers[0]);
        };
        getCurrentUser();
    }, [isUserLoading]);


    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers = await DataStore.query(User);
            setUsers(fetchedUsers);
        };
        const checkDataStoreInitialization = async () => {
            if (DataStore._instanceInitialized) {
              fetchUsers();
            } else {
              await DataStore.start();
              DataStore.observe(User).subscribe(() => {
                fetchUsers();
              });
            };
        }
        checkDataStoreInitialization();
    }, []);

    const onSwipeLeft = () => {
        if (!currentUser || !me){
            console.warn('still broke');
            return;
        }
    };

    const onSwipeRight = async () => {
        if (!currentUser || !me){
            console.warn('WRONG!');
            console.warn(currentUser);
            console.warn(me);
            return;
        }
        console.warn(me);
        const myMatches = await DataStore.query(
            Match, 
            (match) => match.and(match =>[
            match.User1ID.eq(me.id), 
            match.User2ID.eq(currentUser.id)
        ]));

        if (myMatches.length > 0) {
            console.warn("ALREADY LIKED");
            return;
        }

        const theirMatches = await DataStore.query(
            Match, 
            (match) => match.and(match =>[
            match.User1ID.eq(me.id), 
            match.User2ID.eq(currentUser.id)
        ]));

        if (theirMatches.length > 0) {
            console.warn("NEW MATCH!");
            const theirMatch = theirMatches[0];
            DataStore.save(Match.copyOf(theirMatch, updated => (updated.isMatch = true)),
            );
            return;
        }

        DataStore.save(new Match({
            User1ID: me.id,
            User2ID: currentUser.id,
            isMatch: false,
        }))
    };
    return (
      <View style={styles.pageContainer}>
        {users.length > 0 && (<AnimatedStack
          data={users}
          renderItem={({item}) => <Card user={item} />}
          setCurrentUser={setCurrentUser}
          onSwipeLeft={onSwipeLeft}
          onSwipeRight={onSwipeRight} 
        />
        )}
        <View style={styles.icons}>
            <View style={styles.buttons}>
                <FontAwesome name="undo" size={30} color="#FBD88B" />
            </View>

            <View style={styles.buttons}>
                <Entypo name="cross" size={30} color="#F76C6B" />
            </View>

            <View style={styles.buttons}>
                <FontAwesome name="star" size={30} color="#3AB4CC" />
            </View>

            <View style={styles.buttons}>
                <FontAwesome name="heart" size={30} color="#4FCC94" />
            </View>

            <View style={styles.buttons}>
                <Ionicons name="flash" size={30} color="#A65CD2" />
            </View>
            
        </View>
      </View>
  )};

const styles = StyleSheet.create ({
    pageContainer: {
     justifyContent: 'center',
     alignItems: 'center',
     flex: 1,
     width:'100%',
     backgroundColor: '#ededed'
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        padding: 10,
    },
    buttons: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 50,
        flexDirection: 'row',
    }
});

export default HomeScreen;