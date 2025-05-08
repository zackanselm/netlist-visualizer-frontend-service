import * as React from 'react';
import { useEffect } from 'react';
import {
    Accordion,
    Container,
    Center,
    Drawer,
    Stepper,
    Group,
    Button,
    Notification,
    Affix,
    Transition,
    ScrollArea,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import VisualizerCanvas from '../components/VisualizerCanvas';
import VisualizerUploader from '../components/VisualizerUploader';
import { mapNetlistToReactFlow, NetlistJson, NetlistSchema } from '../utilities/dataMappers';
import SubmissionsService from '../services/SubmissionsService';
import MainContext from '../store/MainContext';

const defaultNetlistJSON = {
    components: [
        { id: '1', position: { x: 20, y: 200 }, data: { label: 'MY_IC' } },
        { id: '2', position: { x: 400, y: 150 }, data: { label: 'MY_CONNECTOR' } },
        { id: '3', position: { x: 300, y: 400 }, data: { label: 'MY_COMP_1' } },
        { id: '4', position: { x: 700, y: 300 }, data: { label: 'MY_COMP_2' } }
    ],
    nets: [
        { id: 'e1-2', source: '1', target: '2', type: 'step' },
        { id: 'e1-3', source: '1', target: '3', type: 'step' },
        { id: 'e2-3', source: '2', target: '3', type: 'step' },
        { id: 'e2-4', source: '2', target: '4', type: 'step' },
        { id: 'e3-4', source: '3', target: '4', type: 'step' }
    ]
};

const isNetlistJson = (netlist: any) => {
    const parsed = NetlistSchema.safeParse(netlist);
    parsed.error?.message && console.log(parsed.error?.message);
    return parsed.success;
}

const HomePage = () => {
    const { submissions, addSubmissions, getAllSubmissions }: any = React.useContext(MainContext);
    const [active, setActive] = React.useState(0);
    const [hasNotification, setNotifcation] = React.useState(false);
    const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
    const defaultNetlistJSONStr = JSON.stringify(defaultNetlistJSON, null, 2)
    const [netlistUploaderInput, setNetlistUploaderInput] = React.useState(defaultNetlistJSONStr);
    const [stableNetlistJson, setStableNetlistJson] = React.useState(mapNetlistToReactFlow(JSON.parse(defaultNetlistJSONStr)));

    useEffect(() => {
        SubmissionsService.all().then((response) => {
            const responseParsed = response.data.map((submission: any) => {
                return {
                    ...submission,
                    netlistJson: JSON.parse(submission.netlistJson)
                };
            });
            getAllSubmissions(responseParsed);
        })
    }, []);

    const validateAndSetNetlistJSON = (): boolean => {
        const parsed = JSON.parse(netlistUploaderInput);
        if (!isNetlistJson(parsed)) {
            setNotifcation(true);
            return false;
        }
        setStableNetlistJson(mapNetlistToReactFlow(parsed));
        return true;
    }

    const nextStep = () => setActive((current) => {
        if (current === 3) {
            return 0;
        }
        const next = current < 3 ? current + 1 : current;
        if (next === 1) {
            const isValid = validateAndSetNetlistJSON();
            if (!isValid) { return current; }
        }
        if (current === 2) {
            SubmissionsService.create(netlistUploaderInput).then((response) => {
                addSubmissions([{
                    _id: response.data._id,
                    netlistJson: JSON.parse(response.data.netlistJson)
                }]);
            }).catch((err) => console.log(err?.data));
        }
        return next;
    });
    const prevStep = () => setActive((current) => {
        const prev = current > 0 ? current - 1 : current;
        if (prev === 1) {
            const isValid = validateAndSetNetlistJSON();
            if (!isValid) { return current; }
        }
        return prev;
    });
    const handleStepClick = (step: number) => setActive(() => {
        if (step === 1) {
            const isValid = validateAndSetNetlistJSON();
            if (!isValid) { return active; }
        }

        return step;
    })
    const getNextBtnLabel = () => {
        if (active === 2) {
            return 'Submit';
        }

        if (active === 3) {
            return 'Back to editing';
        }

        return 'Next step';
    }
    const handleNotificationClose = () => {
        setNotifcation(false);
    }
    const onUploadJSONChange = (input: string) => {
        setNetlistUploaderInput(input)
    }

    return (
        <div className="page">
            <Container>
                <Center mb="xl">
                    <Button variant="default" onClick={openDrawer}>
                        View Submission History
                    </Button>
                </Center>
                <Stepper active={active} onStepClick={handleStepClick}>
                    <Stepper.Step label="First step" description="Upload a netlist" mb="lg">
                        <Center>
                            Step 1: Upload a netlist formatted as JSON
                        </Center>
                    </Stepper.Step>
                    <Stepper.Step label="Second step" description="Visualize and design" mb="lg">
                        <Center>
                            Step 2: Customize the design and layout
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
                    active === 0 && <VisualizerUploader value={netlistUploaderInput} onChange={onUploadJSONChange}/>
                }
                {
                    active === 1 && <VisualizerCanvas reactFlowJson={stableNetlistJson} />
                }
                <Group justify="center" mt="xl">
                    {
                        active > 0 && active < 3 && <Button variant="default" onClick={prevStep}>Back</Button>
                    }
                    <Button onClick={nextStep}>{getNextBtnLabel()}</Button>
                </Group>
            </Container>
            <Drawer opened={drawerOpened} onClose={closeDrawer} title="Submission History">
                <Accordion variant="separated" defaultValue="Apples">
                    {
                        submissions.map((submission: any) => (
                            <Accordion.Item key={submission._id} value={submission._id}>
                                <Accordion.Control>{submission._id} {submission.created_at?.toString()}</Accordion.Control>
                                <Accordion.Panel>
                                    <ScrollArea h={100}>
                                        {JSON.stringify(submission.netlistJson, null, 2)}
                                    </ScrollArea>
                                </Accordion.Panel>
                            </Accordion.Item>
                        ))
                    }
                </Accordion>
            </Drawer>
            <Affix position={{ bottom: 20, right: 20 }}>
                <Transition transition="slide-up" mounted={hasNotification}>
                {(transitionStyles) => (
                    <Notification style={transitionStyles} color="red" title="Invalid Input" onClose={handleNotificationClose}>
                        The netlist JSON does not meet specifications. Please try again.
                    </Notification>
                )}
                </Transition>
            </Affix>
        </div>
    )
}

export default React.memo(HomePage);