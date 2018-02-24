# encoding: utf-8

import ckan.plugins as p
import ckan.plugins.toolkit as tk
import json
from ckan.config.routing import SubMapper
import ckan.lib.jsonp as jsonp


@tk.side_effect_free
@jsonp.jsonpify
def user_autocomplete_json(some_context, data_dict):
    '''Return a list of user names that contain a string.

     :param q: the string to search for
     :type q: string
     :param limit: the maximum number of user names to return (optional,
         default: 20)
     :type limit: int

     :rtype: a list of user dictionaries each with keys ``'name'``,
         ``'fullname'``, and ``'id'``

     '''

    action = tk.get_action('user_autocomplete')
    results = action(some_context, data_dict)
    user_list = []
    for user in results:
        result_dict = {}
        user_string = json.dumps(user)
        result_dict['fullname'] = user['fullname']
        result_dict['name'] = user['name']
        result_dict['id'] = user_string
        user_list.append(result_dict)
    return user_list

class DigitalassetfieldsPlugin(p.SingletonPlugin, tk.DefaultDatasetForm):
    p.implements(p.IDatasetForm)
    p.implements(p.IConfigurer)
    p.implements(p.IRoutes, inherit=True)
    p.implements(p.IActions)

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
            'asset_owner': [tk.get_validator('ignore_missing'), tk.get_validator('scheming_valid_json_object'),
                            tk.get_converter('convert_to_extras')],
            'asset_status': [tk.get_validator('ignore_missing'),
                             tk.get_converter('convert_to_extras')],
            'expl_notes': [tk.get_validator('ignore_missing'),
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
                            tk.get_validator('ignore_missing'), tk.get_validator('scheming_load_json')],
            'asset_status': [tk.get_converter('convert_from_extras'),
                             tk.get_validator('ignore_missing')],
            'expl_notes': [tk.get_converter('convert_from_extras'),
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
        tk.add_template_directory(config, 'templates')

    def before_map(self, m):
        with SubMapper(m, path_prefix='/api{ver:/1|/2|}',
                       ver='/1') as mapper:
            mapper.connect('/util/user/autocomplete/json', action='user_autocomplete_json', controller='ckanext.digitalassetfields.plugin:UserAutoCompleteJSONController')

        return m

    def get_actions(self):
        actions = {
            'user_autocomplete_json': user_autocomplete_json,
        }
        return actions

class UserAutoCompleteJSONController(p.toolkit.BaseController):

    def user_autocomplete_json(self):
        q = tk.request.params.get('q', '')
        limit = tk.request.params.get('limit', 20)
        user_list = []
        if q:

            data_dict = {'q': q, 'limit': limit}

            action = p.toolkit.get_action('user_autocomplete_json')
            user_list = action({}, data_dict)
        return user_list
