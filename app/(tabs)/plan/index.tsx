import React from 'react';
import { router } from 'expo-router';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Alert, StyleSheet as RNStyleSheet } from 'react-native';

export default function Plan() {
  const home = () => router.replace('/(tabs)'); // jumps to /(tabs)/index
  const create = () => router.replace('/(tabs)/plan/create');
  const join = () => router.replace('/(tabs)/plan/join');

  return (
    <SafeAreaView style={styles.safe}>
      {/* Independent back button (<) */}
      <TouchableOpacity
        style={[styles.backBtn, { top: 50, left: 10 }]} // move freely
        onPress={home}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <Text style={styles.backIcon}>‹</Text>
      </TouchableOpacity>

      {/* Header text wrapper that ignores touches */}
      <View pointerEvents="none" style={[styles.headerWrap, { top: 60 }]}>
        <Text style={styles.headerText}>Choose your action</Text>
      </View>

      {/* Full-bleed divider */}
      <View style={[styles.dividerFull, { top: 110 }]} />

      {/* Content (doesn't intercept touches outside its children) */}
      <View pointerEvents="box-none" style={styles.container}>
        <TouchableOpacity style={[styles.button, { top: -90 }]} onPress={create}>
          <Text style={[styles.bigText, { top: 16, left: 20 }]}>Create your new trip</Text>
          <Text style={[styles.smallText, { top: 60, left: 26 }]}>
            Enter Your Trip Name, Date Duration, Poster Trip, etc
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { top: -90 }]} onPress={join}>
          <Text style={[styles.bigText, { top: 16, left: 20 }]}>Join someone trip</Text>
          <Text style={[styles.smallText, { top: 60, left: 26 }]}>
            Enter the trip code & password.
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  // Independent < button — put it on top of everything
  backBtn: {
    position: 'absolute',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,       // on iOS
    elevation: 10,     // on Android
    // backgroundColor: 'rgba(255,0,0,0.2)', // DEBUG: visualize hitbox
  },
  backIcon: {
    fontSize: 30,
    fontWeight: '600',
    color: '#000',
  },

  // Header centered & non-interactive so taps pass through
  headerWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },

  // Full-width divider (touches both edges of SafeAreaView)
  dividerFull: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#D9D9D9',
  },

  // Content
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 34,
  },
  button: {
    width: 375,
    height: 140,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  bigText: {
    position: 'absolute',
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
  },
  smallText: {
    position: 'absolute',
    fontSize: 12,
    color: 'gray',
  },
});