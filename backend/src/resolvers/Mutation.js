const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { transport, makeANiceEmail } = require('../mail');
const { hasPermission } = require('../utils');

const Mutations = {
  async createUpdate(parent, args, ctx, info) {
    // 1. check if they're logged in
    if(!ctx.request.userId) {
      throw new Error('You must be logged in to do that!');
    }
    const update = await ctx.db.mutation.createUpdate({
      data: {
        ...args
      }
    }, info);
    return update;
  },
  async deleteUpdate(parent, args, ctx, info) {
    const where = { id: args.id };
    // find the loot box
    const update = await ctx.db.query.update({where}, `{ id title }`);
    // check if they have the permission to do it
    const hasPermissions = ctx.request.user.permissions.some(permission => ['ADMIN'].includes(permission));
    if(!hasPermissions) {
      throw new Error("You don't have permission to do that!");
    }
    // delete it!
    return ctx.db.mutation.deleteUpdate({ where }, info);
  },

  async createPage(parent, args, ctx, info) {
    // 1. check if they're logged in
    // if(!ctx.request.userId) {
    //   throw new Error('You must be logged in to do that!');
    // }
    const page = await ctx.db.mutation.createPage({
      data: {
        ...args
      }
    }, info);
    return page;
  },

  updatePage(parent, args, ctx, info) {
    // first take copy of the updates
    const updates = {...args};
    // remove id from updates
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updatePage({
      data: updates,
      where: {
        id: args.id
      }
    }, info);
  },

  async createLootBox(parent, args, ctx, info) {
    // 1. check if they're logged in
    if(!ctx.request.userId) {
      throw new Error('You must be logged in to do that!');
    }
    const hasPermission = ctx.request.user.permissions.some(permission => ['ADMIN'].includes(permission));
    if(!hasPermission) {
      throw new Error('You aren\'t allowed to do that!');
    }
    const lootbox = await ctx.db.mutation.createLootBox({
      data: {
        ...args,
        claimed: false
      }
    }, info);
    return lootbox;
  },
  async destroyLootBox(parent, args, ctx, info) {
    const where = { id: args.id };
    // find the loot box
    const box = await ctx.db.query.lootBox({where}, `{ id title }`);
    // check if they have the permission to do it
    const hasPermissions = ctx.request.user.permissions.some(permission => ['ADMIN'].includes(permission));
    if(!hasPermissions) {
      throw new Error("You don't have permission to do that!");
    }
    // delete it!
    return ctx.db.mutation.deleteLootBox({ where }, info);
  },


  // =====
  // Open a LootBox
  // =====
  async openLootBox(parent, args, ctx, info) {
    // 1. check if they're logged in
    if(!ctx.request.userId) {
      throw new Error('You must be logged in to do that!');
    }
    // 2. query current user
    const where = { id: ctx.request.userId };
    const currentUser = await ctx.db.query.user({where}, `{ id, username, permissions, name, classTitle, image}`);

    // 4. Find and make sure the player is killable
    const lootBox = await ctx.db.query.lootBox({
      where: {
        unlockCode: args.unlockCode,
      },
    }, `{ id, title, description, effect, newTitle, newLife, claimed}`);
    if(!lootBox) throw new Error('No lootbox with that code!');
    if(lootBox.claimed) throw new Error('Yikes, an empty loot box. Looks someone got here before you!');

    var effect = lootBox.effect;

    function claimBox() {
      const claimedBox = ctx.db.mutation.updateLootBox({
        data: {
          claimed: true,
        },
        where: { id: lootBox.id },
      }, info);
      return lootBox;
    }

    async function giveTitle() {
      const setTitle = await ctx.db.mutation.updateUser({
        data: {
          classTitle: lootBox.newTitle,
        },
        where: { id: currentUser.id },
      }, info);

      const titleAnnouncement = `<strong>${currentUser.name}</strong> opened a loot box and got the ${lootBox.newTitle} class!`;
      const titleUpdate = await ctx.db.mutation.createUpdate({
        data: {
          image: currentUser.image,
          title: titleAnnouncement
        }
      }, info);

    }

    async function killPlayer(giveTitle) {
      const phrases = ["Welcome to the zombie team!","Nothing like that new zombie smell.","Time for brain eating class.","Whoops, I hope you like brains."];
      let randIndex = Math.floor(Math.random() * phrases.length);
      let randPhrase = phrases[randIndex];

      let permissionsArray = currentUser.permissions;
      let permissionIndex = permissionsArray.indexOf('HUMAN');
      permissionsArray.splice(permissionIndex, 1);
      permissionsArray.push('ZOMBIE');
      const newZombie = await ctx.db.mutation.updateUser({
        data: {
          filterStatus: "ZOMBIE",
          permissions: { set: permissionsArray },
          classTitle: '',
        },
        where: { id: currentUser.id },
      }, info);

      const announcement = `<strong>${currentUser.name}</strong> opened a Loot Box and got killed! ${randPhrase}`;
      const buildUpdate = await ctx.db.mutation.createUpdate({
        data: {
          image: currentUser.image,
          title: announcement
        }
      }, info);

      if(giveTitle) {
        const setTitle = await ctx.db.mutation.updateUser({
          data: {
            classTitle: lootBox.newTitle,
          },
          where: { id: currentUser.id },
        }, info);

        const titleAnnouncement = `<strong>${currentUser.name}</strong> opened a loot box and got the ${lootBox.newTitle} class!`;
        const titleUpdate = await ctx.db.mutation.createUpdate({
          data: {
            image: currentUser.image,
            title: titleAnnouncement
          }
        }, info);
      }
    }

    async function resurrectPlayer(giveTitle) {
      const phrases = ["Oh, and smells kind of bad...","Hopefully they lose their taste for brains.","And they've still got most of their skin!","Somebody get this person a twinkie!"];
      let randIndex = Math.floor(Math.random() * phrases.length);
      let randPhrase = phrases[randIndex];

      let permissionsArray = currentUser.permissions;
      let zombieIndex = permissionsArray.indexOf('ZOMBIE');
      permissionsArray.splice(zombieIndex, 1);
      permissionsArray.push('HUMAN');
      const newHuman = await ctx.db.mutation.updateUser({
        data: {
          filterStatus: "HUMAN",
          permissions: { set: permissionsArray },
          classTitle: '',
        },
        where: { id: currentUser.id },
      }, info);

      const resurrectionAnnouncement = `<strong>${currentUser.name}</strong> opened a Loot Box and got resurrected! ${randPhrase}`;
      const buildUpdate = await ctx.db.mutation.createUpdate({
        data: {
          image: currentUser.image,
          title: resurrectionAnnouncement
        }
      }, info);
      if(giveTitle) {
        const setTitle = await ctx.db.mutation.updateUser({
          data: {
            classTitle: lootBox.newTitle,
          },
          where: { id: currentUser.id },
        }, info);

        const titleAnnouncement = `<strong>${currentUser.name}</strong> opened a loot box and got the ${lootBox.newTitle} class!`;
        const titleUpdate = await ctx.db.mutation.createUpdate({
          data: {
            image: currentUser.image,
            title: titleAnnouncement
          }
        }, info);
      }
    }

    // Resurrection
    if(effect == "resurrect") {
      if(currentUser.permissions.some(permission => ['HUMAN'].includes(permission))) {
        claimBox();
      }
      resurrectPlayer();
      claimBox();
    }

    // Murder
    if(effect == "kill") {
      if(currentUser.permissions.some(permission => ['ZOMBIE'].includes(permission))) {
        lootBox.claimed = true;
        return lootBox;
      }
      killPlayer();
      claimBox();
    }

    // Reverse
    if(effect == "reverse") {
      if(currentUser.permissions.some(permission => ['ZOMBIE'].includes(permission))) {
        resurrectPlayer();
        claimBox();
      } else {
        killPlayer();
        claimBox();
      }
    }

    // Give Title
    if(effect == "givetitle") {
      // human title
      if(lootBox.newLife == "human") {
        if(currentUser.permissions.some(permission => ['HUMAN'].includes(permission))) {
          giveTitle();
          claimBox();
        } else {
          resurrectPlayer('withTitle');
          claimBox();
        }
      } else {
        // Zombie Title
        if(currentUser.permissions.some(permission => ['ZOMBIE'].includes(permission))) {
          giveTitle();
          claimBox();
        } else {
          killPlayer('withTitle');
          claimBox();
        }
      }

    }

    return lootBox;
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

    // handle password their password
    if(args.password !== args.pwCheck) throw new Error("Your passwords don't match!");
    delete args.pwCheck;
    const password = await bcrypt.hash(args.password, 10);

    // handle death code
    const deathCodeNum = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    const deathSuffix = String.fromCharCode(Math.floor(Math.random() * (122 - 97 + 1)) + 97);
    const deathCode = args.username.toLowerCase().split('').slice(0, 4).join('') + deathCodeNum + deathSuffix;
    const alreadyDeathCode = await ctx.db.query.user({ where: { deathCode } });
    if(alreadyDeathCode) {
      deathCodeNum = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
      deathSuffix = String.fromCharCode(Math.floor(Math.random() * (122 - 97 + 1)) + 97);
      deathCode = args.username.toLowerCase().split('').slice(0, 4).join('') + deathCodeNum + deathSuffix;
    }

    //handle name
    const name = args.name;
    if(!name.match("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$")) throw new Error("Letters and numbers in your name only please!");

    // handle username
    const username = args.username;
    if(!username.match("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$")) throw new Error("Letters and numbers in your username only please!");
    if(username.length > 18) throw new Error("Try to keep your username under 18 characters.");
    const alreadyUsername = await ctx.db.query.user({ where: { username } });
    if(alreadyUsername) throw new Error("That username is already taken!");

    // handle email
    args.email = args.email.toLowerCase();
    const email = args.email;
    const alreadyemail = await ctx.db.query.user({ where: { email } });
    if(alreadyemail) throw new Error("Looks like that email is already being used.");

    // create user in the database
    const user = await ctx.db.mutation.createUser({
      data: {
        ...args,
        password,
        deathCode,
        filterStatus: 'HUMAN',
        admin: false,
        killCount: 0,
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

    // 7. Let everyone know!
    const signupAnnouncement = `<strong>${args.name}</strong> joined the game!`;
    const buildUpdate = await ctx.db.mutation.createUpdate({
      data: {
        title: signupAnnouncement
      }
    }, info);
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
    email = email.toLowerCase();
    const user = await ctx.db.query.user({ where: { email } });
    if(!user) {
      throw new Error(`We couldn't find the email ${email}!`);
    }
    // check if password is correct
    const valid = await bcrypt.compare(password, user.password);
    if(!valid) {
      throw new Error("Yikes, that password's not quite right.");
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
    let filterStatus = '';
    let admin = false;
    if(args.permissions.some(permission => ['HUMAN'].includes(permission))) {
      filterStatus = 'HUMAN';
    } else {
      filterStatus = 'ZOMBIE';
    }
    if(args.permissions.some(permission => ['ADMIN'].includes(permission))) {
      admin = true;
    }
    // 4. update the permissions
    return ctx.db.mutation.updateUser({
      data: {
        filterStatus,
        admin,
        classTitle: '',
        permissions: { set: args.permissions },
      },
      where: { id: args.userId },
    }, info);
  },

  async deathMutation(parent, args, ctx, info) {
    // 1. check if they're logged in
    if(!ctx.request.userId) {
      throw new Error('You must be logged in to do that!');
    }
    // 2. query current user
    const where = { id: ctx.request.userId };
    const currentUser = await ctx.db.query.user({where}, `{ id, username, permissions, email, name, killCount, image}`);
    // 3. Check if they have permissions to do this
    hasPermission(currentUser, ['ADMIN', 'PERMISSIONUPDATE', 'ZOMBIE', 'OZ']);
    // 4. Find and make sure the player is killable
    const deathCandidate = await ctx.db.query.user({
      where: {
        deathCode: args.deathCode,
      },
    }, `{ id, username, permissions, email, name, image}`);
    if(!deathCandidate) {
      throw new Error('No humans with that code!');
    }
    hasPermission(deathCandidate, ['HUMAN']);
    // 5. Update the death candidate's permissions
    let humanArray = deathCandidate.permissions;
    let humanIndex = humanArray.indexOf('HUMAN');
    humanArray.splice(humanIndex, 1);
    humanArray.push('ZOMBIE');
    // 6. Now kill the human!
    const newZombie = ctx.db.mutation.updateUser({
      data: {
        filterStatus: "ZOMBIE",
        permissions: { set: humanArray },
      },
      where: { deathCode: args.deathCode },
    }, info);
    // 7. Let everyone know!
    const killerAnnouncement = `<strong>${currentUser.name}</strong> killed <strong>${deathCandidate.name}</strong>!`;
    const buildUpdate = await ctx.db.mutation.createUpdate({
      data: {
        image: currentUser.image,
        title: killerAnnouncement
      }
    }, info);
    const killedAnnouncement = `<strong>${deathCandidate.name}</strong> is now a Zombie!`;
    const buildKilledUpdate = await ctx.db.mutation.createUpdate({
      data: {
        image: deathCandidate.image,
        title: killedAnnouncement
      }
    }, info);
    //update kill count
    // 4. update the permissions
    const killCount = currentUser.killCount + 1;
    const updateKillCount = ctx.db.mutation.updateUser({
      data: {
        killCount
      },
      where: { id: ctx.request.userId },
    }, info);

    return newZombie;
  }

};

module.exports = Mutations;
