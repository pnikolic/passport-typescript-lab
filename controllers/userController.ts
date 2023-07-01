import {userModel} from "../models/userModel";

const getUserByEmailIdAndPassword = (email: string, password: string) => {
  let user = userModel.findOne(email);
  if (user) { // user exists
    if (isUserValid(user, password)) {
      return user; // successful check
    }
    
  }
  
  throw new Error("User does not exist"); // else the user email does not exist.
  //return  null; // This needs to be changed, not throwing error.
};
const getUserById = (id:number) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }

  throw new Error("User does not exist");
  // return null;
};

function isUserValid(user: any, password: string) {
  return user.password === password;
}

export {
  getUserByEmailIdAndPassword,
  getUserById,
};
