import { Test, TestingModule } from '@nestjs/testing';
import { AltSchedulesService } from './alt-schedules.service';

describe('AltSchedulesService', () => {
  let service: AltSchedulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AltSchedulesService],
    }).compile();

    service = module.get<AltSchedulesService>(AltSchedulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
