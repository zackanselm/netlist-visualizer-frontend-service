import * as React from 'react';
import { useCallback } from 'react';
import { addEdge, Background, BackgroundVariant, Controls, MiniMap, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';
import { Paper } from '@mantine/core';
import { mapNetlistToReactFlow, ReactFlowJson } from '../utilities/dataMappers'

interface VisualizeCanvasProps {
    reactFlowJson: ReactFlowJson;
}

const VisualizeCanvas = ({ reactFlowJson }: VisualizeCanvasProps) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(reactFlowJson.nodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(reactFlowJson.edges);

    const handleNodeChange = (changes: any) => {
        onNodesChange(changes)
    }
    
    const onConnect = useCallback(
        (params: any) => setEdges((eds) => {
            console.log(params, eds)
            return addEdge(params, eds)
        }),
        [setEdges],
    );
    return (
        <Paper shadow="sm" p="0" h="90vh" radius={0} withBorder>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={handleNodeChange}
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