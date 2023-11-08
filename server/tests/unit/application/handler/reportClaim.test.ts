import Claim from '../../../../src/domain/entities/claim.entity';
import ReportClaimCommand from '../../../../src/application/commands/ReportClaimCommand';
import ReportClaimHandler from '../../../../src/application/handlers/ReportClaimHandler';
import ClaimRepository from '../../../../src/infrastructure/repositories/claim-repository';
import VisitorRepository from '../../../../src/infrastructure/repositories/visitor.repository';
import Visitor from '../../../../src/domain/entities/visitor.entity';
import Category from '../../../../src/domain/entities/category.entity';

describe('ReportClaimHandler', () => {
    let mockReportClaimHandler: ReportClaimHandler;
    let mockClaimRepository: typeof ClaimRepository;
    let mockVisitorRepository: typeof VisitorRepository;

    beforeEach(() => {
        mockClaimRepository = ClaimRepository;
        mockVisitorRepository = VisitorRepository;
        mockReportClaimHandler = new ReportClaimHandler(mockClaimRepository, mockVisitorRepository);
    });

    test('should report a claim successfully', async () => {
        const mockCategory = Category.create(
            "categoria1",
            "verde"
        )

        const mockVisitor = Visitor.create(
            '127.0.0.1',
            'pepito perez',
            '123456',
        );

        const mockClaim = Claim.create(mockVisitor, "titulo", "description", mockCategory, "SanFco");
        await mockClaimRepository.save(mockClaim);

        await mockVisitorRepository.save(mockVisitor);

        const command = new ReportClaimCommand(mockClaim.id);
        await mockReportClaimHandler.handle(command, mockVisitor.id);

        expect(mockClaim.isReported()).toBeTruthy();
    });
});
