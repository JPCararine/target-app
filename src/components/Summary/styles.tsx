import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { fontFamily } from "../../theme/fontFamily";


export const styles = StyleSheet.create({
    container: {
        gap: 5,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    text: {
        fontSize: 10,
        color: colors.blue[300],
        fontFamily: fontFamily.regular,
    },
    value: {
        fontSize: 18,
        color: colors.white,
        fontFamily: fontFamily.regular,
    }
})