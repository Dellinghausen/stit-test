import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthRequestDTO } from './dto/request.dto';
import { AuthResponseDTO } from './dto/response.dto';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() params: AuthRequestDTO): Promise<AuthResponseDTO> {
    return this.authService.login(params);
  }
}
