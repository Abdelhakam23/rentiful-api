import type { Request, Response } from "express";
import { prisma } from "../../../config/db.js";

const getTenant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tenant = await prisma.tenant.findUnique({
      where: {
        cognitoId: id as string,
      },
      include: {
        favorites: true,
      },
    });

    if (!tenant){
        return res.status(404).json({ message: "Tenant not found" });
    }

    return res.status(200).json(tenant);
  } catch (error:any) {
    return res.status(500).json({error:`Error retrieving tenant:${error.message}`})
  }
};

const createTenant = async (req:Request,res:Response)=>{
    try {
        const {cognitoId,name,email,phoneNumber} = req.body;
        const tenant = await prisma.tenant.create({
            data:{
                cognitoId,
                name,
                email,
                phoneNumber
            }
        })
        return res.status(201).json(tenant);
    } catch (error:any) {
        return res.status(500).json({error:`Error creating tenant:${error.message}`})
    }
}


export { getTenant, createTenant}