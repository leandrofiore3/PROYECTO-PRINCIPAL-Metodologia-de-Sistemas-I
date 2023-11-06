import Claim from "../../domain/entities/claim.entity";
import VisitorRepository from "../../infrastructure/repositories/visitor.repository";
import CategoryRepository from "../../infrastructure/repositories/category.repository";
import claimRepository from "../../infrastructure/repositories/claim-repository";

class ClaimSeeder {

    public constructor() { }

    public static async generate() {
        const visitors = await VisitorRepository.findAll();
        const categories = await CategoryRepository.findAll();
        const claims = [];
        for (const visitor of visitors) {
            for (const category of categories) {
                claims.push(Claim.create(visitor, 'Seeder claim title', 'Seeder claim description', category, "San Francisco", new Date(), null));
            }
        }

        for (const claim of claims) {
            await claimRepository.save(claim);
        }
    }
}

export default ClaimSeeder;