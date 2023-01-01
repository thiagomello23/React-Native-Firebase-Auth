
import { StyleSheet } from "react-native";

// Estilizacao global do app
const globalStyle = StyleSheet.create({

    centralizedContainer: {
        flex: 1,
        backgroundColor: '#f1faee',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    defaultTitle: {
        fontSize: 25,
        color: '#457b9d',
        fontFamily: 'Roboto-Bold'
    },
    register: {
        fontSize: 14,
        marginTop: 12,
        fontFamily: 'Roboto-Regular'
    },
    linkRegister: {
        color: '#48cae4',
        fontFamily: 'Roboto-Medium'
    }

})

export default globalStyle;