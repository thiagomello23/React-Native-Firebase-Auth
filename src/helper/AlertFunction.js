
import { Alert } from "react-native";

const alertFunction = (title, msg) => {

    Alert.alert(
        `${title}`,
        `${msg}`,
        [
            {
                text: 'Ok',
                onPress: () => {return}
            },
            
        ],
        {
            cancelable: true
        }
    )

}

export default alertFunction;