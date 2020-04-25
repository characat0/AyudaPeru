import Timeout = NodeJS.Timeout;

export class CacheHandler<T> {
  private readonly ttl: number;
  private storage: Map<string, T>;
  private timeouts: Map<string, Timeout>;
  constructor(ttl: number = 600) {
    this.ttl = ttl;
    this.storage = new Map<string, T>();
    this.timeouts = new Map<string, Timeout>();
  }

  public set(key: string, value: T) {
    this.storage.set(key, value);
    this.setDeletion(key);
  }

  public get(key: string, refresh: boolean = true) {
    const value = this.storage.get(key);
    if (value && refresh) {
      const timeout = this.timeouts.get(key);
      clearTimeout(timeout);
      this.timeouts.delete(key);
      this.setDeletion(key);
    }
    return value;
  }

  private setDeletion(key: string) {
    const timeout: Timeout  = setTimeout(() => {
      this.storage.delete(key);
    }, this.ttl);
    this.timeouts.set(key, timeout);
  }
}