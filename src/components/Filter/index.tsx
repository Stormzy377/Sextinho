import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

import { styles } from "./styles";
import { FilterStatus } from "@/types/FilterStatus";
import { StatusIcon } from "../Statusicon";

type Props = TouchableOpacityProps & {
    //O status será usado para definir se o estado será pendente ou comprado
    status: FilterStatus;
    //O isActive será usado para definir se o filtro está ativo ou não
    isActive: boolean;
}

export function Filter({ status, isActive, ...rest}: Props){
    return (
        <TouchableOpacity style={[styles.container, { opacity: isActive ? 1 : 0.5 }]} {...rest}>
            <StatusIcon status={status} />
            <Text style={styles.title}>
                {status === FilterStatus.DONE ? 'Comprados' : 'Pendentes'}
            </Text>
        </TouchableOpacity>
    )
}