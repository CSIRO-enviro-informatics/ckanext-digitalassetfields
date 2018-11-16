# encoding: utf-8

from ckan import __version__ as ckan__version__
import ckan.plugins as p
import ckan.plugins.toolkit as tk
import json
import ckan.authz as authz
from ckan.config.routing import SubMapper
import ckan.lib.jsonp as jsonp
from ckanext.digitalassetfields import util

ckan_version = util.version.parse(ckan__version__)

@tk.auth_allow_anonymous_access
def member_create(context, data_dict):
    try:
        group = tk.get_action('group_show')(data_dict=data_dict)
    except toolkit.ObjectNotFound:
        return {'success': False,
                'msg': 'Couldn''t find group'}

    if group['name'] == u'local':
        return {'success': True}
    user = context['user']

    # User must be able to update the group to add a member to it
    permission = 'update'
    # However if the user is member of group then they can add/remove datasets
    if not group['is_organization'] and data_dict.get('object_type') == 'package':
        permission = 'manage_group'

    authorized = authz.has_user_permission_for_group_or_org(group['id'],
                                                            user,
                                                            permission)
    if not authorized:
        return {'success': False,
                'msg': 'User %s not authorized to edit group %s' % (str(user), group['id'])}
    else:
        return {'success': True}

class DigitalassetfieldsPlugin(p.SingletonPlugin, tk.DefaultDatasetForm):
    p.implements(p.IDatasetForm)
    p.implements(p.IConfigurer)
    p.implements(p.IAuthFunctions)

    def _modify_package_schema(self, schema):
        schema.update({
            'custom_text': [tk.get_validator('ignore_missing'),
                            tk.get_converter('convert_to_extras')],
            'asset_type': [tk.get_validator('ignore_missing'),
                           tk.get_converter('convert_to_extras')],
            'related_projects': [tk.get_validator('ignore_missing'),
                                 tk.get_converter('convert_to_extras')],
            'related_publications': [tk.get_validator('ignore_missing'),
                                     tk.get_converter('convert_to_extras')],
            'asset_owner': [tk.get_validator('ignore_missing'),
                            tk.get_converter('convert_to_extras')],
            'asset_status': [tk.get_validator('ignore_missing'),
                             tk.get_converter('convert_to_extras')],
            'expl_notes': [tk.get_validator('ignore_missing'),
                           tk.get_converter('convert_to_extras')],
            'spatial': [tk.get_validator('ignore_missing'),
                           tk.get_converter('convert_to_extras')],
            'test': [tk.get_validator('ignore_missing'),
                           tk.get_converter('convert_to_extras')],
            'description': [tk.get_validator('ignore_missing'),
                            tk.get_converter('convert_to_extras')],
            'other_affiliates': [tk.get_validator('ignore_missing'),
                                 tk.get_converter('convert_to_extras')]
        })
        return schema

    def create_package_schema(self):
        schema = super(DigitalassetfieldsPlugin, self).create_package_schema()
        schema = self._modify_package_schema(schema)
        return schema

    def update_package_schema(self):
        schema = super(DigitalassetfieldsPlugin, self).update_package_schema()
        schema = self._modify_package_schema(schema)
        return schema

    def show_package_schema(self):
        schema = super(DigitalassetfieldsPlugin, self).show_package_schema()
        schema.update({
            'custom_text': [tk.get_converter('convert_from_extras'),
                            tk.get_validator('ignore_missing')],
            'asset_type': [tk.get_converter('convert_from_extras'),
                           tk.get_validator('ignore_missing')],
            'related_projects': [tk.get_converter('convert_from_extras'),
                                 tk.get_validator('ignore_missing')],
            'related_publications': [tk.get_converter('convert_from_extras'),
                                     tk.get_validator('ignore_missing')],
            'asset_owner': [tk.get_converter('convert_from_extras'),
                            tk.get_validator('ignore_missing')],
            'asset_status': [tk.get_converter('convert_from_extras'),
                             tk.get_validator('ignore_missing')],
            'expl_notes': [tk.get_converter('convert_from_extras'),
                           tk.get_validator('ignore_missing')],
            'test': [tk.get_converter('convert_from_extras'),
                           tk.get_validator('ignore_missing')],
            'spatial': [tk.get_converter('convert_from_extras'),
                            tk.get_validator('ignore_missing')],
            'description': [tk.get_converter('convert_from_extras'),
                            tk.get_validator('ignore_missing')],
            'other_affiliates': [tk.get_converter('convert_from_extras'),
                                 tk.get_validator('ignore_missing')]
        })
        return schema

    def is_fallback(self):
        # Return True to register this plugin as the default handler for
        # package types not handled by any other IDatasetForm plugin.
        return True

    def package_types(self):
        # This plugin doesn't handle any special package types, it just
        # registers itself as the default (above).
        return []

    def update_config(self, config):
        # Add this plugin's templates dir to CKAN's extra_template_paths, so
        # that CKAN will use this plugin's custom templates.

        # first defined templates are higher priority
        if ckan_version < util.version.parse("2.8.0"):
            # override some parts with bootstrap2 templates if needed
            tk.add_template_directory(config, 'bs2-templates')
        # fallback to Bootstrap3 templates.
        tk.add_template_directory(config, 'templates')
        tk.add_public_directory(config, 'public')
        tk.add_resource('fanstatic', 'digitalassetfields')
        tk.add_resource('resources', 'resources')

    def get_auth_functions(self):
        return {'member_create': member_create}
