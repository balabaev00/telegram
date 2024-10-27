import { PrometheusOptions } from '@willsoto/nestjs-prometheus';


export const createPrometheusConfig = (): PrometheusOptions => ({
    global: true,
    defaultMetrics: {
        enabled: process.env.STAGE !== 'local',
    },
    defaultLabels: { app: 'nest-template' },
});
