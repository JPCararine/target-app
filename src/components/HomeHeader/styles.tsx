import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { fontFamily } from "../../theme/fontFamily";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 290,
        paddingHorizontal: 18,
        justifyContent: "flex-end",
        paddingBottom: 18,
        gap: 24,
    },
    text: {
        fontSize: 12,
        color: colors.white,
        fontFamily: fontFamily.regular,
    },
    total: {
        fontSize: 32,
        color: colors.white,
        fontFamily: fontFamily.medium,
    },
    summary: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    }
    
})