const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');

const Query = {
  user: forwardTo('db'),
  users: forwardTo('db'),
  usersConnection: forwardTo('db'),

  updates: forwardTo('db'),
  lootBoxes: forwardTo('db'),
  currencyOnes: forwardTo('db'),
  currencyTwoes: forwardTo('db'),
  currencyThrees: forwardTo('db'),


  me(parent, args, ctx, info) {
    // check if there is a current userId
    if(!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user({
      where: { id: ctx.request.userId }
    }, info);
  },

  async adminUsers(parent, args, ctx, info) {
    // 1. check if logged in
    if(!ctx.request.userId) {
      throw new Error('You must be logged in to do that');
    }
    // 2. check if the user has the permission to query all the users
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);
    // 3. if they do then query the users
    return ctx.db.query.users({}, info);
  }
};

module.exports = Query;
