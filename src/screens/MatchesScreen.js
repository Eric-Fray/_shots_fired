import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Auth } from 'aws-amplify'
import { Match, User } from '../models';

const MatchesScreen = () => {
    const [matches, setMatches] = useState([]);
    const [me, setMe] = useState(null);

    useEffect(() => { const getCurrentUser = async () => {
        const user = await Auth.currentAuthenticatedUser();
        console.warn(user);
        const dbUsers = await DataStore.query(
            User, 
            (u) => u.sub.eq(user.attributes.sub))
        if (dbUsers.length <= 0) {
            return;
        };
        console.warn('first check: ', dbUsers[0]);
        setMe(dbUsers[0]);
    };
    getCurrentUser();
    }, []);
    //useEffect(() => getCurrentUser(), []);
    useEffect(() => {
        if (!me) {
            return;
        }
        console.warn('line 31: ', me.id)
        const fetchMatches = async () => {
            const result = await DataStore.query(
                Match,
                (match) => match.and(match =>[
                match.isMatch.eq(true),
                match.User1ID.eq(me.id)
            ]));
            setMatches(result);
            console.warn(result);
        };
        fetchMatches();
    }, [me]);

    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.container}>
                <Text style={{ fontWeight: 'bold', fontSize: 24, color: '#F63A6E' }}>New Matches</Text>
                <View style={styles.users}>
                    {matches.map(match => (
                        <View style={styles.user} key={match.User2.id}>
                            <Image source={{uri: match.User2.image}} style={styles.image} />
                        </View>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    root: {
        width: '100%',
        flex: 1,
        padding: 10,
    },
    container: {
        padding: 10,
    },
    user: {
        width: 100,
        height: 100,
        margin: 10,
        borderWidth: 2,
        borderRadius: 50,
        borderColor: '#F63A6E',
        padding: 3,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    users: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
})

export default MatchesScreen;