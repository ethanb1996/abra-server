import { randomUUID } from "crypto";
import { Place } from "../types/place";
import { Request, Response } from 'express';
import { MongoDbService } from "../services/mongo.service";

const COLLECTION_NAME="PLaces";
const CLUSTER_NAME="abraDb";

const createPlace = async (req: Request, res: Response):Promise<void> => {
    try {
        const { name, type, address } = (req.body! as any).place;
        const place: Place = {
            id: randomUUID() as string,
            name: name,
            type: type,
            address: address,
            creationDate: new Date()
        }
        // const mongoDbService = new MongoDbService<Place>(process.env.COLLECTION_NAME!, process.env.CLUSTER_NAME!)
        const mongoDbService = new MongoDbService<Place>(COLLECTION_NAME, CLUSTER_NAME)
        const document = await mongoDbService.insert(place)
        res.json(document);
    } catch (err:any) {
        res.status(500).send(err);
    }
};

const getPlace = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const filter = {
            id: id
        }
        // const mongoDbService = new MongoDbService<Place>(process.env.COLLECTION_NAME!, process.env.CLUSTER_NAME!)
        const mongoDbService = new MongoDbService<Place>(COLLECTION_NAME, CLUSTER_NAME)
        const rows: Place[] = await mongoDbService.readRows(filter)
        res.json(rows)
    } catch (err) {
        res.status(500).send(err);
    }
}


export { getPlace, createPlace }