export type TDefaultFindAllInput = { page?: number; limit?: number };

export interface IDefaultRepositories<T> {
  findAll(input: TDefaultFindAllInput): Promise<T[]>;
  findById(id: string): Promise<T>;
  save(input: Omit<T, 'id'>): Promise<T>;
  update(input: Partial<T>): Promise<T>;
  deleteById(id: string): Promise<boolean>;
}
