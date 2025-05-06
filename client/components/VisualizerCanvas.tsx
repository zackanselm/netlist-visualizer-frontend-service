import * as React from 'react';
import { useCallback } from 'react';
import { addEdge, Background, BackgroundVariant, Controls, MiniMap, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';
import { Paper } from '@mantine/core';

const initialNodes = [
    { id: '1', position: { x: 10, y: 10 }, data: { label: 'Component 1' } },
    { id: '2', position: { x: 10, y: 100 }, data: { label: ' Component2' } },
  ];
  const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const VisualizeCanvas = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    
    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );
    return (
        <Paper shadow="sm" p="0" h="90vh" radius={0} withBorder>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            >
                <Controls />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </Paper>
    )
}

export default React.memo(VisualizeCanvas);