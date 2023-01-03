import { User } from "../shared/models/user";

/*
Interface for the Refresh Token (can look different, based on your backend api)
*/
export interface RefreshToken {
    id: number;
    userId: number;
    token: string;
    refreshCount: number;
    expiryDate: Date;
  }
  
  
  
  /*
  Interface for the Login Request (can look different, based on your backend api)
  */
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  /*
  Interface for the Register Request (can look different, based on your backend api)
  */
  export interface RegisterRequest {
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    password: string;
  }
  
  /*
  Interface for the Register Response (can look different, based on your backend api)
  */
  export interface RegisterResponse {
    status: number;
    message: string;
  }



  /*
   These are the only ones used right now
   */


  /*
  Used as an interface for localstorage data
  */
  export interface LoggedInUser {
    token: string;
    id: Int16Array;
    email: string;
    is_staff: boolean;
    is_superuser: boolean;
  }


  export interface UserCredentials {
    email: string;
    password: string;
  }

  /*
  Used as an interface for the data recieved when logging in
  */
  export interface LoginResponse extends User {
    token: string,
  }