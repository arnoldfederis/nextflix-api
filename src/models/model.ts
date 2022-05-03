import { Entity, property } from '@loopback/repository';

export class Model extends Entity {
  @property({
    type: 'date',
    default: () => new Date(),
  })
  createdAt?: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  updatedAt?: string;
}
