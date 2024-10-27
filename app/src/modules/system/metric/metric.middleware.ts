import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { NextFunction, Request, Response } from 'express';
import { Histogram } from 'prom-client';

import { HTTP_REQUEST_DURATION_HISTOGRAM } from './constants';

@Injectable()
export class MetricMiddleware implements NestMiddleware {
    constructor(
        @InjectMetric(HTTP_REQUEST_DURATION_HISTOGRAM.name)
        private readonly httpRequestDurationHistogram: Histogram,
    ) { }

    private patterns = [
        { pattern: /(\/)\d+(\/)/, replacer: '$1*$2' },
        { pattern: /(\/)\d+$/, replacer: '$1*' },
    ];

    use(req: Request, res: Response, next: NextFunction): void {
        let path = req.baseUrl;

        for (const i in this.patterns) {
            const { pattern, replacer } = this.patterns[i];
            if (path.match(pattern)) {
                path = path.replace(pattern, replacer);
                break;
            }
        }

        const endResponseTimerRequestDuration = this.httpRequestDurationHistogram.startTimer();

        res.on('finish', (err?: Error) => {
            endResponseTimerRequestDuration({
                // eslint-disable-next-line camelcase
                method_and_path: req.method + '_' + path,
                status: res.statusCode,
            });

            if (err) {
                return next(err);
            }
        });

        next();
    }
}
