import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Public } from '../common/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Authenticate user and return tokens' })
  @ApiResponse({ status: 200, description: 'User authenticated' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(
    @Body() credentials: LoginDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    return this.authService.login(credentials.email, credentials.password);
  }

  @Public()
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  @ApiResponse({ status: 200, description: 'Tokens refreshed' })
  @ApiResponse({ status: 401, description: 'Invalid or expired refresh token' })
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshAccessToken(refreshToken);
  }
}
