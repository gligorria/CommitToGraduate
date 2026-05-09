import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import storage from './storage';

const initial = {
  cursar: ["AMI","AGA","FI","ING1","LED","AED","ACO","SPN","AMII","FII","IYS","ING2","SSL","PDP","SOP","ASI","PYE","ECO","BDD","DDS","CDD","ANU","DSI","SI","LEG","ICS","RED","IO","SIM","TPA","ADSI","IA","CDA","SDG","GGE","SSI","PF"],
  regular: [],
  rendida: []
};

export default function BoardNative() {
  const [cols, setCols] = useState(initial);

  useEffect(() => { (async () => { const saved = await storage.load(); if (saved) setCols(saved); })(); }, []);
  useEffect(() => { storage.save(cols); }, [cols]);

  function renderCard({ item, index, drag, isActive }) {
    return (
      <TouchableOpacity onLongPress={drag} style={styles.card}>
        <Text style={styles.cardText}>{item}</Text>
        <TouchableOpacity style={styles.moveBtn} onPress={() => onMoveRequest(item)}>
          <Text style={{color:'#fff'}}>Mover</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  function onMoveRequest(item) {
    Alert.alert('Mover materia', 'Selecciona columna destino', [
      { text: 'Cursar', onPress: () => moveItemTo(item, 'cursar') },
      { text: 'Regular', onPress: () => moveItemTo(item, 'regular') },
      { text: 'Rendida', onPress: () => moveItemTo(item, 'rendida') },
      { text: 'Cancelar', style: 'cancel' }
    ]);
  }

  function moveItemTo(item, dest) {
    setCols(prev => {
      const newCols = { cursar: [...prev.cursar], regular: [...prev.regular], rendida: [...prev.rendida] };
      ['cursar','regular','rendida'].forEach(k => { newCols[k] = newCols[k].filter(x => x !== item); });
      newCols[dest].push(item);
      return newCols;
    });
  }

  return (
    <View style={{flex:1, padding:12}}>
      <Text style={{color:'#f8fafc', fontSize:20, textAlign:'center', marginBottom:8}}>Mi Plan de Estudio</Text>
      <View style={{flexDirection:'row', gap:8, flex:1}}>
        {['cursar','regular','rendida'].map(colId => (
          <View key={colId} style={styles.column}>
            <Text style={styles.colTitle}>{colId}</Text>
            <DraggableFlatList
              data={cols[colId]}
              keyExtractor={(item)=>item}
              renderItem={renderCard}
              onDragEnd={({ data }) => setCols(prev => ({ ...prev, [colId]: data }))}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  column: { flex:1, backgroundColor:'rgba(255,255,255,0.03)', borderRadius:10, padding:8, marginHorizontal:4 },
  colTitle: { color:'#94a3b8', textTransform:'uppercase', textAlign:'center', marginBottom:8 },
  card: { padding:12, backgroundColor:'#ffd6a5', borderRadius:8, marginBottom:8, flexDirection:'row', justifyContent:'space-between', alignItems:'center' },
  cardText: { fontWeight:'700', color:'#4d330a' },
  moveBtn: { backgroundColor:'#38bdf8', paddingHorizontal:8, paddingVertical:6, borderRadius:6 }
});
