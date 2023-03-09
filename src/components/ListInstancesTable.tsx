import {Instance} from '@aws-sdk/client-ec2';
import {Button, Grid, Input, Loading, Table} from '@nextui-org/react';
import moment from 'moment';
import {useState} from 'react';

interface Props {
  instances: (Instance | undefined)[];
  startInstance: (selectedInstanceId: string | undefined) => void;
  stopInstance: (selectedInstanceId: string | undefined) => void;
  startTime: number;
  handleButtonClick: () => void;
}

const ListInstancesTable: React.FC<Props> = ({instances, startInstance, stopInstance, handleButtonClick}) => {
  const [search, setSearch] = useState('');

  let delay: Boolean = false;

  //  # get InstanceSort

  const letSearch = (e: any) => {
    setSearch(e.target.value);
  };

  const getFilteredInstances = () => {
    return instances.filter(instance => instance?.KeyName?.toLowerCase().includes(search.toLowerCase()));
  };

  return (
    <Grid css={{mw: '1400px'}}>
      <Grid.Container>
        <Input
          bordered
          css={{
            bordered: 'true',
            m: '20px',
            dropShadow: 'xs',
            flexGrow: 1,
            marginLeft: '15px',
            marginRight: '15px',
            marginTop: '20px',
            backgroundColor: '$gray100'
          }}
          aria-label="Search EC2 Instance"
          placeholder="Search EC2 Instance"
          onChange={letSearch}
        />

        <Button css={{m: 20, mr: '9%'}} auto ghost rounded color="gradient" bordered onPress={handleButtonClick}>
          Refresh
        </Button>
      </Grid.Container>

      <Table aria-label="EC2 list" striped selectionMode="single">
        <Table.Header>
          <Table.Column allowsSorting>Name</Table.Column>
          <Table.Column allowsSorting>Tag env</Table.Column>
          <Table.Column allowsSorting>Tag project</Table.Column>
          <Table.Column allowsSorting>Tag subproject</Table.Column>
          <Table.Column allowsSorting>Instance Id</Table.Column>
          <Table.Column allowsSorting>Instance Status</Table.Column>
          <Table.Column allowsSorting>Instance Type</Table.Column>
          <Table.Column allowsSorting>Started Since</Table.Column>
          <Table.Column allowsSorting>Actions</Table.Column>
        </Table.Header>

        <Table.Body aria-label="table">
          {getFilteredInstances().map(instance => {
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
                  {instance?.State?.Name === 'running' ? duration.humanize() : 'not launch'}
                </Table.Cell>
                <Table.Cell css={{fontSize: '12px'}}>
                  {instance?.State?.Code === 16 ? (
                    <Button size="sm" shadow color="warning" onPress={() => stopInstance(instance?.InstanceId)}>
                      Stop
                    </Button>
                  ) : instance?.State?.Code === 80 ? (
                    <Button size="sm" shadow color="success" onPress={() => startInstance(instance?.InstanceId)}>
                      Start
                    </Button>
                  ) : instance?.State?.Code === 64 ||
                    instance?.State?.Code === 48 ||
                    instance?.State?.Code === 32 ||
                    instance?.State?.Code === 0 ? (
                    <Button flat size="sm" disabled color="success">
                      <Loading type="points" color="error" />
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
    </Grid>
  );
};
export default ListInstancesTable;
