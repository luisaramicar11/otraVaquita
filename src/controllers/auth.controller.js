import bcrypt from "bcrypt"
const Controller = () => {
        const login = async (req, res)=>{
          const {email, password}=req.body;
          const user= {email:"hola@hotmail.com", password:"123"};
           if(!user){
            console.log("usuario no exite")
            res.status(401).json({message:"Invalid authorization"})
           }

            
            }  
           
            }

            

            
            

            return{
                getAll,
                getById,
                deleteById,
                create,
                fullUpdateById
            }
        }
    


export default Controller;