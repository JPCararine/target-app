
import { Text, View, StatusBar, Alert } from 'react-native'

import { HomeHeader } from "../components/HomeHeader"
import { Target } from "../components/Target";
import { List } from "../components/List";
import { Button } from "../components/Button"

import { router, useFocusEffect } from "expo-router";
import { TargetResponse, TargetSummaryResponse, useTargetDatabase } from '../database/useTargetDatabase';
import { numberToCurrency } from '../utils/numberToCurrency';
import React from 'react';
import { Loading } from '../components/Loading';
import { TransactionSummaryResponse, useTransactionsDatabase } from '../database/useTransactionsDatabase';





export default function Index() {
  const targetDatabase = useTargetDatabase();
  const transactionDatabase = useTransactionsDatabase();
  const [isFetching, setIsFetching] = React.useState(true);
  const [targets, setTargets] = React.useState<TargetResponse[]>([]);
  const [summary, setSummary] = React.useState({
    total: 0,
    input: { label: "Entradas", value: 0},
    output: { label: "Saídas", value: 0}
  });

  async function findTargets(): Promise<TargetResponse[]> {
    try {
      const response = await targetDatabase.listBySavedValue()
      return response;
    } catch (error) {
      console.log(error)

      return [];
    }

  }
  async function findSummary(): Promise<TransactionSummaryResponse | null> {
      try {
        return await transactionDatabase.findSummary()
        
      } catch (error) {
        console.error(error);
        return null;
      }
  }
  async function fetchData() {
    const targetDataPromise = findTargets()
    const summaryDataPromise = findSummary()
    const [targetData, summaryData] = await Promise.all([targetDataPromise, summaryDataPromise])

    setSummary({
          total: summaryData?.total ?? 0,
          input: {
            label: summary.input.label,
            value: summaryData?.input ?? 0
          },
          output: {
            label: summary.output.label,
            value: summaryData?.output ?? 0
          }
        })
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
        <HomeHeader data={{
          total: numberToCurrency(summary.total), 
          input: {
            label: summary.input.label,
            value: numberToCurrency(summary.input.value)
          },
          output: {
            label: summary.output.label,
            value: numberToCurrency(summary.output.value)
          }
          }}/>
        
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