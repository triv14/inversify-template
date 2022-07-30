import "reflect-metadata";
import { Container } from "inversify";
// injections
import Customer from "./model/Customer";

const container = new Container({
  autoBindInjectable: true,
  skipBaseClassChecks: true,
});

container.bind("Customer").toConstantValue(Customer);

export { container };
