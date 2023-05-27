import '@azure/core-asynciterator-polyfill'
import React , { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, Pressable, Alert} from 'react-native';
import { Auth } from 'aws-amplify'
import { Picker } from '@react-native-picker/picker';
import { User } from '../models/'
import { DataStore } from '@aws-amplify/datastore';
//import { Match } from './models';
//Amplify.Logger.LOG_LEVEL = "DEBUG";

const ProfileScreen = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [gender, setGender] = useState('');
    const [lookingFor, setLookingFor] = useState('');
    useEffect(() => {
        const getCurrentUser = async () => {
            const user = await Auth.currentAuthenticatedUser();
            const dbUsers = await DataStore.query(
                User, 
                (u) => u.sub.eq(user.attributes.sub))
            if (dbUsers.length <= 0) {
                console.warn('27: No user');
                return;
            };
            console.warn('30: User detected');
            const dbUser = dbUsers[0];
            setUser(dbUser);
            setName(dbUser.name)
            setBio(dbUser.bio);
            setGender(dbUser.gender);
            setLookingFor(dbUser.lookingFor);
            console.warn('36: Deteced user bio - ', dbUser.bio);
        };
        getCurrentUser();
        if (user != null){
            console.warn('37: Bio was set to - ', user.bio);
        };
    }, []);

    const isValid = () => {
        return name && bio && gender && lookingFor;
    };

    const save = async () => {
        if (!isValid()){
            console.warn('Not Valid');
            return;
        }
    console.warn("Line 51: ", user)
    if (user){
        const updatedUser = User.copyOf(user, updated => {
            console.warn("Line 52");
            updated.name = name;
            updated.bio = bio;
            updated.gender = gender;
            updated.lookingFor = lookingFor;
        })
        console.warn("Line 58: ", updatedUser);

        await DataStore.save(updatedUser);
    } else {

        const user = await Auth.currentAuthenticatedUser();

        //return;
            
        const newUser = new User({
            sub: user.attributes.sub,
            name,
            bio,
            gender,
            lookingFor,
            image: 
                'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png',
        });
    
        DataStore.save(newUser);
       
        };

        Alert.alert('User saved!');

    }


    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.container}>
                <TextInput style={styles.input} 
                    placeholder="Name..." 
                    value={name} 
                    onChangeText={setName}/>
                <TextInput
                    style={styles.input}
                    placeholder="bio..." 
                    multiline
                    numberOfLines={10}
                    value={bio} 
                    onChangeText={setBio}
                />

                <Text>Gender</Text>

                <Picker
                    selectedValue={gender}
                    onValueChange={(itemValue) =>
                        setGender(itemValue)
                    }>
                    <Picker.Item label="" value="" /> 
                    <Picker.Item label="Male" value="MALE" />
                    <Picker.Item label="Female" value="FEMALE" />
                </Picker>

                <Text>Looking For</Text>
                <Picker
                    selectedValue={lookingFor}
                    onValueChange={(itemValue) =>
                        setLookingFor(itemValue)
                    }>
                    <Picker.Item label="" value="" />
                    <Picker.Item label="Male" value="MALE" />
                    <Picker.Item label="Female" value="FEMALE" />
                </Picker>

                <Pressable style={styles.button} onPress={save}>
                    <Text>Save</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => Auth.signOut()}>
                    <Text>Sign Out</Text>
                </Pressable>
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
    input: {
        margin: 10,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
    },
    button: {
        backgroundColor: '#F63A6E',
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        margin: 10,
    },
})

export default ProfileScreen;