import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express'

@Controller('healthz')
export class HealthCheckController {
  @Get()
  healthCheck(@Res() res: Response) {
    res.status(HttpStatus.OK).send('OK')
  }
}
