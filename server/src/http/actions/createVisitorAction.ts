import { Request, Response } from 'express';
import CreateVisitorCommand from 'application/commands/createVisitorCommand';
import createVisitorHandler from 'application/handlers/createVisitorHandler';

class createVisitorAction {
    public async run(req: Request, res: Response) {
        const { ip, nickname } = req.body;

        try {
            if (!ip || !nickname) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const command = new CreateVisitorCommand(
                ip,
                nickname
            );

            await createVisitorHandler.execute(command);

            return res.status(201).json(
                { message: 'Visitor create sucessfully' }
            );
        } catch (error) {
            const { message } = error as Error;
            res.status(400).json(
                { message: message }
            );
        }
    }
}

export default new createVisitorAction();
