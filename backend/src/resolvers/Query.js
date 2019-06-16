const { forwardTo } = require('prisma-binding');

const Query = {
  user: forwardTo('db'),
  users: forwardTo('db'),
  usersConnection: forwardTo('db'),

  async updates(parent, args, ctx, info) {
    const updates = await ctx.db.query.updates();
    return updates;
  },
};

module.exports = Query;
