import { Request, Response } from "express";
import ReportClaimAction from "../../../../src/http/actions/reportClaimAction";
import ReportClaimHandler from '../../../../src/application/handlers/ReportClaimHandler';
import ClaimRepository from '../../../../src/infrastructure/repositories/claim-repository';
import VisitorRepository from '../../../../src/infrastructure/repositories/visitor.repository';
import Visitor from "../../../../src/domain/entities/visitor.entity";
import Claim from "../../../../src/domain/entities/claim.entity";
import Category from "../../../../src/domain/entities/category.entity";

describe('ReportClaimAction', () => {
    let mockResponse: Partial<Response>;
    let mockRequest: Partial<Request>;

    let mockClaimRepository: typeof ClaimRepository;
    let mockVisitorRepository: typeof VisitorRepository;
    let mockReportClaimHandler: ReportClaimHandler;

    beforeEach(() => {
        mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };

        mockRequest = {
            params: {
                claimId: 'claim123',
                id: 'user456',
            },
        };

        mockClaimRepository = ClaimRepository;
        mockVisitorRepository = VisitorRepository;

        mockReportClaimHandler = new ReportClaimHandler(mockClaimRepository, mockVisitorRepository);
    });

    test('should report a claim successfully', async () => {
        const mockVisitor = Visitor.create("197.0.0.1", "pepe", "123456");
        const mockCategory = Category.create("category1", "green")
        const mockClaim = Claim.create(mockVisitor, "title", "description", mockCategory, "SanFco", new Date(), null);

        mockClaimRepository.findOneById = jest.fn().mockResolvedValue(mockClaim);
        mockVisitorRepository.findOneById = jest.fn().mockResolvedValue(mockVisitor);

        const handleMock = jest.fn();
        mockReportClaimHandler.handle = handleMock;

        await ReportClaimAction.run(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Claim reported' });
    });
});
