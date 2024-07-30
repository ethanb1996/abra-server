import { MongoClient, Document,ServerApiVersion, FindCursor } from "mongodb";

import { CrudInterface } from "../../interfaces/crud.interface";

const MONGO_DB_PASSWORD="jBmTNABd9bDaDplI";
const MONGO_USER="user1"

export class MongoDbService<T> implements CrudInterface<T>{

    private readonly client: MongoClient;
    private readonly collectionName: string;
    private readonly clusterName: string;
    constructor(collectionName: string, clusterName: string) {
        // const uri = `mongodb+srv://bonanethan:<${process.env.MONGO_DB_PASSWORD}>@cluster0.i3f9bpj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
        const uri = `mongodb+srv://${MONGO_USER}:${MONGO_DB_PASSWORD}@cluster0.i3f9bpj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
        this.client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        })
        this.collectionName = collectionName;
        this.clusterName = clusterName;
    }

    getClient(): MongoClient {
        return this.client
    }

    async insert(row: T): Promise<void> {
        try {
            await this.client.connect();
            // Get the database and collection on which to run the operation
            const db = this.client.db(this.clusterName);
            const collection = db.collection(this.collectionName);
            
            await collection.insertOne(row as Document)
            
        } catch (err:any) {
            console.log(err.stack);
            throw(new Error(err.stack))
        }
        finally {
            await this.client.close();
        }
    }
    
    async readRows(filter:{[key:string]:any}): Promise<T[]>{
        try {
            await this.client.connect();
            // Get the database and collection on which to run the operation
            const db = this.client.db(this.clusterName);
            const collection = db.collection(this.collectionName);
            
            const cursor:FindCursor = await collection.find(filter)
            const values: T[] = await cursor.toArray() as T[]
            return values
        } catch (err:any) {
            console.log(err.stack);
            throw(new Error(err.stack))
        }
        finally {
            await this.client.close();
        }
    }
}