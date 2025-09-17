import { View, Text, SafeAreaView } from 'react-native'
import { useLocalSearchParams } from 'expo-router';

import PlanHeader from '@/components/PlanHeader';

const index = () => {
  const {plan_id} = useLocalSearchParams<{ plan_id: string }>();
  return (
    <SafeAreaView>
      <PlanHeader planId={plan_id} />
      <Text>Daily Trip</Text>
    </SafeAreaView>
  )
}
export default index