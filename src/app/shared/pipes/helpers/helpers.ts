export function isUndefined(value: any) {
    return typeof value === 'undefined';
}

export function isNull(value: any) {
    return value === null;
}
export function isFunction(value: any) {
    return typeof value === 'function';
}

export function isBoolean(value: any) {
    return typeof value === 'boolean';
}

export function isNumber(value: any) {
    return typeof value === 'number';
}
export function isString(value: any) {
    return typeof value === 'string';
}

export function extractDeepPropertyByMapKey(obj: any, map: string): any {
    const keys = map.split('.');
    const head = keys.shift();

    return keys.reduce((prop: any, key: string) => {
        return !isUndefined(prop) && !isNull(prop) && !isUndefined(prop[key]) ? prop[key] : undefined;
    }, obj[head || '']);
}


export function extractDeepPropertyByParentMapKey(obj: any, map: string): any {
    const keys = map.split('.');
    const tail = keys.pop();
    const props = extractDeepPropertyByMapKey(obj, keys.join('.'));

    return { props, tail };
}

export function isNumberFinite(value: any) {
    return isNumber(value) && isFinite(value);
}
