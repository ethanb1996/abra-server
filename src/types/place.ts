import { ObjectId } from "mongodb"

export type Place = {
    _id: ObjectId,
    name: string,
    type: string,
    creationDate: Date,
    address: string
}