import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User as UserToken } from 'src/decorators/user.decorator';
import { InfoToken } from 'src/shared/dtos/info-token.dto';
import { FindProductParamsDto } from './dto/find-product-params.dto';
import { FindProductQueryDto } from './dto/find-product-query.dto';

@Controller('products/:organizationName')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Param() params: FindProductParamsDto, @Query() query: FindProductQueryDto, @UserToken() userInfo: InfoToken,) {
    return this.productsService.find(params, query, userInfo);
  }
}
