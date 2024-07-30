export interface CrudInterface<T> {
    insert(row: T):Promise<void>,
    readRows(filter:any):  Promise<T[]>
}