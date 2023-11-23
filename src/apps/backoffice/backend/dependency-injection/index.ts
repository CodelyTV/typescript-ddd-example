import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection';

const container = new ContainerBuilder(false,`${__dirname}/../../../../`);
const loader = new YamlFileLoader(container);
const env = process.env.NODE_ENV || 'dev';

loader.load(`${__dirname}/application_${env}.yaml`);

export default container;
