import { View, Text, TouchableOpacity } from "react-native";
import { Trash2 } from "lucide-react-native";

import { styles } from "./styles";
import { StatusIcon } from "@/components/Statusicon";
import { FilterStatus } from "@/types/FilterStatus";

type ItemData =  {
    status: FilterStatus
    description: string
}

type Props = {
    data: ItemData
    onRemove: () => void
    onStatus: () => void
}

export function Item({ data, onStatus, onRemove }: Props){
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.7} onPress={onStatus}>
                <StatusIcon status={data.status} />
            </TouchableOpacity>

            <Text style={styles.description} >
                {data.description}
            </Text>

            <TouchableOpacity onPress={onRemove}>
                <Trash2 size={22} color="#000" />
            </TouchableOpacity>
        </View>
    )
}