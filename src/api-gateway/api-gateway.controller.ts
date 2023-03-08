import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express'

@Controller()
export class ApiGatewayController {

  
  @Get('healthz')
  healthCheck(@Res() res: Response) {
    res.status(HttpStatus.OK).send('OK')
  }
}
