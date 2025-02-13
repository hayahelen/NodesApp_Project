"use client";

import { Input } from '@/components/ui/input';
import { TaskParam, TaskParamType } from '@/types/task';
import React, { useCallback } from 'react';
import StringParam from './param/StringParam';
import { useReactFlow } from '@xyflow/react';
import { AppNode } from '@/types/appNode';
import DropDownParam from './param/DropDownParam';

function NodeParamField({
    param,
    nodeId,
    disabled,
}: {
    param: TaskParam;
    nodeId: string;
    disabled: boolean;
}) {
    const { updateNodeData, getNode } = useReactFlow();
    const node = getNode(nodeId) as AppNode;
    const value = node?.data.inputs?.[param.name] || ''; // Provide a default value if undefined

    const updateNodeParamValue = useCallback((newValue: string) => {
        const currentNode = getNode(nodeId) as AppNode;
        updateNodeData(nodeId, {
            inputs: {
                ...currentNode?.data.inputs,
                [param.name]: newValue,
            },
        });
    }, [nodeId, updateNodeData, param.name, getNode]);

    switch (param.type) {
        case TaskParamType.STRING:
            return (
                <StringParam
                    param={param}
                    value={value}
                    updateNodeParamValue={updateNodeParamValue}
                    disabled={disabled} 
                />
            );

        case TaskParamType.DROP_DOWN:
            return (
                <DropDownParam
                    param={param}
                    value={value}
                    updateNodeParamValue={updateNodeParamValue}
                    disabled={disabled} 
                />
            );

 

        default:
            return (
                <div className="w-full">
                    <p className="text-xs text-muted-foreground">Not implemented</p>
                </div>
            );
    }
}

export default NodeParamField;