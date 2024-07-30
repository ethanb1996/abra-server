export interface CrudInterface<T> {
    insert(row: T),
    readAllRows()
}