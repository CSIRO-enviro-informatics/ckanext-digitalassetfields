# ckanext-digitalassetfields
CKAN extension to implement fields for digital asset register

## Installation

To install ckanext-digitalassetfields:

Activate your CKAN virtual environment, for example:
```
. /usr/lib/ckan/default/bin/activate
```
Install the ckanext-digitalassetfields Python package into your virtual environment:
```
pip install ckanext-digitalassetfields
```

Add digitalassetfields to the ckan.plugins setting in your CKAN config file (by default the config file is located at /etc/ckan/default/production.ini).

Restart CKAN. For example if you've deployed CKAN with Apache on Ubuntu:
```
sudo service apache2 reload
```
