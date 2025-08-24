import React, { useState, useMemo } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';

export default function Plan() {
  const [tripName, setTripName] = useState('');
  const maxLen = 20;
  const remaining = useMemo(() => `${tripName.length}/${maxLen} characters`, [tripName]);
;

  // const onPickStart = () => {};
  // const onPickEnd = () => {};
  // const onPickPoster = () => {};
  // const onNext = () => {
  //   router.replace('/(tabs)/plan/setpassword')
  // };

  return (
    <SafeAreaView style={styles.safe}>
                    
      {/* --- NEW CONTENT BELOW HEADER --- */}
      <View style={styles.content}>
        {/* Page Title + Subtitle */}
        <Text style={styles.title}>Plan a new trip</Text>
        <Text style={styles.subtitle}>It&apos;s a beginning of your journey</Text>

        {/* Trip Name Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Trip Name</Text>
          <TextInput
            value={tripName}
            onChangeText={setTripName}
            placeholder='Enter Your Trip Name'
            maxLength={maxLen}
            style={styles.input}
            placeholderTextColor='gray'
          />
          <Text style={styles.counter}>{remaining}</Text>
        </View>

        {/* Date Duration Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Date Duration</Text>
          <View style={styles.dateRow}>
            <Pressable 
              style={styles.dateInput} 
              //</View>onPress={onPickStart}
            >
              <Feather name='calendar' size={16} />
              <Text style={styles.dateText}>Select Date</Text>
            </Pressable>
            <Pressable 
              style={styles.dateInput} 
              // onPress={onPickEnd}
            >
              <Feather name='calendar' size={16} />
              <Text style={styles.dateText}>Select Date</Text>
            </Pressable>
          </View>
        </View>

        {/* Poster Trip Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Poster Trip</Text>
          <Pressable 
            //onPress={onPickPoster} 
            style={styles.posterBox}>
            <Feather name='image' size={28} color="gray" />
            <Text style={styles.posterHint}>Upload Picture to be your Trip Poster</Text>
          </Pressable>
        </View>
      </View>

      {/* Sticky Next Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.nextBtn} 
          //onPress={onNext}
        >
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
} 

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF' },
  headerWrap: { position: 'absolute', left: 0, right: 0 },
  headerText: { textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#000' },
  dividerFull: { position: 'absolute', left: 0, right: 0, height: 1, backgroundColor: '#D9D9D9' },

  // NEW CONTENT below divider
  content: {
    marginTop: 20, // pushes below header/divider
    paddingHorizontal: 16,
    gap: 16,
  },
  title: { fontSize: 22, fontWeight: '800', color: '#111' },
  subtitle: { fontSize: 12, color: 'gray' },

  card: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 12,
    padding: 14,
    backgroundColor: '#FFF',
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111',
  },
  counter: { alignSelf: 'flex-end', marginTop: 6, fontSize: 12, color: '#9E9E9E' },

  dateRow: { flexDirection: 'row', gap: 12 },
  dateInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  dateText: { fontSize: 14, color: '#6B7280' },

  posterBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#D9D9D9',
    borderRadius: 12,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FCFCFC',
  },
  posterHint: { fontSize: 13, color: '#9E9E9E', textAlign: 'center', paddingHorizontal: 10 },

  footer: { padding: 16, paddingBottom: 24, backgroundColor: '#FFFFFF' },
  nextBtn: {
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F5B4F',
  },
  nextText: { color: '#FFFFFF', fontWeight: '700', fontSize: 18 },
});