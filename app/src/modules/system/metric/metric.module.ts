import { createPrometheusConfig } from '@configs/prometheus.config';
import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

import { HTTP_REQUEST_DURATION_HISTOGRAM } from './constants';
import { MetricMiddleware } from './metric.middleware';

const metrics = [
    HTTP_REQUEST_DURATION_HISTOGRAM.make(),
];

@Global()
@Module({
    imports: [
        PrometheusModule.register(createPrometheusConfig()),
    ],
    providers: [...metrics],
    exports: [...metrics],
})
export class MetricModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(MetricMiddleware)
            .exclude(...[
                '/internal/ping',
                '/internal/health',
                '/metrics',
                '/favicon.ico',
                '/docs',
                '/',
            ])
            .forRoutes('*');
    }
}
