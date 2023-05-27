import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import users from '../../assets/data/users';

const MatchesScreen = () => {
    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.container}>
                <Text style={{ fontWeight: 'bold', fontSize: 24, color: '#F63A6E' }}>New Matches</Text>
                <View style={styles.users}>
                    {users.map(user => (
                        <View style={styles.user} key={user.id}>
                            <Image source={{uri: user.image}} style={styles.image} />
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