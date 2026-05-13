import { router } from 'expo-router'
import { Text, View } from 'react-native'
import { PageHeader } from '../components/PageHeader'
import { colors } from '../theme/colors'
import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { CurrencyInput } from '../components/CurrencyInput'


export default function Target() {
  return (
    <View style={{ flex: 1, padding: 24 }}>
      
        <PageHeader 
        title="Meta" 
        subtitle="Economize para alcançar sua meta financeira." 
        />
        <View style={{ marginTop: 32, gap: 24}}>
        <Input title="Nome da meta" placeholder="Ex: Viagem para praia, Apple Watch" />
        
        <CurrencyInput title="Valor alvo (R$)" value={24000.73} placeholder="0,00"/>

        <Button title="Salvar" />
        </View>

        
      
    </View>
  )
}