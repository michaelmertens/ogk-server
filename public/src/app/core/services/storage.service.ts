import { Injectable } from '@angular/core';

export class CacheService {

  /**
   * Abstract layer for storage, delay decision of storage method
    */
  constructor(protected storage: Storage) { }

  public get = (key: string): any => {
    const storedItem = this.storage[key];
    if (!(storedItem) || storedItem === 'undefined' || storedItem === 'null') {
      return undefined;
    }
    return JSON.parse(storedItem);
  }

  public store = (key: string, obj: any): void => {
    this.storage.setItem(key, JSON.stringify(obj));
  }

  public remove = (key: string): void => {
    delete this.storage[key];
  }

  public destroy = (): void => {
    this.storage.clear();
  }
}

@Injectable()
export class StorageService extends CacheService {

  constructor() {
    super(localStorage);
  }

}
