import { JsonInput } from '@mantine/core';
import * as React from 'react';

interface VisualizerUploaderProps {
    value: string;
    onChange: ((value: string) => void) | undefined;
}

const VisualizerUploader = ({
    value,
    onChange,
}: VisualizerUploaderProps) => {
    return (
        <JsonInput
            label="Enter the JSON for your netlist submission following the provided example"
            placeholder="Enter the JSON for your netlist submission"
            validationError="Invalid JSON"
            formatOnBlur
            autosize
            minRows={4}
            value={value}
            onChange={onChange}
        />
    )
}

export default VisualizerUploader;
