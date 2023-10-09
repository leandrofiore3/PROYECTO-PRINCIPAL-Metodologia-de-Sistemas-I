import { Request, Response } from 'express';
import CategoryService from '../category.service'; // ver 
class GetCategoriesAction {
  public async run(req: Request, res: Response) {
    try {
      
      const categories = await CategoryService.getCategories();
     
      return res.status(200).json(categories);
    } catch (error) {
      
      return res.status(500).json({ error: 'Error al obtener las categorías.' });
    }
  }
}
export default new GetCategoriesAction();










