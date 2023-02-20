import {useState, useContext, useEffect, useCallback} from 'react';
import {AssumeRoleCommand, Credentials, STSClient} from '@aws-sdk/client-sts';
import {DescribeInstancesCommand, EC2Client, Instance, StartInstancesCommand, StopInstancesCommand} from '@aws-sdk/client-ec2';
import {Button, Container} from '@nextui-org/react';
import toast, {Toaster} from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import AwsProvider, {AccountContext, RegionContext, RoleContext} from '../providers/AwsProvider';
import ListInstancesTable from '../components/ListInstancesTable';

// here we define
interface Props {
  credentials: Credentials | undefined;
  account: string | undefined;
  region: string | undefined;
  role: string | undefined;
  startTime?: number;
}

const ListInstances: React.FC<Props> = ({credentials}) => {
  const [instances, setInstances] = useState<(Instance | undefined)[] | undefined>();
  const [account] = useContext(AccountContext);
  const [region] = useContext(RegionContext);
  const [role] = useContext(RoleContext);
  const [startTime, setStartTime] = useState<{[key: string]: number}>({});
  const [selectedInstanceId, setSelectedInstanceId] = useState<string | undefined>(undefined);

  // intitialisation of EC2 Client with credentials from CredentialProvider
  const createEC2Client = async () => {
    if (!credentials?.AccessKeyId || !credentials?.SecretAccessKey) return;

    // Assume the role of the AWS account created role with new credentials
    const {Credentials: stsCredentials} = await new STSClient({
      region,
      credentials: {
        accessKeyId: credentials?.AccessKeyId,
        secretAccessKey: credentials?.SecretAccessKey,
        sessionToken: credentials?.SessionToken,
        expiration: credentials?.Expiration
      }
    }).send(
      // there we assumiong role
      new AssumeRoleCommand({
        RoleArn: `arn:aws:iam::${account}:role/${role}`,
        RoleSessionName: `test`
      })
    );

    if (!stsCredentials?.AccessKeyId || !stsCredentials?.SecretAccessKey) return; // eslint-disable-line
    // eslint-disable-next-line
    return new EC2Client({
      credentials: {
        accessKeyId: stsCredentials?.AccessKeyId,
        secretAccessKey: stsCredentials?.SecretAccessKey,
        sessionToken: stsCredentials?.SessionToken,
        expiration: stsCredentials?.Expiration
      }
    });
  };
  // There we load all instances in our useSate instances
  const loadInstances = useCallback(async () => {
    try {
      const ec2Client = await createEC2Client();
      if (!ec2Client) return;
      // There we get all instances for the given user credentials and AWS region in response
      const response = await ec2Client.send(new DescribeInstancesCommand({}));
      // Store the instances in the component state.
      setInstances(
        response?.Reservations?.flatMap(reservation => reservation.Instances)
          .map(instance => instance)
          .filter(instance => !!instance)
      );
    } catch (err: any) {
      if (err.code) {
        console.log(err.code);
      } else {
        console.log(err);
      }
    }
  }, [createEC2Client]);
  // Load all instances of account region and role  use default state if not sepcified

  useEffect(() => {
    if (account && role && region) {
      loadInstances();
    }
  }, [account, role, region]);

  // Refresh instances list if the selected instance or the instance state changes.

  useEffect(() => {
    const refreshInstances = async () => {
      await loadInstances();
    };

    if (selectedInstanceId && instances) {
      const selectedInstance = instances.find(instance => instance?.InstanceId === selectedInstanceId);
      if (!selectedInstance) {
        setSelectedInstanceId(undefined);
      }
    }
    if (instances?.every(instance => instance?.State?.Code === 80 || instance?.State?.Code === 16)) return;
    refreshInstances();
    return () => {}; // eslint-disable-line
  }, [instances, selectedInstanceId, loadInstances]);

  const navigate = useNavigate();

  function handleButtonClick() {
    setInstances([]);
    navigate('');
  }

  const startInstance = async (selectedInstanceId: string | undefined) => {
    if (!selectedInstanceId || !credentials?.AccessKeyId || !credentials?.SecretAccessKey) return;
    try {
      setSelectedInstanceId(selectedInstanceId);
      setStartTime({...startTime, [selectedInstanceId]: Date.now()});
      const ec2Client = await createEC2Client();
      if (!ec2Client) return;
      // We use ec2Client created previously with assumed credentials to run  DescribeInstancesCommand to read state of instances
      const describeInstance = await ec2Client.send(
        new DescribeInstancesCommand({
          InstanceIds: [selectedInstanceId]
        })
      );
      const instances = describeInstance.Reservations?.[0]?.Instances;

      if (!instances) throw new Error('No Instances found in this Reservations');
      const instance_state = instances?.[0]?.State?.Code;
      // Only start the instance if it's currently stopped
      if (instance_state === 16) {
        toast.error(`Instance ${selectedInstanceId} is already running`);
      } else if (instance_state === 0) {
        toast.error(`Instance ${selectedInstanceId} is already pending`);
      } else if (instance_state === 32) {
        toast.error(`Instance ${selectedInstanceId} is shutting-down`);
      } else if (instance_state === 64) {
        toast.error(`Instance ${selectedInstanceId} is stopping`);
      } else {
        // Then we send startIntance Command to selected instance
        // We use ec2Client created previously with assumed credentials to run StartInstancesCommand and read state of instances
        await ec2Client.send(
          new StartInstancesCommand({
            InstanceIds: [selectedInstanceId]
          })
        );
        setStartTime({[selectedInstanceId]: Date.now()});

        await loadInstances();
      }
      if (instance_state === 16) {
        toast.success(`Instances  ${selectedInstanceId} est demmaré`);
      }
    } catch (err: unknown) {
      toast.error(`Une erreur a empeché le demmarage de l'instance ${selectedInstanceId}: ${(err as Error).message}`);
    }
    toast.success(`Instances  ${selectedInstanceId} est en cours de demmarage `);
  };

  const stopInstance = async (selectedInstanceId: string | undefined) => {
    if (selectedInstanceId && credentials?.AccessKeyId && credentials?.SecretAccessKey) {
      setSelectedInstanceId(selectedInstanceId);
      try {
        const ec2Client = await createEC2Client();
        if (!ec2Client) return;

        const describeInstance = await ec2Client.send(
          new DescribeInstancesCommand({
            InstanceIds: [selectedInstanceId]
          })
        );
        const instances = describeInstance.Reservations?.[0]?.Instances;

        if (!instances) throw new Error('No Instances found in this Reservations');
        const instance_state = instances?.[0]?.State?.Code;
        if (instance_state === 80) {
          toast.error(`Instance ${selectedInstanceId} is already stopped`);
        } else if (instance_state === 0) {
          toast.error(`Instance ${selectedInstanceId} is already pending`);
        } else if (instance_state === 32) {
          toast.error(`Instance ${selectedInstanceId} is shutting-down`);
        } else if (instance_state === 64) {
          toast.error(`Instance ${selectedInstanceId} is stopping`);
        } else {
          await ec2Client.send(
            new StopInstancesCommand({
              InstanceIds: [selectedInstanceId]
            })
          );
        }
        await loadInstances();

        if (instance_state === 80) {
          toast.success(`Instances  ${selectedInstanceId} est arrété`);
        }
      } catch (err: unknown) {
        toast.error(`Une erreur a empeché l'arret' de l'instance ${selectedInstanceId}: ${(err as Error).message}`);
      }
    }
    toast.success(`Instances  ${selectedInstanceId} est en cours d'arret`);
  };

  return (
    <div>
      <AwsProvider>
        <Container css={{display: 'flex', flexDirection: 'row-reverse', margin: 'auto'}}>
          <Button css={{m: 10, mr: '5%'}} auto ghost rounded color="gradient" bordered onClick={() => handleButtonClick}>
            Refresh
          </Button>
        </Container>
        {account && region && role && (
          <div>
            {instances && (
              <ListInstancesTable
                instances={instances}
                startTime={startTime[Object.keys(startTime)[0]]}
                startInstance={startInstance}
                stopInstance={stopInstance}
              />
            )}
          </div> // eslint-disable-line
        )}
        <Toaster />
      </AwsProvider>
    </div>
  );
};

export default ListInstances;
