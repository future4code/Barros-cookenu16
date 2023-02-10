import express from "express"
import cors from 'cors'
import { userRouter } from './routes/UserRouter';
import { recipesRouter } from "./routes/RecipesRouter";

export const app = express()

app.use(express.json())
app.use(cors())

app.use('/users',userRouter)
app.use('/recipes',recipesRouter)



app.listen(3003, () => {
    console.log("Server is running in http://localhost:3003");
});