import { Text, View } from "react-native";
import  Input, { CurrencyInputProps } from "react-native-currency-input"
import { colors } from "../../theme/colors";
import { styles } from "./styles";

type Props = CurrencyInputProps & {
    title: string;
}

export function CurrencyInput({title ,...rest}: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Input 
            style={styles.input} 
            placeholderTextColor={colors.gray[400]}
            prefix="R$ "
            delimiter="."
            separator=","
            precision={2}
            minValue={0}
            {...rest} 
            />
        </View>
    )
}