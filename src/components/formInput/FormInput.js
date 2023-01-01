
import { View, Text, TextInput } from 'react-native'
import React from 'react'

import style from './FormInput.style'

export default function FormInput({text, placeholderText, setText, isSecure = false}) {
    return (
        <View
            style={style.formContainer}
        >
            <Text style={style.labelText}>{text}</Text>
            <TextInput 
                placeholder={placeholderText}
                onChangeText={(val) => setText(val)}
                style={style.inputStyle}
                secureTextEntry={isSecure}
            />
        </View>
    )
}