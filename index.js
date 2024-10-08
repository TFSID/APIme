import Hapi from "@hapi/hapi";
import process from "node:process";
import Ongoing from "otakuanime/services/ongoing";
import { Search } from "otakuanime/services/search";
import Genres from "otakuanime/services/genres";
import Completed from "otakuanime/services/completed";
import Detail from "otakuanime/services/detail";
// import Video from "otakuanime/services/video";
import Video from "./services/video.js";

const initialization = async function () {
  const server = Hapi.server({
    port: 8000,
    host: "localhost"
  });

  server.route({
    method: "GET",
    path: "/",
    handler: async function(request){
      if(request.query.pagination != undefined){
        return await Ongoing(request.query.pagination);
      }
      return await Ongoing(null);
    }
  });

  server.route({
    method:"GET",
    path:"/search",
    handler: async function (request) {
     return await Search(request.query.q); 
    }
  });

  server.route({
    method:"GET",
    path:"/completed",
    handler: async function (request) {
      if(request.query.pagination != undefined){
        return await Completed(request.query.pagination);
      }else{
        return await Completed(null);
      }
    }
  })

  server.route({
    method:"GET",
    path:"/genres",
    handler:async function(){
      return await Genres();
    }
  });

  server.route({
    method:"GET",
    path:"/detail",
    handler:async function (request) {
      if(request.query.id){
        return await Detail(request.query.id); 
      }else{
        return await Detail(null);
      }
    }
  })

  server.route({
    method:"GET",
    path:"/nonton",
    handler:async function (request) {
      if(request.query.id){
        return await Video(request.query.id); 
      }else{
        return await Video(null);
      }
    }
  })

  server.start();
  console.log(`Server running in port 8000`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

initialization();
