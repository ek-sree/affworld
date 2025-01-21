import tempUserModel from "../../models/tempUserModel.js";
import { IOtp, ITempUserData, IUser } from "../../interface/IUser.js";
import UserModel from "../../models/userModel.js";
import { hashedPassword } from "../../utils/hashedPassword.js";

export default class AuthRepository{
    findByEmail= async(email:string): Promise<IUser | null>=>{
        try {
            const user = await UserModel.findOne({email}).lean()
            if(!user){
                return null
            }
            return user as IUser
        } catch (error) {
            console.log("Error in finding email", error);
            return null
        }
    }

    saveOtp=async( email:string, otp:string ,name?:string, password?:string, ): Promise<string | null>=>{
        try {
            const existUser = await tempUserModel.findOne({email});
            if(existUser){
                existUser.otp = otp
                existUser.otpCreatedAt= new Date();
                const savedExistData = await existUser.save()
                if(!savedExistData){
                    return null
                }
                return email
            }
            
            const newTempUserData: ITempUserData = {
                name,
                email,
                otp,
                otpCreatedAt:new Date()
            }
            if(password){
                const hashPassword = await hashedPassword(password)
                newTempUserData.password=hashPassword
            }
            const newTempUser = new tempUserModel(newTempUserData)
            const savedData = await newTempUser.save()
            if(!savedData){
                return null
            }
            return email
        } catch (error) {
            console.log("Error in saving otp", error);
            return null
        }
    }


    findOtp=async(email:string):Promise<IOtp | null>=>{
        try {
            const data = tempUserModel.findOne({email})
            if(!data){
                return null
            }
            return data as unknown as IOtp
        } catch (error) {
            console.log("Error in saving otp", error);
            return null
        }
    }

    createUser=async(data:IUser): Promise<IUser | null>=>{
        try {
            const newUser = new UserModel({
                name:data.name,
                email:data.email,
                password:data.googleId ? null : data.password,
                googleId: data.googleId
            })
            const savedUser = await newUser.save()
            if(!savedUser){
                return null;
            }
            return savedUser
        } catch (error) {
            console.log("Error in saving otp", error);
            return null
        }
    }

    // createUserGoogle=async(name:string, email:string,password:string):Promise<IUser | null>=>{
    //     try {
    //         const userExist = await UserModel.findOne({email})
    //         if(userExist){
    //             return userExist
    //         }
    //         const newUser = new UserModel({
    //             name,
    //             email,
    //             password
    //         })
    //         const savedUser = await newUser.save()
    //         if(!savedUser){
    //             return null
    //         }
    //         return savedUser
    //     } catch (error) {
    //         console.log("Error in saving via google", error);
    //         return null
    //     }
    // }

    public async deleteTempDataInBackground(email: string): Promise<void> {
        (async () => {
            try {
                await tempUserModel.deleteOne({ email });
                console.log(`Temporary data for ${email} deleted successfully.`);
            } catch (error) {
                console.log("Error while deleting temp data in background", error);
            }
        })();
    }
}