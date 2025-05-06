import * as React from 'react';
import { Container, Center, Stepper, Group, Button } from '@mantine/core';
import VisualizerCanvas from '../components/VisualizerCanvas';
import VisualizerUploader from '../components/VisualizerUploader';

const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  ];
  const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const HomePage = () => {
    const [active, setActive] = React.useState(0);
    const nextStep = () => setActive((current) => {
        if (current === 3) {
            return 0;
        }
        return (current < 3 ? current + 1 : current);
    });
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
    const getNextBtnLabel = () => {
        if (active === 2) {
            return 'Submit';
        }

        if (active === 3) {
            return 'Back to editing';
        }

        return 'Next step';
    }

    return (
        <div className="page">
            <Container>
                <Stepper active={active} onStepClick={setActive}>
                    <Stepper.Step label="First step" description="Upload a netlist" mb="lg">
                        <Center>
                            Step 1: Upload a netlist formatted as JSON
                        </Center>
                    </Stepper.Step>
                    <Stepper.Step label="Second step" description="Visualize and design" mb="lg">
                        <Center>
                            Step 2: Finalize the design and layout
                        </Center>
                    </Stepper.Step>
                    <Stepper.Step label="Final step" description="Submit for validation" mb="lg">
                        <Center>
                            Step 3: Save and analyze results
                        </Center>
                    </Stepper.Step>
                    <Stepper.Completed>
                        <Center>
                            Success! Continue editing to create a new submission.
                        </Center>
                    </Stepper.Completed>
                </Stepper>
                {
                    active === 0 && <VisualizerUploader />
                }
                {
                    active === 1 && <VisualizerCanvas />
                }
                <Group justify="center" mt="xl">
                    {
                        active > 0 && active < 3 && <Button variant="default" onClick={prevStep}>Back</Button>
                    }
                    <Button onClick={nextStep}>{getNextBtnLabel()}</Button>
                </Group>
            </Container>
        </div>
    )
}

export default React.memo(HomePage);