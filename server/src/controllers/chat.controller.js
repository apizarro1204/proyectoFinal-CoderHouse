import ChatClass from "../DAOs/Chat.dao.class.js";
import path from "path";

const chat = new ChatClass();

export const chatMail = async (req,res)=>{
    if(req.params.id){
        const message = await chat.getByMail(req.params.id);
        console.log(message)
        if(message){
            res.status(200).json(message);
        }else{
            res.status(404).send({
                message: 'Not found'
            });
        }
    }else{
        res.status(404).send({
            error: 'error'
        })
    }
}

export const chatHome = async (req,res) =>{
    const chats = await chat.getAll();
    res.send(chats)
}

export const newMessage = async(req,res)=>{
    const response = await chat.saveMsg(req.body)
    res.send(response)
}


export const chatUser = async (req,res,next)=>{
    try {
        if(req.params.email === undefined || req.params.email === null){
            res.status(400).json({error: 'parametro incorrecto'})
        }
        const response = await chat.getByMail(req.params.email);
        res.status(200).json(response ?? { error: 'usuario no encontrado'})
    } catch (error) {
        next(error)
    }
}
// export const chatUser = async(req,res, next)=>{
//     const response = req.params.email;
//     console.log(response)
//     const data = await chat.getByMail(response)
//     console.log(data)
// if(response){
//     res.status(200).json(data ?? { error: 'usuario no encontrado'})
// }else{
//     console.log('no pasó el primer if')
// }
// }