import {Instance} from '@aws-sdk/client-ec2';
import {Button, Loading, Table} from '@nextui-org/react';
import moment from 'moment';

interface Props {
  instances: (Instance | undefined)[];
  startInstance: (selectedInstanceId: string | undefined) => void;
  stopInstance: (selectedInstanceId: string | undefined) => void;
  startTime: number;
}

const ListInstancesTable: React.FC<Props> = ({instances, startInstance, stopInstance}) => {
  let delay: Boolean = false;

  return (
    <Table aria-label="EC2 list" striped selectionMode="single">
      <Table.Header>
        <Table.Column>Name</Table.Column>
        <Table.Column>Tag env</Table.Column>
        <Table.Column>Tag project</Table.Column>
        <Table.Column>Tag subproject</Table.Column>
        <Table.Column>Instance Id</Table.Column>
        <Table.Column>Instance Status</Table.Column>
        <Table.Column>Instance Type</Table.Column>
        <Table.Column>Started Since</Table.Column>
        <Table.Column>Actions</Table.Column>
      </Table.Header>

      <Table.Body aria-label="table">
        {instances?.map(instance => {
          const start = instance?.LaunchTime ? new Date(instance.LaunchTime) : new Date();

          let duration: moment.Duration = moment.duration(0);
          if (instance?.State?.Name === 'running') {
            duration = moment.duration(Date.now() - start.getTime());
            if (duration.asHours() >= 1 && instance?.Tags?.find(tag => tag.Key === 'CPSM')) {
              //  toast("The duration has exceeded 1 hours");
              delay = true;
            }
          }

          return (
            <Table.Row key={instance?.InstanceId}>
              <Table.Cell>{instance?.KeyName}</Table.Cell>
              <Table.Cell>{instance?.Tags?.[0].Key} </Table.Cell>
              <Table.Cell> {instance?.Tags?.[0].Value} </Table.Cell>
              <Table.Cell>{instance?.Tags && instance.Tags[1] ? instance.Tags[1].Value : 'N/A'} </Table.Cell>
              <Table.Cell>{instance?.InstanceId}</Table.Cell>
              <Table.Cell>{instance?.State?.Name}</Table.Cell>
              <Table.Cell>{instance?.InstanceType}</Table.Cell>
              <Table.Cell>
                {' '}
                {delay === true ? 'warning -' : 'ok -'}
                {instance?.State?.Name === 'running' ? duration.humanize() : 'Non demmaré'}{' '}
              </Table.Cell>
              <Table.Cell>
                {instance?.State?.Code === 16 ? (
                  <Button color="secondary" onClick={() => stopInstance(instance?.InstanceId)}>
                    Stop
                  </Button>
                ) : instance?.State?.Code === 80 ? (
                  <Button color="secondary" onClick={() => startInstance(instance?.InstanceId)}>
                    Start
                  </Button>
                ) : instance?.State?.Code === 64 ||
                  instance?.State?.Code === 48 ||
                  instance?.State?.Code === 32 ||
                  instance?.State?.Code === 0 ? (
                  <Button size="md" disabled>
                    <Loading type="points" color="success" />
                  </Button>
                ) : (
                  <Button color="error">Unknown State</Button>
                )}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};
export default ListInstancesTable;
