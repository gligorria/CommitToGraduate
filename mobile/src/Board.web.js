import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import storage from './storage';

const initial = {
  cursar: ["AMI","AGA","FI","ING1","LED","AED","ACO","SPN","AMII","FII","IYS","ING2","SSL","PDP","SOP","ASI","PYE","ECO","BDD","DDS","CDD","ANU","DSI","SI","LEG","ICS","RED","IO","SIM","TPA","ADSI","IA","CDA","SDG","GGE","SSI","PF"],
  regular: [],
  rendida: []
};

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export default function BoardWeb() {
  const [cols, setCols] = useState(initial);

  useEffect(() => { (async () => { const saved = await storage.load(); if (saved) setCols(saved); })(); }, []);
  useEffect(() => { storage.save(cols); }, [cols]);

  function onDragEnd(result) {
    const { source, destination } = result;
    if (!destination) return;
    const sId = source.droppableId;
    const dId = destination.droppableId;

    if (sId === dId) {
      const items = reorder(cols[sId], source.index, destination.index);
      setCols(prev => ({ ...prev, [sId]: items }));
    } else {
      const sourceList = Array.from(cols[sId]);
      const [moved] = sourceList.splice(source.index, 1);
      const destList = Array.from(cols[dId]);
      destList.splice(destination.index, 0, moved);
      setCols(prev => ({ ...prev, [sId]: sourceList, [dId]: destList }));
    }
  }

  const columnStyle = { flex: 1, margin: 8, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: 8, minHeight: 200 };
  const cardStyle = { padding: 12, marginBottom: 8, borderRadius: 6, background: '#ffd6a5', fontWeight: 700, textAlign: 'center' };

  return (
    <div style={{padding:12}}>
      <h2 style={{color:'#f8fafc', textAlign:'center'}}>Mi Plan de Estudio</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{display:'flex', gap:8}}>
          {['cursar','regular','rendida'].map(colId => (
            <Droppable droppableId={colId} key={colId}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} style={columnStyle}>
                  <h4 style={{color:'#94a3b8', textTransform:'uppercase', textAlign:'center'}}>{colId}</h4>
                  {cols[colId].map((item, idx) => (
                    <Draggable draggableId={item} index={idx} key={item}>
                      {(prov, snap) => (
                        <div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps} style={{...cardStyle, ...prov.draggableProps.style}}>
                          {item}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
