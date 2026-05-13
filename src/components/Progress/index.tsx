import { View, Text} from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons"
import { colors } from "../../theme/colors";


type SavedValue = {
    percentage: number;
    current: string;
    target: string;
}

type Props = {
    data: SavedValue;
}


export function Progress({ data}: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Valor guardado</Text>
            <View style={styles.content}>
                <Text style={styles.current}>
                    {data.current}
                <Text style={styles.target}>{" "} de {data.target}</Text>
                
                </Text>
            
             <Text style={styles.percentage}>{data.percentage.toFixed(0)}%</Text>
             </View>

             <View style={styles.progress}>
                <View style={[styles.currentProgress, {width: `${data.percentage}%` }]}>

                </View>
             </View>
            
        <View>
        
        </View>
        </View>
        
    )
}