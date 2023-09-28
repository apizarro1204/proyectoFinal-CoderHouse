import express from 'express';
import * as chatControl from '../controllers/chat.controller.js'
import passport from 'passport';

const routerChat = express.Router();

routerChat.get('/', chatControl.chatHome);

routerChat.get('/:email', chatControl.chatUser)
routerChat.post('/', chatControl.newMessage)


export default routerChat;