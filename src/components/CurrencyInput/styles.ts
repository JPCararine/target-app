import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { fontFamily } from "../../theme/fontFamily";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    title: {
        fontFamily: fontFamily.medium,
        fontSize: 12,
        color: colors.gray[600]
    },
    input: {
        color: colors.black,
        fontFamily: fontFamily.regular,
        fontSize: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray[400],
    }

})