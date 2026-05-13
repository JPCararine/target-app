import React from "react";
import { router, useLocalSearchParams } from 'expo-router'
import { Text, View } from 'react-native'
import { PageHeader } from '../../components/PageHeader'
import { Button } from "../../components/Button";
import { CurrencyInput } from '../../components/CurrencyInput';
import { Input } from "../../components/Input";
import { TransactionType } from "../../components/TransactionTypes";
import { TransactionTypes } from "../../utils/transactionTypes";

export default function Transaction() {
  const [type, setType] = React.useState(TransactionTypes.Input);
  const params = useLocalSearchParams<{ id: string }>()

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader title="Nova transação" subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar." />
      <View style={{marginTop: 32, gap: 24}}>
        <TransactionType selected={type} onChange={setType}/>
          <CurrencyInput title="Valor (R$)" value={0} />
          <Input title="Motivo (opcional)" placeholder="Ex: Investir em CDB de 110% no banco XP" /> 
          <Button title="Salvar" />
          
      </View>

    </View>
  )
}