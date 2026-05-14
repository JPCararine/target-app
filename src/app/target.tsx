import { router } from 'expo-router'
import { Alert, Text, View } from 'react-native'
import { PageHeader } from '../components/PageHeader'
import { colors } from '../theme/colors'
import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { CurrencyInput } from '../components/CurrencyInput'
import React, { useEffect } from 'react'
import { useLocalSearchParams  } from 'expo-router'
import { useTargetDatabase } from '../database/useTargetDatabase'


export default function Target() {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [name, setName] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const params = useLocalSearchParams<{id?: string}>()
  const targetDataBase = useTargetDatabase()

  function handleSave() {
    if(!name.trim() || amount <= 0) {
      return Alert.alert("Atenção", "Preencha nome e valor");
    }

    setIsProcessing(true)
    
    if(params.id) {
      update()
    } else {
      create()
    }

    async function update() {
      try {
        await targetDataBase.update({ id: Number(params.id), name, amount});
        Alert.alert("Sucesso!", "Meta atualizada com sucesso!", [
          {
            text: "Ok",
            onPress: () => router.back()
          }
        ])
      } catch (error) {
        Alert.alert("Erro", "Não foi possível atualizar a meta.")
        console.log(error)
        setIsProcessing(false)
      }
    }
    async function create() {
      try {
        await targetDataBase.create({ name, amount })
        Alert.alert("Nova Meta", "Meta criada com sucesso!", [
          {
            text: "Ok",
            onPress: () => router.back()
          }
        ])
      } catch (error) {
        Alert.alert("Erro", "Não foi possível criar a meta.")
        console.log(error)
        setIsProcessing(false)
      }
    }
  }

  async function fetchDetails(id: number) {
    try {
      const response = await targetDataBase.findById(id);

      if(!response) {
        Alert.alert("Erro", "Meta não encontrada");
        router.back();
        return;
      }
      setName(response.name)
      setAmount(response.amount)
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os detalhes da meta.");
      console.log(error);
      router.back();
    }
  }

  function handleRemove() {
    if(!params.id) {
      return;
    }

    Alert.alert("Remover", "Realmente deseja remover essa meta?", [
      {
        text: "Sim",
        onPress: remove
      },
      {
        text: "Não", style: "cancel"
      }
    ])
  }

  async function remove() {
    try {
      setIsProcessing(true)

      await targetDataBase.deleteTarget(Number(params.id));
      Alert.alert("Meta", "Meta removida com sucesso!");
      router.back();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível remover meta.");
      console.log(error);
    }
  }
  useEffect(() => {
    if (params.id) {
      fetchDetails(Number(params.id))
    }
  }, [params.id])
  return (
    <View style={{ flex: 1, padding: 24 }}>
      
        <PageHeader 
        title="Meta" 
        subtitle="Economize para alcançar sua meta financeira."
        rightButton={params.id ? {icon: "delete", onPress: handleRemove} : undefined}
        />
        <View style={{ marginTop: 32, gap: 24}}>
        <Input title="Nome da meta" placeholder="Ex: Viagem para praia, Apple Watch" onChangeText={setName} value={name}/>
        
        <CurrencyInput title="Valor alvo (R$)" value={amount}  onChangeValue={(value) => setAmount(value ?? 0)} placeholder="0,00"/>

        <Button title="Salvar" onPress={handleSave} isProcessing={isProcessing}/>
        </View>

        
      
    </View>
  )
}