import { Request, Response } from "express";
import CreateClaimCommand from "../../application/commands/createClaim.command";
import CreateClaimHandler from "../../application/handlers/createClaim.handler";

class CreateClaimAction {
    public async run(req: Request, res: Response) {
        const { owner, title, description, category, location, createdAt, cloneOf } = req.body;
        try {
            console.log(req.body);
            if (!owner || !title || !description || !category || !location || !createdAt) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const command = new CreateClaimCommand(
                owner,
                title,
                description,
                category,
                location,
                createdAt,
                cloneOf
            );
            await CreateClaimHandler.execute(command);

            return res.status(201).json(
                { message: "Claim created sucessfully" }
            );
        } catch (error) {
            const { message } = error as Error;
            return res.status(400).json(
                { message: message }
            );
        }

    }
}

export default new CreateClaimAction();