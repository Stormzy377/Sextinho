import { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, Text, FlatList, Alert } from "react-native";

import { Item } from "@/Item";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";

import { styles } from "./styles";
import { FilterStatus } from "@/types/FilterStatus";
import { itemsStorage, ItemStorage } from "@/storage/itemsStorage";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];


export function Home(){
  const [filter, setFilter] = useState(FilterStatus.PENDING);
  const [description, setDescription] = useState("")
  const [items, setItems] = useState<ItemStorage[]>([])

  // função para adicionar item
  async function handleAdd(){
    if(!description.trim()){
      return Alert.alert("Adicionar", "Você precisa adicionar um item a lista!")
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING
    }

    await itemsStorage.add(newItem)
    await itemsByStatus()

    Alert.alert("Adicionado", `Adicionado ${description}`)
    setFilter(FilterStatus.PENDING);
    setDescription("")
  }

  async function itemsByStatus() {
    try {
      const response = await itemsStorage.getByStatus(filter)
      setItems(response)
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível carregar os itens.")
    }
  }

  async function handleRemove(id: string) {
    try {
      await itemsStorage.remove(id)
      await itemsByStatus()
    } catch (error) {
      console.log(error)
      Alert.alert("Remover", "Não foi possível remover." )
    }
  }

  function handleClear() {
    Alert.alert("Limpar", "Deseja apagar a lista de compras?",[
      { text: "Não", style: "cancel"},
      { text: "Sim", onPress: () => onClear()}
    ])
  }

  async function onClear() {
    try {
      await itemsStorage.clear()
      setItems([])
    } catch (error){
      console.log(error)
      Alert.alert("Erro", 'Não foi possível limpar a lista.')
    }
  }

  useEffect(() => {
    itemsByStatus()
  }, [filter])
  // Corpo da função ou componente
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input
          placeholder="O que você precisa comprar?"
          onChangeText={setDescription}
          value={description}
        />
        <Button title="Adicionar" onPress={handleAdd} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              isActive={status === filter}
              onPress={() => setFilter(status)}
            />
          ))}

          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              // A flatList não precisa da propriedade key, ela já gerencia isso internamente
              data={item}
              onStatus={() => console.log("muda o status")}
              onRemove={() => handleRemove(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>Nenhum produto adicionado</Text>
          )}
        />
      </View>
    </View>
  );
}