import { myDataSource } from "./app-data-source";
import express from "express";
import { Request, Response } from "express";
import { User } from "./entity/user.entity";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authenticateToken } from "./middleware/authorization";
import { getAllUsers, getUserbyId, pay, topup } from "./repo/userRepo";
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET
myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    // start express server
    app.listen(PORT);
    console.log("server listening on PORT : " + PORT);
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const app = express();
app.use(express.json());

app.get("/users", async function (req: Request, res: Response) {
  const users = await getAllUsers()
  res.json(users);
});

app.get('/users/getUserInfo',authenticateToken,(req : any,res) => {
    res.send(req.user)
})

app.post('/users/topup',authenticateToken,async (req : any,res) => {
    if(req.user.id == req.body.id){
       try {
         const topupres =  await topup(req.user.id,req.body.amount);
        res.send("Topup success")
       } catch (error) {
        res.status(400).send("Topup not successful")
       }
       
    }else{
        res.status(400).send("Invalid Token")
    }
    
})

app.post('/users/pay',authenticateToken,async (req : any,res) => {
    if(req.user.id == req.body.payerId){
       try {
         const paymentres =  await pay(req.user.id,req.body.payeeId,req.body.amount);
         res.send(paymentres)
       } catch (error) {
        res.status(400).send("payment not successfull")
       }
       
       
    }else{
        res.status(400).send("Invalid Token")
    }
})

app.get("/users/:id", async function (req: Request, res: Response) {
  const user = await getUserbyId(req.params.id)
  const nonSensitiveData = {firstName:user.firstName,lastName:user.lastName}
  return res.send(user);
});


app.post("/users/login", async (req, res) => {
  const user = await myDataSource.getRepository(User).findOneBy({
    email: req.body.email,
  });
  if (user == null) {
    return res.status(400).send("Can not find user");
  }
  try {
    if (await bcrypt.compare(req.body.password,user.password)) {
      const tokenData = {
        id: user.id,
        username: user.username,
        firstName:user.firstName,
        lastName:user.lastName,
        email: user.email,
        address:user.address,
      };
      const accessToken = jwt.sign(tokenData, JWT_SECRET, {expiresIn:"7d"})
      res.json({accessToken:accessToken})
    } else {
      res.send("not allowed");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/users", async function (req: Request, res: Response) {
  console.log(req.body);
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const tempUser = { ...req.body, password: hashedPassword };
    const user = await myDataSource.getRepository(User).create(tempUser);
    const results = await myDataSource.getRepository(User).save(user);
    return res.send(results);
  } catch (error) {
    res.status(500).send(error.code || error);
  }
});

app.put("/users/:id", async function (req: Request, res: Response) {
  const user = await myDataSource.getRepository(User).findOneBy({
    id: req.params.id,
  });
  myDataSource.getRepository(User).merge(user, req.body);
  const results = await myDataSource.getRepository(User).save(user);
  return res.send(results);
});

app.delete("/users/:id", async function (req: Request, res: Response) {
  const results = await myDataSource.getRepository(User).delete(req.params.id);
  return res.send(results);
});

