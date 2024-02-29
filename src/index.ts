import express, { Express, Request, Response } from "express";
import  { Message, getAllMessages } from "./models/message";
import dotenv from "dotenv";
import { findAll, createIfNotExists,seedProducts } from "./database/product";
import ejs from "ejs";
dotenv.config();
 
const app: Express = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs')
 
 
app.get("/test", (req: Request, res: Response) => {
    res.json(getAllMessages());
  });


  app.get("/products", async (req: Request, res: Response) => {
    const allProducts = await findAll()
    res.render('pages/products',{
      allProducts
  });
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