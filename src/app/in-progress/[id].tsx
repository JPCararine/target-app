import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { Alert, View } from 'react-native'
import { PageHeader } from '../../components/PageHeader'
import dayjs from "dayjs";
import { Button } from "../../components/Button";
import { Progress } from '../../components/Progress';
import { Transaction, TransactionProps }from '../../components/Transaction';
import { List } from '../../components/List';
import { numberToCurrency } from '../../utils/numberToCurrency';
import { TransactionTypes } from '../../utils/transactionTypes';
import { TargetResponse, useTargetDatabase } from '../../database/useTargetDatabase';
import React, { useEffect } from 'react';
import { Loading } from '../../components/Loading';
import { TransactionResponse, useTransactionsDatabase } from '../../database/useTransactionsDatabase';


export default function InProgress() {
  const params = useLocalSearchParams<{ id: string }>()
  const targetDatabase = useTargetDatabase();
  const transactionsDatabase = useTransactionsDatabase();
  const [isLoading, setIsLoading] = React.useState(true); 
  const [target, setTarget] = React.useState<TargetResponse | null>(null);
  const [transactions, setTransactions] = React.useState<TransactionResponse[]>([]);

  async function findById(): Promise<TargetResponse | null> {
    try{
      const response = await targetDatabase.findById(Number(params.id));

      return response;
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os detalhes da meta.")
      console.log(error)
      router.back();
      return null;
    }
  }
  async function findTransactionByTargetId(): Promise<TransactionResponse[]> {
    try {
      const response = await transactionsDatabase.listByTargetId(Number(params.id));

      return response;
    } catch (error) {
      Alert.alert("Erro", "Não foi possível listar as suas transações.")
      console.log(error);

      return [];
    }
  }
  async function fetchData() {
    const fetchDetailsPromise = findById();
    const fetchTransitionsPromise = findTransactionByTargetId();
    const [detailsData, transactionsData] = await Promise.all([fetchDetailsPromise, fetchTransitionsPromise]);
    setTarget(detailsData)
    setTransactions(transactionsData)
    setIsLoading(false)
  }

  function handleRemove(id: string) {
  
      Alert.alert("Remover", "Realmente deseja remover essa meta?", [
        {
          text: "Sim",
          onPress: () => remove(id)
        },
        {
          text: "Não", style: "cancel"
        }
      ])
    }
  async function remove(id: string) {
    try {
        
        await transactionsDatabase.removeTransaction(Number(id))
        await fetchData();
        Alert.alert("Transação", "Transação removida com sucesso!");
      
    } catch (error) {
      Alert.alert("Erro", "Não foi possível remover transação.");
    }
    
  }

  useFocusEffect(
    React.useCallback(() => {
        fetchData()
    }, [])
  )
  
  


  if(isLoading) {
    return <Loading />
  }

  
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader title={target?.name ?? ""} rightButton={{
        icon: "edit",
        onPress: () => router.navigate(`/target?id=${params.id}`)
      }}/>
      
       <Progress data={{ 
        percentage: target?.percentage ?? 0, 
        current: numberToCurrency(target?.current ?? 0), 
        target: numberToCurrency(target?.amount ?? 0) }}/>
      <List 
      title="Transações" 
      data={transactions} 
      renderItem={({item}) => 
      <Transaction data={{
        id: item.id.toString(),
        value: numberToCurrency(item.amount), 
        date: dayjs(item.created_at).format("DD/MM/YYYY [às] HH:mm"),
        description: item.observation,
        type: item.amount < 0 ? TransactionTypes.Output : TransactionTypes.Input
      }}
      
      onRemove={() => handleRemove(item.id.toString())}/>} 
      emptyMessage="Nenhuma transação."
      />

      <Button title="Nova transação" onPress={() => router.navigate(`/transaction/${params.id}`)}/>

      
    </View>
  )
}