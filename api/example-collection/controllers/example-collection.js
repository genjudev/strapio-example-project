const { sanitizeEntity } = require('strapi-utils');


module.exports = {
    async create(ctx) {
        let entity;
        if (ctx.is("multipart")) {
          const { data, files } = parseMultipartData(ctx);
          entity = await strapi.services['example-collection'].create(data, { files });
        } else {
          entity = await strapi.services['example-collection'].create(ctx.request.body);
        }
    
        strapi.StrapIO.emit(this,'create', entity);
    
        return sanitizeEntity(entity, { model: strapi.models['example-collection'] });
      },
};
