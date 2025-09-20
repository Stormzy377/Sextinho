import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

import { styles } from "./styles";

// Para representar os tipos vamos sempre usar a primeira letra maiúscula
type Props = TouchableOpacityProps & {
  title: string;
}

// Aqi aplicamos as propriedades que queremos que o componente Button receba (usamos uma propriedade dentro de um componente)
export function Button({ title, ...rest}: Props){
  return(
    <TouchableOpacity style={styles.container} activeOpacity={0.7} {...rest}>
      <Text style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}