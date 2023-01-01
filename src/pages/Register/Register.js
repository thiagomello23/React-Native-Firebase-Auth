
import { View, Text, KeyboardAvoidingView, Keyboard } from 'react-native'
import React, { useState } from 'react'

import globalStyle from '../../styles/globalStyle'
import FormInput from '../../components/formInput/FormInput';
import CustomButton from '../../components/customButton/CustomButton';
import alertFunction from '../../helper/AlertFunction';

// Firebase
import { db, auth } from '../../firebase/firebaseConn'
import { doc, setDoc } from "firebase/firestore"
import { createUserWithEmailAndPassword } from "firebase/auth"

export default function Register({navigation}) {

    // States
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loader, setLoader] = useState(false);

    function registerHandler() {

        // Validacao minima de dados
        if(nome == '' || email == '' || password == '' || confirmPassword == '') {
            alertFunction('Falha ao se cadastrar', 'Por favor, preencha todos os campos!')
            return;
        }

        // Validacao de senha
        if(password != confirmPassword) {
            alertFunction('Falha ao se cadastrar', 'Os campos de senha devem ser iguais!')
            return;
        }

        // Autenticacao e criacao de conta/retorno de erro
        createUserWithEmailAndPassword(auth, email, password)
        .then(async(userCredentials) => {

            setLoader(true);
            const user = userCredentials.user;
            const uid = user.uid;

            // Adicionar dados ao firestore
            const userDocRef = doc(db, 'User', uid)

            await setDoc(userDocRef, {
                nome: nome,
                email: email,
            })

            // Se der tudo certo entao o usuario e redirecionado
            navigation.navigate('Profile', {
                uid: uid
            });

        })
        .catch((error) => {

            // Se der erro o usuario sera avisado via alert
            if(error.code == 'auth/email-already-in-use') {
                alertFunction('Falha ao se cadastrar', 'Email invalido!')
            } else if(error.code == 'auth/weak-password') {
                alertFunction('Falha ao se cadastrar', 'Senha invalida, as senhas deve conter no minimo 6 caracteres!')
            }
            else {
                alertFunction('Falha ao se cadastrar', 'Email ou senha invalidos!')
            }

            setLoader(false);

        })

    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={globalStyle.centralizedContainer}>

            {/* Titulo */}
            <Text style={globalStyle.defaultTitle}>
                Cadastre-se agora!
            </Text>
            <View  />

            {/* Formulario */}
            <View>
                {/* Nome */}
                <FormInput 
                    text={'Nome'}
                    setText={setNome}
                    placeholderText={'Digite seu nome'}
                />
                {/* Email */}
                <FormInput 
                    text={'Email'}
                    setText={setEmail}
                    placeholderText={'Digite seu email'}
                />
                {/* Senha */}
                <FormInput 
                    text={'Senha'}
                    setText={setPassword}
                    placeholderText={'Digite sua senha'}
                    isSecure={true}
                />
                {/* Confirma Senha */}
                <FormInput 
                    text={'Confirme sua senha'}
                    setText={setConfirmPassword}
                    placeholderText={'Digite sua senha novamente'}
                    isSecure={true}
                />

            </View>
            {/* Button */}
            <CustomButton 
                text={'Cadastrar'}
                // Funcao de cadastro
                onPressHandler={() => {
                    registerHandler()
                    Keyboard.dismiss()
                }}
                loader={loader}
            />

            {/* Botao de redirecionamento */}
            <Text style={globalStyle.register}>
                Ja possui conta? 
                <Text 
                    style={globalStyle.linkRegister}
                    onPress={() => {
                        navigation.navigate('Login')
                    }}
                >
                    Logue-se agora!
                </Text>
            </Text>
            

        </KeyboardAvoidingView>
    )
    
}