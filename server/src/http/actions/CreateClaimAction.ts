import { Request, Response } from "express";
import CreateClaimCommand from "application/commands/createClaim.command";
import CreateClaimHandler from "application/handlers/createClaim.handler";

class CreateClaimAction {
    public async run(req: Request, res: Response) {
        const { owner, title, description, category, location, createAt, cloneOf } = req.body;
        try {
            if (!owner || !title || !description || !category || !location || !createAt) {
                res.status(400).json({ message: "All fields are required" });
                return
            }

            const command = new CreateClaimCommand(
                owner,
                title,
                description,
                category,
                location, createAt,
                cloneOf
            );
            await CreateClaimHandler.execute(command);

            res.status(201).json(
                { message: "Claim created sucessfully" }
            );
        } catch (error) {
            const { message } = error as Error;
            res.status(400).json(
                { message: message }
            );
        }

    }
}

export default new CreateClaimAction();