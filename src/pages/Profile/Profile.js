
import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import globalStyle from '../../styles/globalStyle'
import CustomButton from '../../components/customButton/CustomButton';

// Firebase
import { auth, db } from '../../firebase/firebaseConn';
import { doc, getDoc } from 'firebase/firestore';

import styles from './Profile.style';
import { signOut } from 'firebase/auth';

export default function Profile({navigation, route}) {

    // State
    const [data, setData] = useState(null);

    useEffect(() => {

        async function fetchUserData() {

            // Pega o UID via parametro de rota
            const uid = route.params.uid;

            // Referenciando documento
            const userDocument = doc(db, 'User', uid);

            // Pegando os dados
            const response = await getDoc(userDocument)

            setData(response.data())

        }

        fetchUserData();

    }, [])

    async function logout() {
        
        // Executa a funcao de logout do firebase
        signOut(auth)

    }

    return (
        
        <View style={globalStyle.centralizedContainer}>
            
            {/* Logica de carregamento */}
            {!data
                ? 
                (
                    <ActivityIndicator animating={true} size="large" color="#000" />
                ) 
                : 
                (
                    <>
                        <Text style={styles.profileTitle}>Bem vindo ao seu perfil!</Text>
                        <View style={{marginBottom: 15}}>
                            <Text>{data.email}</Text>
                            <Text>{data.nome}</Text>
                        </View>
                        <CustomButton text={'Logout'} onPressHandler={logout} loader={false} />
                    </>
                )
            }

        </View>

    )
}