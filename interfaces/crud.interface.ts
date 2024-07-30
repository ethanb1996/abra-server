export interface CrudInterface<T> {
    insert(row: T),
    readRows(filter:any)
}