import * as z from 'zod';

interface ReactFlowNodeProp {
    id: string;
    position: { x: number; y: number; };
    data: { label: string; };
}

interface ReactFlowEdgeProp {
    id: string;
    source: string;
    target: string;
    type?: string;
}

export type ReactFlowJson = {
    nodes: ReactFlowNodeProp[];
    edges: ReactFlowEdgeProp[];
}

interface NetlistComponentProp {
    id: string;
    position: { x: number; y: number; };
    data: { label: string; };
}

interface NetlistNetProp {
    id: string;
    source: string;
    target: string;
    type?: string;
}

export const NetlistSchema = z.object({
    components: z.array(z.void().or(z.object({
        id: z.string(),
        position: z.object({
            x: z.number(),
            y: z.number(),
        }),
        data: z.object({
            label: z.string()
        })
    }))),
    nets: z.array(z.void().or(z.object({
        id: z.string(),
        source: z.string(),
        target: z.string(),
        type: z.string().optional(),
    })))
});

export type NetlistJson = {  
    components: NetlistComponentProp[];
    nets: NetlistNetProp[];
}

export const mapNetlistToReactFlow = (netlistJSON: NetlistJson): ReactFlowJson => {
    const result: ReactFlowJson = {
        nodes: [],
        edges: [],
    };
    result.nodes = netlistJSON.components || [];
    result.edges = netlistJSON.nets || [];

    return result;
};

export const mapReactFlowToNetlist = (reactFlowJson: ReactFlowJson): NetlistJson => {
    const result: NetlistJson = {
        components: [],
        nets: [],
    };
    result.components = reactFlowJson.nodes || [];
    result.nets = reactFlowJson.edges || [];

    return result;
};
