export class RabbitMQConnectionConfigurationMother {
  static create() {
    return {
      connectionSettings: {
        username: 'guest',
        password: 'guest',
        vhost: '/',
        connection: {
          secure: false,
          hostname: 'localhost',
          port: 5672
        }
      },
      exchangeSettings: { name: '' }
    };
  }
}
