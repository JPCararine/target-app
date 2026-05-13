import { StyleSheet } from "react-native";
import { fontFamily } from "../../theme/fontFamily";
import { colors } from "../../theme/colors";

export const styles = StyleSheet.create({
    container: {
        height: 72,
        flexDirection: "row",
        alignItems: "center",
        gap: 7,

    },
    
    info: {
        flex: 1,
        gap: 7,
    },
    value: {
        fontSize: 14,
        fontFamily: fontFamily.medium,
        color: colors.black
    },
    description: {
        fontSize: 12,
        fontFamily: fontFamily.regular,
        color: colors.gray[500],
    },
})