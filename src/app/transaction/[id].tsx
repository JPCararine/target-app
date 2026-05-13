import React from "react";
import { router, useLocalSearchParams } from 'expo-router'
import { Alert, Text, View } from 'react-native'
import { PageHeader } from '../../components/PageHeader'
import { Button } from "../../components/Button";
import { CurrencyInput } from '../../components/CurrencyInput';
import { Input } from "../../components/Input";
import { TransactionType } from "../../components/TransactionTypes";
import { TransactionTypes } from "../../utils/transactionTypes";
import { TransactionCreate, useTransactionsDatabase } from "../../database/useTransactionsDatabase";

export default function Transaction() {
  const [type, setType] = React.useState(TransactionTypes.Input);
  const params = useLocalSearchParams<{ id: string }>()
  const [amount, setAmount] = React.useState(0);
  const [observation, setObservation] = React.useState("");
  const [isCreating, setIsCreating] = React.useState(false);

  const transactionDatabase = useTransactionsDatabase();

  async function handleCreate() {
    try {
      if(amount <= 0) {
        return Alert.alert("Atenção!", "Preencha o valor");
      }

      setIsCreating(true);

      await transactionDatabase.create({
        target_id: Number(params.id),
        amount: type === TransactionTypes.Output ? amount * -1 : amount,
        observation,
        
      })
      Alert.alert("Sucesso", "Transação salva com sucesso!");
      router.back();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a transação");
  }
  }


  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader title="Nova transação" subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar." />
      <View style={{marginTop: 32, gap: 24}}>
        <TransactionType selected={type} onChange={setType}/>
          <CurrencyInput title="Valor (R$)" value={amount} onChangeValue={(value) => setAmount(value ?? 0)}/>
          <Input title="Motivo (opcional)" placeholder="Ex: Investir em CDB de 110% no banco XP" value={observation} onChangeText={setObservation}/> 
          <Button title="Salvar" onPress={handleCreate} isProcessing={isCreating}/>
          
      </View>

    </View>
  )
}