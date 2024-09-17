export function convertBigIntToString(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(convertBigIntToString);
    } else if (obj !== null && typeof obj === 'object') {
      return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
          key,
          typeof value === 'bigint' ? value.toString() : convertBigIntToString(value),
        ])
      );
    } else {
      return obj;
    }
  }