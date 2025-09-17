import { View, Text, SafeAreaView } from 'react-native'
import PlanHeader from '@/components/PlanHeader'
import { useLocalSearchParams } from 'expo-router'

const index = () => {
  const {plan_id} = useLocalSearchParams<{ plan_id: string }>();

  return (
    <SafeAreaView>
      <PlanHeader planId={plan_id}/>
      <Text>Group</Text>
    </SafeAreaView>
  )
}
export default index