import React from 'react';
import { View, StatusBar } from 'react-native';
import Board from './src/Board';

export default function App() {
  return (
    <View style={{flex:1}}>
      <Board />
      <StatusBar style="auto" />
    </View>
  );
}
