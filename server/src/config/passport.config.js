import mongoose from "mongoose";
import bCrypt from "bcrypt";
import passport from "passport";
import dotenv from "dotenv";
import { Strategy as JWTStragety } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import UserModel from "../models/userSchema.js";
import { Strategy as LocalStrategy } from "passport-local";
import { sendEmail } from "./mail.config.js";

dotenv.config();

const jwtOptions = {
  secretOrKey: process.env.JWT_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      console.log("User registred has ", username + " " + password);
      mongoose.connect(process.env.DB_MONGO);
      try {
        UserModel.create(
          {
            username,
            password: createHash(password),
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            age: req.body.age
          },
          (err, userWithId) => {
            if (err) {
              console.log(`User already exist: ${err}`);
              return done(err, null);
            }
            return done(null, userWithId);
          }
        );

        // Enviar correo
        await sendEmail(req.body.email, req.body.name);
      } catch (error) {
        console.log({ error: "Usuario ya existe" });
        return done(error, null);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
      passwordField: "password",
    },
    (req, email, password, done) => {
      mongoose.connect(process.env.DB_MONGO);
      try {
        UserModel.findOne({ email }, (err, user) => {
          if (err) {
            return done(err, null);
          }
          if (!user) {
            return done(null, false);
          }
          if (!isValidPassword(user, password)) {
            return done(null, false);
          }
          return done(null, user);
        });
      } catch (error) {
        console.log({ error: "No se pudo validar usuario" });
        return done(error, null);
      }
    }
  )
);

passport.use(
  new JWTStragety(jwtOptions, async (payload, done) => {
    try {
      await mongoose.connect(process.env.DB_MONGO);
      const user = await UserModel.find({ username: payload.username });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

passport.use(
  "jwt",
  new JWTStragety(
    {
      secretOrKey: process.env.JWT_KEY,
      jwtFromRequest: (req) => req.cookies.auth,
    },
    async (token, done) => {
      try {
        return done(null, token);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((usuario, done) => {
  done(null, usuario.email);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, done);
});

function createHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

function isValidPassword(user, password) {
  return bCrypt.compareSync(password, user.password);
}

export default passport;
