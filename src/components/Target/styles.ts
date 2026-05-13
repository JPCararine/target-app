import { StyleSheet } from "react-native";
import { fontFamily } from "../../theme/fontFamily";
import { colors } from "../../theme/colors";

export const styles = StyleSheet.create({
    container: {
        height: 72,
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        gap: 12,
        paddingBottom: 16,
    },
    content: {
        flex: 1,
        gap: 7,
    },
    name: {
        fontSize: 14,
        fontFamily: fontFamily.medium,
        color: colors.black,
    },
    status: {
        fontSize: 10,
        fontFamily: fontFamily.regular,
        color: colors.gray[600]
    }
})