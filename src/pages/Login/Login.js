
import { View, Text, Platform, KeyboardAvoidingView, Keyboard } from 'react-native'
import React, { useState } from 'react'

import globalStyle from '../../styles/globalStyle'
import FormInput from '../../components/formInput/FormInput'
import CustomButton from '../../components/customButton/CustomButton'
import alertFunction from '../../helper/AlertFunction'

// Firebase
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/firebaseConn';

export default function Login({navigation}) {

    // State
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loader, setLoader] = useState(false);

    // Funcao de login
    function loginHandler() {

        if(email == '' || password == ''){
            alertFunction('Falha no login', 'Email ou senha invalidos!')
            return;
        }

        // Validacao dos dados de login via firebase
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setLoader(true)
            const user = userCredential.user;
            const uid = user.uid;

            navigation.navigate('Profile', {
                uid: uid
            });

        })
        .catch((error) => {
            
            // Se der erro o usuario sera avisado via alert
            alertFunction('Falha no login', 'Email ou senha invalidos!')
            setLoader(false)
            return;

        })

    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={globalStyle.centralizedContainer}>
            
            {/* Titulo */}
            <Text style={globalStyle.defaultTitle}>Login</Text>

            {/* Formulario de Login */}
            <View>
                <FormInput 
                    text={'Email'}
                    placeholderText={'Digite seu email'}
                    setText={setEmail}
                />
                <FormInput 
                    text={'Senha'}
                    placeholderText={'Digite sua senha'}
                    setText={setPassword}
                    isSecure={true}
                />
            </View>
            <CustomButton 
                    text={'Logar'}
                    onPressHandler={() => {
                        loginHandler()
                        Keyboard.dismiss()
                    }}
                    loader={loader}
            />

            {/* Botao de redirecionamento */}
            <Text style={globalStyle.register}>
                Ainda não possui conta? 
                <Text 
                    style={globalStyle.linkRegister}
                    onPress={() => {
                        navigation.navigate('Register')
                    }}
                >
                    Cadastre-se agora!
                </Text>
            </Text>

        </KeyboardAvoidingView>
    )

}