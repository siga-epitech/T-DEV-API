import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { role: true }, // Inclure le rôle utilisateur
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { id: user.id, email: user.email, role: user.role.name };
  }

  async generateTokens(userId: number, email: string, role: string) {
    const payload = { sub: userId, email, role };

    // Access token avec expiration courte
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });

    // Refresh token avec expiration longue
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    // Hachage et stockage du refresh token
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    // Mise à jour de l'utilisateur avec les tokens
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        refreshToken: hashedRefreshToken,
        refreshTokenExpires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 jours
      },
    });

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    return this.generateTokens(user.id, user.email, user.role);
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      // Vérifier le refresh token
      const payload = this.jwtService.verify(refreshToken);

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        include: { role: true }, // Inclure le rôle utilisateur
      });

      if (!user || !user.refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Comparer le token fourni avec celui stocké
      const isTokenValid = await bcrypt.compare(refreshToken, user.refreshToken);
      if (!isTokenValid || user.refreshTokenExpires < new Date()) {
        throw new UnauthorizedException('Invalid or expired refresh token');
      }

      // Générer de nouveaux tokens
      return this.generateTokens(user.id, user.email, user.role.name);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
