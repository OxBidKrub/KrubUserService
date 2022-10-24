import { myDataSource } from "../app-data-source";
import { User } from "../entity/user.entity";


export const  getAllUsers = async () => await myDataSource.getRepository(User).find()

export const getUserbyId = async (id:string) => await myDataSource.getRepository(User).findOneBy({
    id: id,
  });

export const topup = async (id:string,amount:number) => {
  try {
    const topup = await myDataSource.transaction("SERIALIZABLE",async (transactionalEntityManager) => {
    const user = await transactionalEntityManager.getRepository(User).findOneBy({id})
    user.money += amount
    return await transactionalEntityManager.getRepository(User).save(user)
  })
  } catch (error) {
    console.log(error)
    return error
  }
  

}

export const pay = async (payerId: string,payeeId:string,amount:number) => {
  const pay = await myDataSource.transaction("SERIALIZABLE",async (transactionalEntityManager) => {
    try {
      const payer = await transactionalEntityManager.getRepository(User).findOneBy({id:payerId})
    const payee = await transactionalEntityManager.getRepository(User).findOneBy({id:payeeId})
    payer.money -= amount
    payee.money += amount
    return await transactionalEntityManager.getRepository(User).save([payer,payee])
    } catch (error) {
      console.log(error)
      return error
    }
    

  })
}