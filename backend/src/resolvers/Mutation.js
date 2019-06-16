const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutations = {
  async createUpdate(parent, args, ctx, info) {
    // TODO: Chck if they are logged in
    const update = await ctx.db.mutation.createUpdate({
      data: {
        ...args
      }
    }, info);
    return update;
  },

  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    // hash their password
    const password = await bcrypt.hash(args.password, 10);
    // create user in the database
    const user = await ctx.db.mutation.createUser({
      data: {
        ...args,
        password,
        permissions: { set: ['HUMAN'] },
      }
    }, info);
    // create JWT token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // we set the jwt as a cookie on the response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    // return the user to the browser
    return user;
  },

  updateUser(parent, args, ctx, info) {
    // first take copy of the updates
    const updates = {...args};
    // remove id from updates
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateUser({
      data: updates,
      where: {
        id: args.id
      }
    }, info);
  },

  async deleteUser(parent, args, ctx, info) {
    const where = { id: args.id };
    // find the user
    const item = await ctx.db.query.user({where}, `{ id name}`);
    // check if they have the permission to do it
    // TO DO
    // delete it!
    return ctx.db.mutation.deleteUser({ where }, info);
  }

};

module.exports = Mutations;
