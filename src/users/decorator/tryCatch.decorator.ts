import { Logger } from '@nestjs/common';
export const AsyncTryCatch = () => {
  return (target, propertyKey, descriptor) => {
    const originalFn = descriptor.value;
    const newFn = async function wrapper(...args) {
      try {
        return await originalFn.call(this, ...args);
      } catch (err) {
        const className = this.constructor.name;
        const methodName = propertyKey;
        const codeContext = `${className}.${methodName}`;
        const log = new Logger(codeContext);
        log.error('error');
        throw err;
      }
    };
    // preserve original function name
    Object.defineProperty(newFn, 'name', { value: originalFn.name }); // newFn.name = originalFn.name;
    descriptor.value = newFn;
  };
};
