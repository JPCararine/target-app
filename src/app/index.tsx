
import { Text, View, StatusBar } from 'react-native'

import { HomeHeader } from "../components/HomeHeader"
import { Target } from "../components/Target";
import { List } from "../components/List";
import { Button } from "../components/Button"

import { router } from "expo-router";

const summary = {
  total: "R$ 2.680,00",
  input: { label: "Entradas", value: "R$ 6,184.90"},
  output: { label: "Saídas", value: "-R$ 883,65"},
}

const targets = [
    {     
      id: "1",
          name: "Apple Watch",
          current: "900,00",
          percentage: "75%",
          target: "1.200,00",
        },
        {     
      id: "2",
          name: "Teclado ",
          current: "900,00",
          percentage: "40%",
          target: "2.000,00",
        },
    ]


export default function Index() {
  return (
    <View style={{ flex: 1}}>
      <StatusBar barStyle="light-content" />
        <HomeHeader data={summary}/>
        
        <List 
        data={targets} 
        keyExtractor={(item) => item.id} 
        renderItem={({ item}) => (
          <Target data={item} 
          onPress={() => router.navigate(`/in-progress/${item.id}`)}
          />
        )} 
        title="Metas"  
        emptyMessage="Nenhuma meta, toque em nova meta para criar."
        containerStyle={{ paddingHorizontal: 24}}
        />
        <View style={{padding: 24, paddingBottom: 32}}>
          <Button title={"Nova meta"} onPress={() => router.navigate("/target")}/>
        </View>
    </View>
  )
}