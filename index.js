const jsonServer=require("json-server");
const server=jsonServer.create();
const router=jsonServer.router("db.json");
const middlewares=jsonServer.defaults();
const port=8080;
server.use(middlewares);
server.use(router);

server.use((req, res, next) => {
    let NeedsAuthorization = false;
  

  
      if ((req.url).startsWith("/dogs")) {
          NeedsAuthorization = true;
      }
  
    if (NeedsAuthorization) {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1];
      if (!authHeader || !token)
        return res
          .status(403)
          .send(
            "Its a protected route/method. You need an auth token to access it."
          );
        if(token=="QpwL5tke4Pnpja7X4"){
            next();
        }else{
            return res
            .status(403)
            .send("Some error occurred wile verifying token.");
        }
    } else {
      next();
    }
  });


server.listen(port,()=>{
    console.log("running")
});