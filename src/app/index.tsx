
import { Text, View, StatusBar, Alert } from 'react-native'

import { HomeHeader } from "../components/HomeHeader"
import { Target } from "../components/Target";
import { List } from "../components/List";
import { Button } from "../components/Button"

import { router, useFocusEffect } from "expo-router";
import { TargetResponse, useTargetDatabase } from '../database/useTargetDatabase';
import { numberToCurrency } from '../utils/numberToCurrency';
import React from 'react';
import { Loading } from '../components/Loading';

const summary = {
  total: "R$ 2.680,00",
  input: { label: "Entradas", value: "R$ 6,184.90"},
  output: { label: "Saídas", value: "-R$ 883,65"},
}



export default function Index() {
  const targetDatabase = useTargetDatabase();
  const [isFetching, setIsFetching] = React.useState(true);
  const [targets, setTargets] = React.useState<TargetResponse[]>([]);

  async function findTargets(): Promise<TargetResponse[]> {
    try {
      const response = await targetDatabase.listBySavedValue()
      return response;
    } catch (error) {
      console.log(error)

      return [];
    }

  }
  async function fetchData() {
    const targetDataPromise = findTargets()
    const [targetData] = await Promise.all([targetDataPromise])

    setTargets(targetData);
    setIsFetching(false);
  }
  

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
  }, [])
  )

  if(isFetching) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1}}>
      <StatusBar barStyle="light-content" />
        <HomeHeader data={summary}/>
        
        <List 
        data={targets} 
        keyExtractor={(item) => item.id.toString()} 
        renderItem={({item}) => (
          <Target data={{
            name: item.name,
            percentage: `${item.percentage.toFixed(0)}%`,
            current:  numberToCurrency(item.current),
            target: numberToCurrency(item.amount),
          }} 
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