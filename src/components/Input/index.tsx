import { Text, View, TouchableOpacity, TouchableOpacityProps, TextInput, TextInputProps } from "react-native";
import { colors } from "../../theme/colors";
import { styles } from "./styles";

type Props = TextInputProps & {
    title: string;
}

export function Input({title ,...rest}: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <TextInput style={styles.input} placeholderTextColor={colors.gray[400]} {...rest} />
        </View>
    )
}