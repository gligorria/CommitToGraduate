import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const cards = ['AMI','AGA','FI','ING1','LED','AED','ACO'];
const total = 37;

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mi Plan de Estudio</Text>
      <Text style={styles.progress}>0/{total} (0%)</Text>

      <View style={styles.board}>
        <ScrollView style={styles.column} contentContainerStyle={styles.colContent}>
          <Text style={styles.colTitle}>Cursar</Text>
          {cards.map(c => (
            <View key={c} style={styles.card}>
              <Text style={styles.cardText}>{c}</Text>
            </View>
          ))}
        </ScrollView>

        <ScrollView style={styles.column} contentContainerStyle={styles.colContent}>
          <Text style={styles.colTitle}>Regular</Text>
        </ScrollView>

        <ScrollView style={styles.column} contentContainerStyle={styles.colContent}>
          <Text style={styles.colTitle}>Rendida</Text>
        </ScrollView>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', paddingTop: 40, paddingHorizontal: 12 },
  header: { color: '#f8fafc', fontSize: 20, fontWeight: '700', textAlign: 'center' },
  progress: { color: '#38bdf8', textAlign: 'center', marginTop: 6, marginBottom: 12 },
  board: { flex: 1, flexDirection: 'row', gap: 8 },
  column: { flex: 1, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 12, marginHorizontal: 4 },
  colContent: { padding: 10 },
  colTitle: { color: '#94a3b8', textTransform: 'uppercase', fontSize: 12, marginBottom: 8, textAlign: 'center' },
  card: { backgroundColor: '#ffd6a5', paddingVertical: 12, borderRadius: 8, marginBottom: 8, alignItems: 'center' },
  cardText: { fontWeight: '700', color: '#4d330a' }
});
