"use client";

import { Workflow } from '@prisma/client'
import { addEdge, Background, BackgroundVariant, Connection, Controls, Edge, getOutgoers, ReactFlow, useEdgesState, useNodesState, useReactFlow } from '@xyflow/react'
import React, { useCallback, useEffect } from 'react'

import "@xyflow/react/dist/style.css";
import { CreateFlowNode } from '@/lib/workflow/createFlowNode';
import { TaskType } from '@/types/task';
import NodeComponent from './nodes/NodeComponent';
import { AppNode } from '@/types/appNode';
import DeletableEdge from './edges/DeletableEdge';
import { TaskRegistry } from '@/lib/workflow/task/registry';

const nodeTypes = {
    NodesAppNode: NodeComponent,
}

const edgeTypes = {
    default: DeletableEdge,
}

const snapGrid: [number, number] = [50, 50];
const fitViewOptions = { padding : 1}

function FlowEditor({workflow} : {workflow: Workflow}) {
    const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge> ([]);
    const {setViewport, screenToFlowPosition, updateNodeData} = useReactFlow();

    useEffect(() => {
        try {
            const flow = JSON.parse(workflow.definition);
            if (!flow) return;
            setNodes(flow.nodes || []);
            setEdges(flow.edges || []);
            if (!flow.viewport) return;
            const {x=0, y=0, zoom=1} = flow.viewport
            setViewport({x,y,zoom});
        } catch (error) {
        }
    }, [workflow.definition, setEdges, setNodes, setViewport])


    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback((event:React.DragEvent) => {
        event.preventDefault();
        const taskType = event.dataTransfer.getData("application/reactflow");
        if (!taskType) return;

        const position = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        });
        const newNode = CreateFlowNode(taskType as TaskType, position);
        
        const previousNodes = nodes;
        setNodes((nds) => nds.concat(newNode));

        if (previousNodes.length > 0) {
            const lastNode = previousNodes[previousNodes.length - 1];
            const lastNodeTask = TaskRegistry[lastNode.data.type];
            const sourceHandle = lastNodeTask.outputs[0]?.name;
            const newTask = TaskRegistry[taskType as TaskType];
            const targetHandle = newTask.inputs[0]?.name;

            if (sourceHandle && targetHandle) {
                const connection: Connection = {
                    source: lastNode.id,
                    sourceHandle,
                    target: newNode.id,
                    targetHandle,
                };
                setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
                
                updateNodeData(newNode.id, {
                    inputs: {
                        ...newNode.data.inputs,
                        [targetHandle]: "",
                    },
                });
            }
        }
    }, [screenToFlowPosition, setNodes, nodes, setEdges, updateNodeData]);

    const onConnect = useCallback((connection: Connection) => {
        console.log("onConnect triggered", connection);

        setEdges(eds => addEdge({...connection, animated: true}, eds));
        if (!connection.targetHandle) return;
        const node = nodes.find((nd) => nd.id === connection.target);
        // console.log("onConnect node", node);

        if (!node) return;
        const nodeInputs = node.data.inputs;
        // console.log("onConnect INPUT", nodeInputs);
        // console.log("onConnect ID", node.id);
        updateNodeData(node.id, {
            inputs: {
                ...nodeInputs,
                [connection.targetHandle]:"",
            },
        });
        console.log("@UPDATED>>>>", node.id)
    } , [setEdges, updateNodeData, nodes]);

    // console.log ("@NODES", nodes)

    const isValidConnection = useCallback((
        connection: Edge | Connection
    ) => {
        // no self-connection allowed (node cannot connect to itself)
        if (connection.source === connection.target) {
            return false;
        }

        //same taskParam type connection
        
        const source = nodes.find((node) => node.id === connection.source)
        const target = nodes.find((node) => node.id === connection.target)
        if (!source || !target) {
            console.error("invalid connection: source or target not found");
            return false;
        }

        const sourceTask = TaskRegistry[source.data.type];
        const targetTask = TaskRegistry[target.data.type];

        const output = sourceTask.outputs.find((o) => o.name === connection.sourceHandle);
        const input = targetTask.inputs.find((o) => o.name === connection.targetHandle);

        // if (input?.type !== output?.type) {
        //     console.error("invalid connection: type mismatch");
        //     return false;
        // }
        // console.log("@DEBUG", {input,output});

        const hasCycle = (node:AppNode, visited = new Set()) => {
            if (visited.has(node.id)) return false;
            visited.add(node.id);

            for (const outgoer of getOutgoers(node, nodes, edges)) {
                if (outgoer.id === connection.source) return true;
                if (hasCycle(outgoer, visited)) return true;
            }
        };

        const detectedCycle = hasCycle(target);
        return !detectedCycle;
    }, [nodes, edges])

     const handleTitleChange = (nodeId: string, newTitle: string) => {
    const updatedNodes = nodes.map((node) => {
      if (node.id === nodeId) {
        return {
          ...node,
          data: {
            ...node.data,
            title: newTitle, 
          },
        };
      }
      return node;
    });
    setNodes(updatedNodes); 
  };


  return (
    <main className='h-full w-full'>
        <ReactFlow nodes={nodes} 
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapToGrid
        snapGrid={snapGrid}
        fitViewOptions={fitViewOptions}
        fitView
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
        isValidConnection={isValidConnection}>
            <Controls position='top-left' fitViewOptions={fitViewOptions}/>
            <Background variant={BackgroundVariant.Dots} gap={40} size={1} />
        </ReactFlow>
    </main>
  )
}

export default FlowEditor