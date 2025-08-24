import React, { useState } from 'react';
import { router } from 'expo-router';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

export default function Plan() {
  const [tripCode, setTripCode] = useState('');
  const [password, setPassword] = useState('');

  const home = () => router.back();

  return (
    <SafeAreaView style={styles.safe}>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Join Trip</Text>
        <Text style={styles.subtitle}>Enter the trip code & password</Text>

        {/* Trip Code */}
        <Text style={styles.label}>Trip Code</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={tripCode}
            onChangeText={setTripCode}
            placeholder='Enter The Trip Code'
            maxLength={8}
            autoCapitalize='none'
            autoCorrect={false}
            returnKeyType='next'
            accessibilityLabel='Trip code input'
          />
          <Text style={styles.counterInside}>{tripCode.length}/8 characters</Text>
        </View>

        {/* Password */}
        <Text style={[styles.label, { marginTop: 18 }]}>Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder='Enter The Password To Join'
            maxLength={20}
            secureTextEntry
            autoCapitalize='none'
            autoCorrect={false}
            returnKeyType='done'
            accessibilityLabel='Password input'
          />
          <Text style={styles.counterInside}>{password.length}/20 characters</Text>
        </View>

        {/* Next button */}
        <TouchableOpacity
          style={styles.ctaButton}
          activeOpacity={0.7}
          onPress={() => {}}
          accessibilityRole='button'
          accessibilityLabel='Next'
        >
          <Text style={styles.ctaText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF' },
  dividerFull: { height: 1, backgroundColor: '#D9D9D9' },

  // Content
  content: { paddingTop: 20, paddingHorizontal: 18, gap: 10 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#000' },
  subtitle: { fontSize: 12, color: 'gray', marginTop: -2 },
  label: { fontSize: 18, fontWeight: '600', color: '#000', marginTop: 14 },

  // Input wrapper and input
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    paddingHorizontal: 14,
    fontSize: 16,
    backgroundColor: '#FFF',
    paddingRight: 60, // add right padding so text doesn't overlap counter
  },
  counterInside: {
    position: 'absolute',
    right: 12,
    fontSize: 12,
    color: 'gray',
  },

  // Next button
  ctaButton: {
    marginTop: 24,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#284D44',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  ctaText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
});