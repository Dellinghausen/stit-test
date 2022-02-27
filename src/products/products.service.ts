import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserEnum } from 'src/users/enum/user-enum';
import organizationJson from './data/organization.json';
import productsJson from './data/products.json';

@Injectable()
export class ProductsService {
  find(params, query, userInfo) {
    const org = organizationJson.find(organization => organization.name === params.organizationName);
    if (!org) {
      throw new NotFoundException();
    }
    let userLevel = []

    userInfo.roles.forEach(role => {
      userLevel = [...new Set(userLevel.concat(JSON.parse(UserEnum[role])))];
    });

    if (!userLevel.includes(org.level)) {
      throw new UnauthorizedException();
    }

    const data = [];

    const addDataToId = (organizations, id, children) => {
      organizations.forEach(organization => {
        if (organization.name == id) {
          organization.children.push({ ...children, children: [] });
        } else {
          addDataToId(organization.children || [], id, children)
        }
      })
    }

    organizationJson.forEach(organization => {
      if (organization.parent) {
        addDataToId(data, organization.parent, organization);
      } else {
        data.push({ ...organization, children: [] })
      }
    })

    let names = []

    const recoverChildrenNames = (array) => {
      names.push(...array.map(organization => organization.name))
    }

    const responseBuild = (data, orgName) => {
      const org = data.find(organization => organization.name === orgName);
      if (org) {
        names.push(org.name)
        if (org.children) {
          recoverChildrenNames(org.children);
          org.children.forEach(organization => {
            if (organization.children) { recoverChildrenNames(organization.children); }
          });
        }
      } else {
        data.forEach(org => {
          responseBuild(org.children, orgName)
        });
      }
    }

    responseBuild(data, org.name)

    const products = productsJson.filter(product => {
      if (names.includes(product.department) && product.tags.find(tag => query.tags.includes(tag))) {
        return product
      }

    });

    const response = {
      total: products.length,
      products
    }

    return response;
  }
}
