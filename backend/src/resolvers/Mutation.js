const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { transport, makeANiceEmail } = require('../mail');
const { hasPermission } = require('../utils');

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

  async updateCurrencyOneName(parent, args, ctx, info) {
    // check if there is a currency one
    const currencyOne = await ctx.db.query.currencyOnes({
      first: 1
    });
    // If there's not - make one
    if(currencyOne.length < 1) {
      const currencyOne = await ctx.db.mutation.createCurrencyOne({
        data: {
          ...args
        }
      }, info);
      return currencyOne;
    }
    // If there is - update it
    return ctx.db.mutation.updateCurrencyOne({
      data: {
        ...args
      },
      where: {
        id: currencyOne[0].id
      }
    }, info);
    // return the currency
    return currencyOne;
  },
  async updateCurrencyTwoName(parent, args, ctx, info) {
    // check if there is a currency two
    const currencyTwo = await ctx.db.query.currencyTwoes({
      first: 1
    });
    // If there's not - make one
    if(currencyTwo.length < 1) {
      const currencyTwo = await ctx.db.mutation.createCurrencyTwo({
        data: {
          ...args
        }
      }, info);
      return currencyTwo;
    }
    // If there is - update it
    return ctx.db.mutation.updateCurrencyTwo({
      data: {
        ...args
      },
      where: {
        id: currencyTwo[0].id
      }
    }, info);
    // return the currency
    return currencyTwo;
  },
  async updateCurrencyThreeName(parent, args, ctx, info) {
    // check if there is a currency three
    const currencyThree = await ctx.db.query.currencyThrees({
      first: 1
    });
    // If there's not - make one
    if(currencyThree.length < 1) {
      const currencyThree = await ctx.db.mutation.createCurrencyThree({
        data: {
          ...args
        }
      }, info);
      return currencyThree;
    }
    // If there is - update it
    return ctx.db.mutation.updateCurrencyThree({
      data: {
        ...args
      },
      where: {
        id: currencyThree[0].id
      }
    }, info);
    // return the currency
    return currencyThree;
  },

  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    // hash their password
    const password = await bcrypt.hash(args.password, 10);
    // create death code
    const deathCodeNum = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    const deathSuffix = String.fromCharCode(Math.floor(Math.random() * (122 - 97 + 1)) + 97);
    const deathCode = args.username.toLowerCase().split('').slice(0, 4).join('') + deathCodeNum + deathSuffix;
    const alreadyDeathCode = await ctx.db.query.user({ where: { deathCode } });
    if(alreadyDeathCode) {
      deathCodeNum = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
      deathSuffix = String.fromCharCode(Math.floor(Math.random() * (122 - 97 + 1)) + 97);
      deathCode = args.username.toLowerCase().split('').slice(0, 4).join('') + deathCodeNum + deathSuffix;
    }
    // create user in the database
    const user = await ctx.db.mutation.createUser({
      data: {
        ...args,
        password,
        deathCode,
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
    const item = await ctx.db.query.user({where}, `{ id name }`);
    // check if they have the permission to do it
    const ownsUser = item.id === ctx.request.userId;
    const hasPermissions = ctx.request.user.permissions.some(permission => ['ADMIN', 'PLAYERDELETE'].includes(permission));
    if(!ownsUser && !hasPermissions) {
      throw new Error("You don't have permission to do that!");
    }
    // delete it!
    return ctx.db.mutation.deleteUser({ where }, info);
  },

  async signin(parent, {email, password}, ctx, info) {
    // check if there is a user with that email
    const user = await ctx.db.query.user({ where: { email } });
    if(!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    // check if password is correct
    const valid = await bcrypt.compare(password, user.password);
    if(!valid) {
      throw new Error('Invalid Password');
    }
    // generate jwt token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // set the cookie with the token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    // return the user
    return user;
  },

  signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token');
    return { message: 'Byeeee!' };
  },

  async requestReset(parent, args, ctx, info) {
    // check if this is a real user
    const user = await ctx.db.query.user({ where: { email: args.email }});
    if(!user) {
      throw new Error(`No such user found for email ${args.email}`);
    }
    // set reset token and expiry on the user
    const resetToken = (await promisify(randomBytes)(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour
    const res = await ctx.db.mutation.updateUser({
      where: { email: args.email },
      data: { resetToken, resetTokenExpiry}
    });
    // email them the reset token
    const mailRes = await transport.sendMail({
      from: 'support@HvZUniverse.com',
      to: user.email,
      subject: 'Your Password Reset Token',
      html: makeANiceEmail(`Your password reset link is here!<br /> <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click Here To Reset Your Password</a>`)
    });
    // return the message
    return { message: 'Thanks!' };

  },

  async resetPassword(parent, args, ctx, info) {
    // check if the passwords match
    if(args.password !== args.confirmPassword) {
      throw new Error('Your passwords don\'t match!');
    }
    // check if its a legit reset token
    // check if its expired
    const [user] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - 3600000
      },
    });
    if(!user) {
      throw new Error('This token is either invalid or expired');
    }
    // hash their new password
    const password = await bcrypt.hash(args.password, 10);
    // save the new password to the user and remove old reset token fields
    const updatedUser = await ctx.db.mutation.updateUser({
      where: { email: user.email },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null,
      }
    });
    // generate jwt
    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
    // set jwt cookie
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    // return the new user
    return updatedUser;
  },

  async updatePermissions(parent, args, ctx, info) {
    // 1. check if they're logged in
    if(!ctx.request.userId) {
      throw new Error('You must be logged in to do that!');
    }
    // 2. query current user
    const currentUser = await ctx.db.query.user({
      where: {
        id: ctx.request.userId,
      },
    }, info);
    // 3. Check if they have permissions to do this
    hasPermission(currentUser, ['ADMIN', 'PERMISSIONUPDATE']);
    // 4. update the permissions
    return ctx.db.mutation.updateUser({
      data: {
        permissions: { set: args.permissions },
      },
      where: { id: args.userId },
    }, info);
  }

};

module.exports = Mutations;
