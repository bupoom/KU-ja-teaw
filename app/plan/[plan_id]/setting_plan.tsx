import { StyleSheet, Text, View } from 'react-native'

import { useRouter } from 'expo-router'

import Header from '@/components/Header'

const setting_plan = () => {

  const router = useRouter();

  const handleBack = () => {
    router.back()
  }
  return (
    <View>
      <Header title='Setting' onBackPress={handleBack}/>
      <Text>setting_plan</Text>
    </View>
  )
}
export default setting_plan
const styles = StyleSheet.create({})