import { DbEntity } from '@app/common';

type Entity<T> = DbEntity & T;
export interface RepositoryInterface<T> {
  list(): Promise<Entity<T>[]>;
  get(id: string): Promise<Entity<T>>;
  create(data: unknown): Promise<Entity<T>>;
  update(id: string, data: unknown): Promise<Entity<T>>;
  delete(id: string): Promise<boolean>;
}
