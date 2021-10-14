import { Component, EventEmitter } from '@angular/core';
/**
 * @codeCoverageIgnore
 */
export function MockComponent(options: Component) {
  const metadata: Component = {
    selector: options.selector,
    template: options.template || '',
    inputs: options.inputs,
    outputs: options.outputs || [],
    exportAs: options.exportAs || ''
  };

  class Mock { }

  if (Array.isArray(metadata.outputs)) {
    metadata.outputs.forEach((method: any) => {
      const object: any = {};
      object[method] = new EventEmitter<any>();
      Mock.prototype = { ...Mock.prototype, object };
    });
  }

  return Component(metadata)(Mock as any);
}
