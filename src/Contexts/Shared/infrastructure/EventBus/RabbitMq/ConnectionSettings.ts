export type ConnectionSettings = {
  username: string;
  password: string;
  vhost: string;
  connection: {
    secure: boolean;
    hostname: string;
    port: number;
  };
};
