import passport from 'passport';

import { PassportStrategy } from '../interfaces';
import localStrategy from "./passportStrategies/localStrategy";
import passportGitHubStrategy from "./passportStrategies/githubStrategy";

export default class PassportConfig {
    constructor() {
        this.#addStrategies([localStrategy, passportGitHubStrategy])
    }
    /*
     FIX ME 😭 - done I THINK
     The problem with this class is... if the caller forgets to call
     the addStrategies method...our program won't work. 

     Solution: You should refactor this class to take a constructor
     which receives strategies: PassportStrategy[]. Internally...call 
     the addStrategies method within the constructor and make addStragies
     private from the outside world. This way, we can GUARANTEE that our
     passport strategies are added when this class is created. ⭐️
    */
    #addStrategies(strategies: PassportStrategy[]): void {
        strategies.forEach((passportStrategy: PassportStrategy) => {
            passport.use(passportStrategy.name, passportStrategy.strategy);
        });
    }
}
