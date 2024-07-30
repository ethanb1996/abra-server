import { MongoClient, Document,ServerApiVersion, FindCursor } from "mongodb";
import { CrudInterface } from "../../interfaces/crud.interface";

// IDEA : define a interface that the service need to implement such that if in the futur we want to change the db technology it will be easy

export class MongoDbService<T> implements CrudInterface<T>{

    private readonly client: MongoClient;
    private readonly collectionName: string;
    private readonly clusterName: string;
    constructor(collectionName: string, clusterName: string) {
        // Create a MongoClient with a MongoClientOptions object to set the Stable API version
        const uri = `mongodb+srv://bonanethan:<${process.env.MONGO_DB_PASSWORD}>@cluster0.i3f9bpj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
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

    async insert(row: T): Promise<Document> {
        try {
            await this.client.connect();
            // Get the database and collection on which to run the operation
            const db = this.client.db(this.clusterName);
            const collection = db.collection(this.collectionName);
            
            const p = await collection.insertOne(row as Document)
            return p
        } catch (err) {
            console.log(err.stack);
            return err.stack
        }
        finally {
            await this.client.close();
        }
    }
    
    async readAllRows(): Promise<T[]>{
        try {
            await this.client.connect();
            // Get the database and collection on which to run the operation
            const db = this.client.db(this.clusterName);
            const collection = db.collection(this.collectionName);
            
            const cursor:FindCursor = await collection.find()
            const allValues: T[] = await cursor.toArray() as T[]
            return allValues
        } catch (err) {
            console.log(err.stack);
            return err.stack
        }
        finally {
            await this.client.close();
        }
    }
}