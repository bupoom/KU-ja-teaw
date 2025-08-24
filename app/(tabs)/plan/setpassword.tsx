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
  // Example of auto-generated trip code; in practice, you'll set this from your API
  const [tripCode] = useState('ABC12345'); // visible but not editable
  const [password, setPassword] = useState('');

  const home = () => router.replace('/(tabs)/plan');

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <TouchableOpacity
        style={[styles.backBtn, { top: 50, left: 10 }]}
        onPress={home}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        accessibilityRole='button'
        accessibilityLabel='Go back'
      >
        <Text style={styles.backIcon}>‹</Text>
      </TouchableOpacity>

      <View pointerEvents='none' style={[styles.headerWrap, { top: 60 }]}>
        <Text style={styles.headerText}>Set trip password</Text>
      </View>

      <View style={[styles.dividerFull, { top: 110 }]} />

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Set your trip's password</Text>
        <Text style={styles.subtitle}>Enter the password</Text>

        {/* Trip Code (read-only) */}
        <Text style={styles.label}>Trip Code</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, styles.readOnlyInput]}
            value={tripCode}
            editable={false} // disables editing
            selectTextOnFocus={false}
          />
        </View>

        {/* Password (editable) */}
        <Text style={[styles.label, { marginTop: 18 }]}>Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder='Set your trip password to create'
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

  // Header
  backBtn: {
    position: 'absolute',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    elevation: 10,
  },
  backIcon: { fontSize: 30, fontWeight: '600', color: '#000' },
  headerWrap: { position: 'absolute', left: 0, right: 0 },
  headerText: { textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#000' },
  dividerFull: { position: 'absolute', left: 0, right: 0, height: 1, backgroundColor: '#D9D9D9' },

  // Content
  content: { paddingTop: 130, paddingHorizontal: 18, gap: 10 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#000' },
  subtitle: { fontSize: 12, color: 'gray', marginTop: -2 },
  label: { fontSize: 18, fontWeight: '600', color: '#000', marginTop: 14 },

  // Input wrapper and input
  inputWrapper: { position: 'relative', justifyContent: 'center' },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    paddingHorizontal: 14,
    fontSize: 16,
    backgroundColor: '#FFF',
    paddingRight: 60,
    color: '#111',
  },
  readOnlyInput: {
    backgroundColor: '#F5F5F5', // visually indicate it's not editable
    color: '#555', // slightly dim text color
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
