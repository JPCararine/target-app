import { router, useLocalSearchParams } from 'expo-router'
import { View } from 'react-native'
import { PageHeader } from '../../components/PageHeader'

import { Button } from "../../components/Button";
import { Progress } from '../../components/Progress';
import { Transaction, TransactionProps }from '../../components/Transaction';
import { List } from '../../components/List';

import { TransactionTypes } from '../../utils/transactionTypes';

const details = {
  current: "R$ 580,00",
  target: "R$ 1.790,00",
  percentage: 25,
}
const transactions: TransactionProps[] = [
  {
    id: "1",
    value: "R$ 300,00",
    date: "12/04/25",
    description: "CDB de 110% no banco XPTO",
    type: TransactionTypes.Input
  },
  {
    id: "2",
    value: "R$ 20,00",
    date: "12/04/25",
    type: TransactionTypes.Output

  }
]

export default function InProgress() {
  const params = useLocalSearchParams<{ id: string }>()

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader title="Apple Watch" rightButton={{
        icon: "edit",
        onPress: () => {}
      }}/>
      
       <Progress data={details}/>
      
      <List 
      title="Transações" 
      data={transactions} 
      renderItem={({item}) => <Transaction data={item} onRemove={() => {}}/>} 
      emptyMessage="Nenhuma transação."
      />

      <Button title="Nova transação" onPress={() => router.navigate(`/transaction/${params.id}`)}/>

      
    </View>
  )
}