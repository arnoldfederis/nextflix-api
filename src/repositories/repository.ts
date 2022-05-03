import { inject } from '@loopback/core';
import {
  DefaultCrudRepository,
  Entity,
  Where,
  WhereBuilder,
} from '@loopback/repository';
import { MongodbDataSource } from '../datasources';

export class Repository<
  T extends Entity,
  ID,
  Relations extends object = {}
> extends DefaultCrudRepository<T, ID, Relations> {
  constructor(
    public entityClass: typeof Entity & { prototype: T },
    @inject('datasources.mongodb') dataSource: MongodbDataSource
  ) {
    super(entityClass, dataSource);
    const modelClass = super.definePersistedModel(entityClass);

    modelClass.observe('persist', async (ctx: any) => {
      ctx.data.updatedAt = new Date();
    });
  }

  public async deleteWithRelation(id: ID, foreignKey: string): Promise<void> {
    const hasManyRelation = await this.find({
      where: { [foreignKey]: id } as Where,
    });

    if (!hasManyRelation) {
      return;
    }

    const foreignKeys = hasManyRelation.map(
      (relation: any) => `${relation[foreignKey]}`
    );

    const query = new WhereBuilder({
      [foreignKey]: { inq: foreignKeys },
    }).build();

    await this.deleteById(id);
    await this.deleteAll(query);
  }
}
