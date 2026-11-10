

export class FileDB {
  private registeredSchemas: Map<string, new (filePath: string) => unknown> =
    new Map();

  registerSchema(
    tableName: string,
    tableClass: new (filePath: string) => unknown,
  ): void {
    this.registeredSchemas.set(tableName, tableClass);
  }

  getTable<T>(tableName: string): T {
    const tableClass = this.registeredSchemas.get(tableName);
    if (tableClass === undefined) {
      throw new Error("Table not registered");
    }
    return new tableClass(`${tableName}.json`) as T;
  }
}
