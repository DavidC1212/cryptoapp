import passport from "passport";
import { Strategy } from "passport-github2";

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new Strategy(config.get('github'), () => {}
));



export default passport;    



