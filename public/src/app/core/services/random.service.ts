export class RandomService {
  public getInteger(max: number): number {
    return Math.floor(Math.random() * (max + 1))
  }

  public getRangedInteger(min: number, max: number): number {
    return min + this.getInteger(max - min);
  }

  public getRandomItem<T>(collection: Array<T>): T {
    let randomIdx = Math.floor(Math.random() * (collection.length));
    return collection[randomIdx];
  }
}