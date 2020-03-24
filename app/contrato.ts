import mongoose = require("mongoose")
import { connectMongo} from "./helpers"
import { ICliente, getCliente } from "./cliente"

interface IContrato extends mongoose.Document{
    noContrato: string;
    FechaContrato: Date;
    Vehiculo: string;
    AbonoPrevio: number;
    Factura: string;
    Empleado : string;
    Cliente: ICliente;
}

const ContratoSchema = new mongoose.Schema({
    noContrato: {type: String, required: true},
    FechaContrato: {type: Date, required: true},
    Vehiculo: {type: String, required: true},
    AbonoPrevio: {type: Number, required: true},
    Factura: {type: String, required: true},
    Empleado : {type: String, required: true},
    //ese nombre Cliente es el que le damos al modelo
    Cliente: {type: mongoose.Schema.Types.ObjectId, ref: "Cliente"},
});

export const Contrato = mongoose.model<IContrato>("Contrato", ContratoSchema);

export const createContrato = async function(
    //este es el identificador mediante el cual buscaremos al cliente para poder hacer la referencia
    idCliente: string,
    //estos son los parametros que le dareos como atributos al nuevo objeto contrato
    noContrato: string,
    FechaContrato: Date,
    Vehiculo: string,
    AbonoPrevio: number,
    Factura: string,
    Empleado : string,
){
    //abrimos la conexion
    await connectMongo;
    //obtenemos el objectId del objeto en la base de datos de mongo
    const cli:any = await getCliente(idCliente);

    const con = new Contrato();

    con.noContrato = noContrato;
    con.FechaContrato = FechaContrato;
    con.Vehiculo = Vehiculo;
    con.AbonoPrevio = AbonoPrevio;
    con.Factura = Factura;
    con.Empleado = Empleado;
    //aqui le asignamos ese id que buscamos de los clientes, usamos el numero de identidad y no el nombre porque el numero de identidad es unico
    con.Cliente = cli;

    //aqui mandamos a guardar, basicamente lo que le decimos es que guarde, y si detecta un error lo imprima y si no lo hau entonces impprima el objeto
    con.save((err:any) => {
        if(err){
            console.log(err.message);
        }else{
            console.log(con)
        }
    });
};