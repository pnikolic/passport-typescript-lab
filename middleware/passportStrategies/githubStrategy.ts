import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Request } from 'express';
import { database, userModel } from '../../models/userModel';
import keys from '../../.env/keys'
// import keys from './keys';

const GITHUB_CB = "http://localhost:8000/auth/github/callback";

const githubStrategy: GitHubStrategy = new GitHubStrategy({
        clientID: keys.GITHUB_CLIENT_ID, // file called "keys.ts" (see import section above)
        clientSecret: keys.GITHUB_CLIENT_SECRET, // file called "keys.ts" (see import section above)
        callbackURL: GITHUB_CB, // file called "keys.ts" (see import section above)
        passReqToCallback: true,
    },
    
    /* FIX ME 😭 - DONE ?? */
    async (req: Request, accessToken: string, refreshToken: string, profile: any, done: (err?: Error | null, profile?: any) => void) => {
        try {
            let existingUser = userModel.findById(profile.id);
            console.log("User exists, user is: ", existingUser);
            done(null, existingUser);
        } catch (err) {
            console.log(err);
            database.push(profile); // add user to database
            console.log("github user added to database!");
            done(null, profile);
        }
        // Check that it's added.
        console.log(database);
    },
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
