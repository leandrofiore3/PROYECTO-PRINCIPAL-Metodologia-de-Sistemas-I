import { Request, Response } from "express";
import CreateClaimCommand from "../../application/commands/CreateClaimCommand";
import CreateClaimHander from "../../application/handlers/CreateClainHander";

class CreateClaimAction {
    public async run(req: Request, res: Response) {
        const{id, owner, title, description, category, location, createAt, cloneOf} = req.body;

        try{
            if (!id || !owner || !title || !description || !category || !location || !createAt) {
                return res.status(400).json({ message: "All fields are required" });
            }
            

           
            const command = new CreateClaimCommand(
                id,
                owner,
                title,
                description,
                category,
                location, createAt, 
                cloneOf

            );
            await CreateClaimHander.execute(command);

            return res.status(201).json(
                {massage: "Claim created sucessfully"}
            );
        }catch(error) {
            const {message} = error as Error;
            res.status(400).json(
                { message: message} 
            );
        }
            
    }
}
export default new CreateClaimAction();