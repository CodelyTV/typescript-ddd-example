export class RabbitMQExchangeNameFormatter {
  public static retry(exchangeName: string): string {
    return `retry-${exchangeName}`;
  }

  public static deadLetter(exchangeName: string): string {
    return `dead_letter-${exchangeName}`;
  }
}
