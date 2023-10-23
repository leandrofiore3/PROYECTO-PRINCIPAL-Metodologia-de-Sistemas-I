import { Request, Response } from 'express';
import CreateVisitorCommand from '../../application/commands/createVisitorCommand';
import CreateVisitorHandler from '../../application/handlers/createVisitorHandler';

class createVisitorAction {
    public async run(req: Request, res: Response) {
        const { ip, nickname, pin } = req.body;

        try {
            if (!ip || !nickname) {
                res.status(400).json({ message: "All fields are required" });
                return
            }

            const command = new CreateVisitorCommand(
                ip,
                nickname,
                pin
            );

            await CreateVisitorHandler.execute(command);

            res.status(201).json(
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
