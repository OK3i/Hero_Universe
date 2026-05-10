import type { Core } from '@strapi/strapi';

async function ensurePublicHeroPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({
      where: {
        type: 'public',
      },
    });

  if (!publicRole) {
    return;
  }

  for (const action of ['find', 'findOne']) {
    const permissionAction = `api::hero.hero.${action}`;
    const existingPermission = await strapi
      .query('plugin::users-permissions.permission')
      .findOne({
        where: {
          action: permissionAction,
          role: publicRole.id,
        },
      });

    if (!existingPermission) {
      await strapi.query('plugin::users-permissions.permission').create({
        data: {
          action: permissionAction,
          role: publicRole.id,
        },
      });
    }
  }
}

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register() {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensurePublicHeroPermissions(strapi);
  },
};
