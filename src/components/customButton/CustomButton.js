
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'

import style from './CustomButton.style'

export default function CustomButton({text, onPressHandler, loader = false}) {
    return (
        <TouchableOpacity
            onPress={onPressHandler}
            style={style.buttonStyle}
            disabled={loader}
        >
            {/* Logica de carregamento de um botao */}
            {loader 
                ? 
                (
                    <ActivityIndicator animating={true} size={'small'} />
                ) 
                : 
                (
                    <> 
                        <Text style={style.textButton}>{text}</Text>
                    </>
                )
            }
        </TouchableOpacity>
    )
}