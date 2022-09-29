import { ConfigureRabbitMQCommand } from './ConfigureRabbitMQCommand';

ConfigureRabbitMQCommand.run()
  .then(() => {
    console.log('RabbitMQ Configuration success');
    process.exit(0);
  })
  .catch(error => {
    console.log('RabbitMQ Configuration fail', error);
    process.exit(1);
  });
