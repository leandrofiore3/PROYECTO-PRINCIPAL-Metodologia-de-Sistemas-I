import { Request, Response } from "express";
import visitorRepository from "../../infrastructure/repositories/visitor.repository";

class GetVisitorsAction {
    public async run(_req: Request, res: Response) {
        try {
            const categories = await visitorRepository.findAll();

            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving categories' });
        }
    }
}

export default new GetVisitorsAction();