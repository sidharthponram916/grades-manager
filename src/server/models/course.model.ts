import { Schema, model } from "mongoose";

export interface Course { 
    title: String; 
    code: String; 
    average: String; 
    assignments: [Assignment]; 
    weights: Object; 
}

export interface Assignment extends Course { 
    name: String; 
    category: String; 
    grade: Number; 
    percentage: Number; 
}

const courseSchema = new Schema({ 
    title: { 
        type: String, 
        required: true
    }, 
    name: { 
        type: String, 
        required: true
    }, 
    average: { 
        type: Number, 
        required: true 
    }, 
    credits: { 
        type: Number, 
        required: true
    }, 
    weights: { 
        type: Object, 
        required: true, 
    }, 
    assignments: { 
        type: Array, 
        default: []
    }
})

export default model("courses", courseSchema); 