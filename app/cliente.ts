//importamos mongoose despues de instalarlo con "npm i mongoose --save" y luego "npm i @types/mongoose --save"
import mongoose = require("mongoose")
import { connectMongo} from "./helpers"

//esta es nuestra interfaz y nos servira de modelo mas adelante
export interface ICliente extends mongoose.Document {
    id: string;
    nombre: string;
    apellido: string;
    edad: number;
    contratos: {};
}

//este esquema se usa para indicarle a mongoDb Como vamos a trabajar
const ClienteSchema = new mongoose.Schema({
    id: { type: String, required: true},
    nombre: { type: String, required: true},
    apellido: { type: String, required: true},
    edad: { type: Number, required: true},
    contratos: { type: JSON, required: false}
});

export const Cliente = mongoose.model<ICliente>("Cliente", ClienteSchema);

//esta funcion nos permitira crear un nuevo cliente
export const createCliente = async function(
    //estos son los parametros que le enviaremos al momento de llamar la funcion
    id: string,
    nombre: string,
    apellido: string,
    edad: number
){
    //primero abrimos una conexion con la base de datos
    await connectMongo;
    //creamos la persistencia del objeto y le damos los valores de los parametros
    const c = new Cliente();

    c.id = id;
    c.nombre = nombre;
    c.apellido = apellido;
    c.edad = edad;

    c.save( (err:any) => {
        if(err){
            console.log(err.message);
        }else{
            console.log(c);
        }
    });
}

//esta funcion es la que nos permitira obtener el cliente de vuelta
export function getCliente(_id: string): Promise<any>{
    return new Promise<any>( resolve => {
        Cliente.findOne({ id: _id}, (err:any, data:any)=>{
            if(err){
                resolve({});
            }else{
                resolve(data);
            }
        });
    });
}