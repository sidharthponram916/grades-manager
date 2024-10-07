import { Nitro } from "nitropack";
import mongoose from 'mongoose'

export default async (_nitroApp: Nitro) => {
    try { 
        console.log("Use runtime config!"); 
        await mongoose.connect(useRuntimeConfig().mongodbUri);
        console.log("Connected to database!") 
    }
    catch (e) {   
        console.error(e); 
    }
};