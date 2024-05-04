import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import COLORS from "../Home/Constants";

export default StyleSheet.create({
    subject: {
        marginHorizontal: 20,
    },
    Text: {
        fontSize: 22, 
        fontWeight: "bold",
        marginVertical: 8,
        color: COLORS.black,
    },  
    Text2: {
        fontSize: 16, 
        color: COLORS.black,
    }, 
    Text3: {
        fontSize: 16,
        marginVertical: 6,
        fontWeight: "400",

    },
    TextInput: {
        borderWidth: 1,
        borderColor: COLORS.black,
        borderRadius: 8,
        fontSize: 16,
        width: "100%",
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 22,
    }, 
    TextInputPhone: {
        borderWidth: 1,
        borderColor: COLORS.black,
        borderRadius: 8,
        fontSize: 16,
        flexDirection: 'row',
        width: "100%",
        height: 44,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
    },
    Opa: {
        backgroundColor: '#019012',
        borderRadius: 30,
        paddingVertical: 14,
        width: "100%",
        alignItems: 'center',
        marginTop: 30,
    },
    Text4: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FDFFDC',
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)' // Optional: Add a semi-transparent background overlay
      }
});