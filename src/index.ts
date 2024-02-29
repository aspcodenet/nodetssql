import express, { Express, Request, Response } from "express";
import  { Message, getAllMessages } from "./models/message";
import dotenv from "dotenv";
import { findAll, createIfNotExists,seedProducts } from "./database/product";
 
dotenv.config();
 
const app: Express = express();
const port = process.env.PORT || 3000;
 
app.get("/test", (req: Request, res: Response) => {
    res.json(getAllMessages());
  });


  app.get("/test2", async (req: Request, res: Response) => {
    const allProducts = await findAll()
    res.json(allProducts);
  });
  

  
 
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
 
app.listen(port, async () => {
  await createIfNotExists()
  await seedProducts()
  console.log(`[server]: Server is running at http://localhost:${port}`);
}); 