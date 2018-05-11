"""Setuptools."""
from setuptools import setup, find_packages

version = '0.1.3'

setup(
    name='pycrawler',
    version=version,
    description='A simple python crawler',
    author='Vinit Kumar',
    author_email='vinit.kumar@changer.nl',
    url='https://github.com/vinitkumar/pycrawler',
    packages=find_packages(),
    zip_safe=False,
    include_package_data=True,
    install_requires=[
        'BeautifulSoup',
    ],
)
