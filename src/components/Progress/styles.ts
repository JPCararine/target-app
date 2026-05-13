import { StyleSheet } from "react-native";
import { fontFamily } from "../../theme/fontFamily";
import { colors } from "../../theme/colors";
import { Target } from "../Target";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginTop: 24,
    },
    content: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: 12,
        fontFamily: fontFamily.medium,
        color: colors.gray[600],
    },
    current: {
        fontSize: 18,
        fontFamily: fontFamily.medium,
        color: colors.black,
    },
    target: {
        fontSize: 14,
        fontFamily: fontFamily.medium,
        color: colors.gray[600],
    },
    percentage: {
        fontSize: 14,
        fontFamily: fontFamily.bold,
        color: colors.blue[500],
    },
    progress: {
        marginTop: 16,
        width: "100%",
        height: 5,
        borderRadius: 5,
        backgroundColor: colors.gray[300],
        overflow: "hidden",
    },
    currentProgress: {
        height: 5,
        backgroundColor: colors.blue[500],
        
    }
})
