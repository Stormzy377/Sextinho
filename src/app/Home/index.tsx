import { use, useState } from "react";
import { View, Image, TouchableOpacity, Text, FlatList } from "react-native";

import { Item } from "@/Item";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";

import { styles } from "./styles";
import { FilterStatus } from "@/types/FilterStatus";


const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];
const ITEMS = [
  { id: "1", status: FilterStatus.DONE, description: "Comprar bananas" },
  { id: "2", status: FilterStatus.PENDING, description: "Comprar maçãs" },
  { id: "3", status: FilterStatus.PENDING, description: "Comprar 2L de leite" },
]

export function Home(){
  const [filter, setFilter] = useState(FilterStatus.PENDING);

  function update(value: FilterStatus){
    setFilter(value);
  }

  // Corpo da função ou componente
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input placeholder="O que você precisa comprar?" />
        <Button title="Entrar" />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter 
            key={status} 
            status={status} 
            isActive={status === filter}
            onPress={() => update(status)}
            />
          ))}

          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={ITEMS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              // A flatList não precisa da propriedade key, ela já gerencia isso internamente
              data={item}
              onStatus={() => console.log("muda o status")}
              onRemove={() => console.log("Apagar")}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => <Text style={styles.empty}>Nenhum produto adicionado</Text>}
        />
      </View>
    </View>
  );
}