import { Test, TestingModule } from '@nestjs/testing';
import { EndPointService } from './end-point.service';

describe('EndPointService', () => {
  let service: EndPointService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EndPointService],
    }).compile();

    service = module.get<EndPointService>(EndPointService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
