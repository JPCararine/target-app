import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { fontFamily } from "../../theme/fontFamily";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        backgroundColor: colors.blue[500],
    },
    title: {
        fontSize: 14,
        fontFamily: fontFamily.medium,
        color: colors.white
    }
})
