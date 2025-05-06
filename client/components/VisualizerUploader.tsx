import { JsonInput } from '@mantine/core';
import * as React from 'react';

const VisualizerUploader = () => {
    return (
        <JsonInput
            label="Your package.json"
            placeholder="Enter the JSON for your netlist submission"
            validationError="Invalid JSON"
            formatOnBlur
            autosize
            minRows={4}
        />
    )
}

export default VisualizerUploader;
