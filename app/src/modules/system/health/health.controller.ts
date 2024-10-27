import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckResult, HealthCheckService } from '@nestjs/terminus';

@ApiTags('Internal')
@Controller('internal')
export class HealthController {
    constructor(private health: HealthCheckService) { }

    @Get('health')
    @HealthCheck()
    healthCheck(): Promise<HealthCheckResult> {
        return this.health.check([]);
    }

    @Get('ping')
    pingCheck(): { ping: 'ok' } {
        return { ping: 'ok' };
    }
}
