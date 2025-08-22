import React from 'react'
import { SafeAreaView, StyleSheet, Text, View , Image} from 'react-native'

const profile = () => {
  
  return (
    <SafeAreaView>
      <View style={styles.imageContainer}>
        <Image 
          source={require('../../../assets/images/test.png')}
          style={styles.authImage}
          resizeMode="contain"
        />
      </View>

      <View>
        <Text>Profile Screen</Text>
      </View>
    </SafeAreaView>
  )
}

export default profile

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxHeight: 300,
  },
  authImage: {
    width: '80%',
    height: '100%',
  },


})