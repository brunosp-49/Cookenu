import { app } from "./app";
import { createRecipe } from "./endpoints/createRecipes";
import { getRecipe } from "./endpoints/getRecipe";
import { getUserById } from "./endpoints/getUserById";
import { info } from "./endpoints/info";
import { login } from "./endpoints/login";
import { singUp } from "./endpoints/singup";
import { teste } from "./endpoints/teste";

app.post('/teste/:token', teste)

app.get('/user', info)

app.get('/user/:id', getUserById)

app.get('/recipe/:id', getRecipe)

app.post('/singup', singUp)

app.post('/login', login)

app.post('/recipe/new', createRecipe)