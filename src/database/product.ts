import { RowDataPacket } from "mysql2";
import { connection } from "./db";

export interface Product extends RowDataPacket {
    id: number;
    name: string;
    unitPrice: number;
    stockLevel: number;
    createdAt: Date;
    updatedAt: Date;
}

export async function findAll() : Promise<Product[]>{
    const [rows] = await (await connection).query<Product[]>("SELECT * FROM Products", [])
    return rows
}

export async function findByName(name:string) : Promise<Product|null>{
    const [rows] = await (await connection).query<Product[]>("SELECT * FROM Products WHERE name=?", [name])
    if(rows.length == 0) {
        return null
    }
    return rows[0]
}


export async function createIfNotExists() {
    await (await connection).execute("CREATE TABLE IF NOT EXISTS `Products` (        `id` int NOT NULL AUTO_INCREMENT,         `name` varchar(255) DEFAULT NULL,         `unitPrice` int DEFAULT NULL,         `stockLevel` int DEFAULT NULL,         `createdAt` datetime NOT NULL,        `updatedAt` datetime NOT NULL,         PRIMARY KEY (`id`)       ) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;")
}


export async function seedProducts(){
    await create('Guaraná Fantástica', 4.50,20 );
    await create('NuNuCa Nuß-Nougat-Creme', 14.00,76 );
    await create('Gumbär Gummibärchen', 31.23,15 );
    await create('Schoggi Schokolade', 43.90,49 );
    await create('Rössle Sauerkraut', 45.60,26 );
    await create('Thüringer Rostbratwurst', 123.79,0 );
    await create('Nord-Ost Matjeshering', 25.89,10 );
    await create('Gorgonzola Telino', 12.50,0 );
    await create('Mascarpone Fabioli', 32.00,9 );
    await create('Geitost', 2.50,112 );
    await create('Sasquatch Ale', 14.00,111 );
    await create('Steeleye Stout', 18.00,20 );
    await create('Inlagd Sill', 19.00,112 );
    await create('Gravad lax', 26.00,11 );
    await create('Côte de Blaye', 263.50,17 );
    await create('Chartreuse verte', 18.00,69 );
    await create('Boston Crab Meat', 18.40,123 );
    await create('Jacks New England Clam Chowder', 9.65,85 );
    await create('Singaporean Hokkien Fried Mee', 14.00,26 );
    await create('Ipoh Coffee', 46.00,17 );
    await create('Gula Malacca', 19.45,27 );
    await create('Rogede sild', 9.50,5 );
    await create('Spegesild', 12.00,95 );
    await create('Zaanse koeken', 9.50,36 );
    await create('Chocolade', 12.75,15 );
    await create('Maxilaku', 20.00,10 );
    await create('Valkoinen suklaa', 16.25,65 );
    await create('Manjimup Dried Apples', 53.00,20 );
    await create('Filo Mix', 7.00,38 );
    await create('Perth Pasties', 32.80,0 );
    await create('Tourtière', 7.45,21 );
    await create('Pâté chinois', 24.00,115 );
    await create('Gnocchi di nonna Alice', 38.00,21 );
    await create('Ravioli Angelo', 19.50,36 );
    await create('Escargots de Bourgogne', 13.25,62 );
    await create('Raclette Courdavault', 55.00,79 );
    await create('Camembert Pierrot', 34.00,19 );
    await create('Sirop dérable', 28.50,113 );
    await create('Tarte au sucre', 49.30,17 );
    await create('Vegie-spread', 43.90,24 );
    await create('Wimmers gute Semmelknödel', 33.25,22 );
    await create('Louisiana Fiery Hot Pepper Sauce', 21.05,76 );
    await create('Louisiana Hot Spiced Okra', 17.00,4 );
    await create('Laughing Lumberjack Lager', 14.00,52 );
    await create('Scottish Longbreads', 12.50,6 );
    await create('Gudbrandsdalsost', 36.00,26 );
    await create('Outback Lager', 15.00,15 );
    await create('Flotemysost', 21.50,26 );
    await create('Mozzarella di Giovanni', 34.80,14 );
    await create('Röd Kaviar', 15.00,101 );
    await create('Longlife Tofu', 10.00,4 );
    await create('Rhönbräu Klosterbier', 7.75,125 );
    await create('Lakkalikööri', 18.00,57 );
    await create('Original Frankfurter grüne Soße', 13.00,32 );
}

export async function create(name:string,unitPrice:number, stockLevel:number){
    const existing = await findByName(name)    
    if (existing === null){
        await (await connection).execute("INSERT INTO Products(name,unitPrice, stockLevel,createdAt,updatedAt) values(?,?,?,?,?)",[name,unitPrice,stockLevel,new Date(),new Date()])            
    }
}


