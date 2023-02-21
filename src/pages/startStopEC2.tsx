import {useState, useContext, useEffect, useCallback} from 'react';
import {AssumeRoleCommand, Credentials, STSClient} from '@aws-sdk/client-sts';
import {DescribeInstancesCommand, EC2Client, Instance, StartInstancesCommand, StopInstancesCommand} from '@aws-sdk/client-ec2';
import {useNavigate} from 'react-router-dom';
import toast, {Toaster} from 'react-hot-toast';
import AwsProvider, {AccountContext, RegionContext, RoleContext} from '../providers/AwsProvider';

import ListInstancesTable from '../components/ListInstancesTable';
import Instructions from '../components/Instructions';

// here we define props for used variables
interface Props {
  credentials: Credentials | undefined;
  account: string | undefined;
  region: string | undefined;
  role: string | undefined;
}

const ListInstances: React.FC<Props> = ({credentials}) => {
  const [instances, setInstances] = useState<(Instance | undefined)[] | undefined>();
  const [account] = useContext(AccountContext);
  const [region] = useContext(RegionContext);
  const [role] = useContext(RoleContext);
  const [startTime, setStartTime] = useState<{[key: string]: number}>({});
  const [selectedInstanceId, setSelectedInstanceId] = useState<string | undefined>(undefined);
  const [visible, setVisible] = useState(true);

  // Load all instances of account region and role  use default state if not sepcified

  useEffect(() => {
    if (account && role && region) {
      loadInstances();
    }
  }, [account, role, region]);

  console.log(instances?.[0]?.State?.Code);

  // intitialisation of EC2 Client with credentials from CredentialProvider
  const createEC2Client = useCallback(async () => {
    if (!credentials?.AccessKeyId || !credentials?.SecretAccessKey) return null;

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

    if (!stsCredentials?.AccessKeyId || !stsCredentials?.SecretAccessKey) return null;
    // We pass the credentials of assumed role to create the EC2 client.
    return new EC2Client({
      region,
      credentials: {
        accessKeyId: stsCredentials?.AccessKeyId,
        secretAccessKey: stsCredentials?.SecretAccessKey,
        sessionToken: stsCredentials?.SessionToken,
        expiration: stsCredentials?.Expiration
      }
    });
  }, [credentials, account, role, region]);
  // There we load all instances in our useSate instances
  const loadInstances = useCallback(async () => {
    try {
      const ec2Client = await createEC2Client();
      if (!ec2Client) return;
      // There we get all instances for the given user credentials and AWS region in response
      const response = await ec2Client.send(new DescribeInstancesCommand({}));
      // Store the instances in the component state.
      setInstances(response?.Reservations?.flatMap(reservation => reservation.Instances)?.filter(instance => !!instance));
    } catch (err: any) {
      if (err.code || err.message) {
        throw err.code || err.message;
      } else {
        console.log(err);
      }
    }
  }, [createEC2Client]);

  // Load all instances of account region and role  use default state if not sepcified for role and region
  useEffect(() => {
    if (account && role && region) {
      setInstances([]);
      loadInstances();
    }
  }, [account, role, region]); // eslint-disable-line

  // Refresh instances list if the selected instance or the instance state changes.

  useEffect(() => {
    const timer = setTimeout(async () => {
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
    }, 2000);
    return () => clearTimeout(timer);
  }, [instances, selectedInstanceId, loadInstances]);

  // Load all instances of account region and role  use default state if not sepcified

  useEffect(() => {
    if (account && role && region) {
      setInstances([]);
      loadInstances();
    }
  }, [account, role, region]);

  // Refresh instances list if the selected instance or the instance state changes.

  useEffect(() => {
    const timer = setTimeout(async () => {
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
    }, 1000);
    return () => clearTimeout(timer);
  }, [instances, selectedInstanceId, loadInstances]);

  const navigate = useNavigate();

  function handleButtonClick() {
    loadInstances();
    navigate('');
  }

  // Using createEC2Client function and a selected Instance in arr to start EC2 instance

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
    <AwsProvider>
      <Instructions visible={visible === true} onClose={() => setVisible(false)} />
      {account && region && role && (
        <div>
          {instances && (
            <ListInstancesTable
              instances={instances}
              startTime={startTime[Object.keys(startTime)[0]]}
              startInstance={startInstance}
              stopInstance={stopInstance}
              handleButtonClick={() => handleButtonClick}
            />
          )}
        </div>
      )}
      <Toaster />
    </AwsProvider>
  );
};

export default ListInstances;
