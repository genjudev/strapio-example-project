'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async create(ctx) {
        let entity;
        if (ctx.is("multipart")) {
          const { data, files } = parseMultipartData(ctx);
          entity = await strapi.services['example-collection'].create(data, { files });
        } else {
          entity = await strapi.services['example-collection'].create(ctx.request.body);
        }
    
        strapi.StrapIO.emit(this, ctx,'create', entity, 'example-collection');
    
        return sanitizeEntity(entity, { model: strapi.models['example-collection'] });
      },
};
