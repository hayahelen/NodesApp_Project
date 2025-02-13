"use client";

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ParamProps } from '@/types/appNode';
import { TaskParam } from '@/types/task';
import React, { useEffect, useId, useState } from 'react'


function StringParam({ param, value, updateNodeParamValue, disabled }: ParamProps) {
    const [internalValue, setInternalValue] = useState(value);
    const [error, setError] = useState<string | null>(null);
    const id = useId();

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    let Component: any = Input;
    if (param.variant === "textarea") {
        Component = Textarea;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        if (newValue.length < 0 || newValue.length > 50) {
            setError("Username must be between 0 and 50 characters.");
        } else {
            setError(null);
            setInternalValue(newValue);
            updateNodeParamValue(newValue);
        }
    };

    return (
        <div className="space-y-1 p-1 w-full">
            <Label htmlFor={id} className="text-xs flex">
                {param.name}
                {param.required && <p className="text-red-400 px-2">*</p>}
            </Label>

            <Component
                id={id}
                disabled={disabled}
                className="text-xs"
                value={internalValue}
                placeholder="Enter value here"
                onChange={handleChange}
            />

            {error && <p className="text-red-500 text-xs">{error}</p>}

            {param.helperText && <p className="text-muted-foreground px-2">{param.helperText}</p>}
        </div>
    );
}

export default StringParam;
