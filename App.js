
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font'
import { auth } from './src/firebase/firebaseConn';
import { onAuthStateChanged } from 'firebase/auth';
import { ActivityIndicator, View } from 'react-native';
import globalStyle from './src/styles/globalStyle';
import { useLayoutEffect, useState } from 'react';

const Stack = createNativeStackNavigator()

// Screens
import Login from './src/pages/Login/Login';
import Register from './src/pages/Register/Register';
import Profile from './src/pages/Profile/Profile';

export default function App() {

    // Loading Fonts
    const [fontsLoaded] = useFonts({
        'Roboto-Bold': require('./src/fonts/Roboto-Bold.ttf'),
        'Roboto-Regular': require('./src/fonts/Roboto-Regular.ttf'),
        'Roboto-Medium': require('./src/fonts/Roboto-Medium.ttf')
    })

    // State
    const [uid, setUid] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false);

    useLayoutEffect(() => {

        // Verifica se o usuario esta logado ou nao
        onAuthStateChanged(auth, (user) => {

            if(user) {
                setUid(user.uid)
            } else {
                setUid(false)
            }

            setIsLoaded(true)

        })

    }, [uid])

    // Enquanto a fonte nao carregar nenhum elemento sera renderizado
    if(!fontsLoaded) return null;

    // Enquanto o app abre
    if(!isLoaded){
        return (
            <View style={globalStyle.centralizedContainer}>
                <ActivityIndicator animating={true} size={'large'} color='#000' />
            </View>
        )
    }

    return (

        <NavigationContainer>

                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: '#a8dadc'
                        },
                        headerBackVisible: false,
                        headerShown: false
                    }}
                >
                    
                    {/* Renderizacao condicional pra caso o usuario esteja logado */}
                    {uid ? (
                        <>

                            <Stack.Screen 
                                name='Profile'
                                component={Profile}
                                initialParams={{
                                    uid: uid
                                }}
                            />

                        </>
                    ) : (
                        
                        <>  
                            <Stack.Screen 
                                name='Login'
                                component={Login}
                            />

                            <Stack.Screen 
                                name='Register'
                                component={Register}
                            />

                        </>

                    )}

                </Stack.Navigator>

        </NavigationContainer>

    );
}
