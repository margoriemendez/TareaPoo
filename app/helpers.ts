import mongoose = require("mongoose")

const url: string = "mongodb+srv://mar:mar@cluster0-i5bsq.azure.mongodb.net/Rentadora?retryWrites=true&w=majority";

export const connectMongo = new Promise<void>(resolve =>{
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true}, (err:any) =>{
        if(err){
            console.log(err.message);
        }else{
            console.log("Conexion Exitosa");
        }
        resolve();
    });
});