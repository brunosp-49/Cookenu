# Cookenu

link base: https://cookenu-28.herokuapp.com

## Endpoints: <br> <br>
-Singup:
/singup
body: name, email, password

-Login:
/login
body: email, password

-Informações do user:
/user
header: token

-Criar receita:
/recipe/new
body: tittle, description
header: token

-Pegar receita pelo id:
/recipe/:id
params: id
header: token

-Pegar user pelo id:
/user/:id
params: id
header: token
