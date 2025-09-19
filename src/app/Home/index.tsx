import { View, Image, TouchableOpacity, Text } from "react-native";

import { Item } from "@/Item";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";

import { styles } from "./styles";
import { FilterStatus } from "@/types/FilterStatus";


const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export function Home(){
  // Corpo da função ou componente
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />

    <View style={styles.form}>
      <Input placeholder="O que você precisa comprar?"/>
    <Button title="Entrar"/>
    </View>
    
    <View style={styles.content}>
      <View style={styles.header}>
            {FILTER_STATUS.map((status) => (
              <Filter key={status} status={status} isActive={true}/>
        ))}

        <TouchableOpacity style={styles.clearButton}>
          <Text style={styles.clearText}>Limpar</Text>
        </TouchableOpacity>
      </View>

        <Item 
        data={{ status: FilterStatus.PENDING, description: 'Pão'}} 
        onStatus={() => console.log("muda o status")} onRemove={() => console.log("Apagar")} />
    </View>
  </View>
  )
}