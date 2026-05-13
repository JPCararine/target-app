import { LinearGradient  } from "expo-linear-gradient"
import { View, Text, Button, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { colors } from "../../theme/colors";
import { Summary, SummaryProps } from "../Summary";
import { Separator } from "../Separator";

export type HomeHeaderProps = {
    total: string;
    input: SummaryProps;
    output: SummaryProps;
}

type Props = {
    data: HomeHeaderProps,
}

export function HomeHeader({ data}: Props) {
    return (
        <LinearGradient 
        colors={[colors.blue[500], colors.blue[800]]}
        style={styles.container}
        >
            <View>
                <Text style={styles.text}>Total que você possui</Text>
                <Text style={styles.total}>{data.total}</Text>
                
            </View>

            <Separator color={colors.blue[400]}/>

            <View style={styles.summary}>
                <Summary 
                data={data.input}
                icon= {{ name: "arrow-upward", color: "green"}}
                />
                <Summary 
                data={data.output}
                icon= {{ name: "arrow-downward", color: "red"}}
                isLeft={true}
                />
            </View>
        </LinearGradient>
    )
}