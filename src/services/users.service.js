import Repository from "../repositories/users.repository.js"
import AppError from "../lib/application.error.js" 
const Service = (dbClient) =>{

    const repository=Repository(dbClient);

    const getAll = async () => {
       return await repository.getAll(); 
    }

    const getById = async (id) => {
        return await repository.getById(id); 
     }

     const getByEmail = async (email) => {
        return await repository.getByEmail(email); 
     }

     const deleteById = async (id) => {
        return await repository.deleteById(id); 
     }

     const create = async (user) => {
        //validaciones de campos
        const name=validateName(user.name)
         //validaciones con la base de datos
        const userCount = await repository.countByName(name)
        if(userCount>0){
            throw AppError("Ya existe un usuario con ese nombre", 409)
        }
        return await repository.create(user); 
     }

     const fullUpdateById = async (user) => {

        //validaciones de campos
        const name= validateName(user.name)

        //validaciones con la base de datos
        const existingUser = await repository.getById(user.id)
        if(!existingUser){
            throw AppError("El usuario a modificar no existe", 404)
        }

        const userCount = await repository.countByNameNotId(name, user.id)
        if(userCount>0){
            throw AppError("Ya existe otro usuario con ese nombre", 409)
        }

        return await repository.fullUpdateById({
            ...user,
            name
        })
     }

     const validateName = (newName) => {
             //limpiar los datos
        const name = ( newName || "").trim();
        //validar los campos individualmente
        if (name.length === 0){
           throw AppError("El nombre es requerido", 400);
        }if (name.length > 100){
            throw AppError("El nombre debe tener menos de 100 caracteres", 400)
        }
        return name;
     }

     
    return{
        getAll,
        getById,
        getByEmail,
        deleteById,
        create,
        fullUpdateById
    }
}

export default Service;