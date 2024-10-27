import { makeHistogramProvider } from '@willsoto/nestjs-prometheus';

export const HTTP_REQUEST_DURATION_HISTOGRAM = {
    name: 'http_request_duration_by_method_and_path',
    description: 'HTTP request duration',
    make: function (): ReturnType<typeof makeHistogramProvider> {
        return makeHistogramProvider({
            name: this.name,
            help: this.description,
            labelNames: ['method_and_path', 'status'],
            buckets: [1, 5, 15, 50, 100, 200, 400, 1e3, 5e3, 1e4], // ms
        });
    },
};
