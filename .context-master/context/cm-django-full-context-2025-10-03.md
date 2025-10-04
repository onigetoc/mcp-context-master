================
CODE SNIPPETS
================
TITLE: Django Overview and Installation
DESCRIPTION: Guides new users through the initial steps of understanding Django and setting up their development environment. It covers the fundamental concepts and the process of installing Django.

SOURCE: https://github.com/django/django/blob/main/docs/index.txt#_snippet_0

LANGUAGE: Python
CODE:
```
 """
Django documentation
====================

.. rubric:: Everything you need to know about Django.

.. _index-first-steps:

First steps
===========

Are you new to Django or to programming? This is the place to start!

* **From scratch:**
  :doc:`Overview </intro/overview>` | 
  :doc:`Installation </intro/install>`

* **Tutorial:**
  :doc:`Part 1: Requests and responses </intro/tutorial01>` | 
  :doc:`Part 2: Models and the admin site </intro/tutorial02>` | 
  :doc:`Part 3: Views and templates </intro/tutorial03>` | 
  :doc:`Part 4: Forms and generic views </intro/tutorial04>` | 
  :doc:`Part 5: Testing </intro/tutorial05>` | 
  :doc:`Part 6: Static files </intro/tutorial06>` | 
  :doc:`Part 7: Customizing the admin site </intro/tutorial07>` | 
  :doc:`Part 8: Adding third-party packages </intro/tutorial08>`

* **Advanced Tutorials:**
  :doc:`How to write reusable apps </intro/reusable-apps>` | 
  :doc:`Writing your first contribution to Django </intro/contributing>`

Getting help
============

Having trouble? We'd like to help!

* Try the :doc:`FAQ </faq/index>` -- it's got answers to many common questions.

* Looking for specific information? Try the :ref:`genindex`, :ref:`modindex` or
  the :doc:`detailed table of contents </contents>`.

* Not found anything? See :doc:`/faq/help` for information on getting support
  and asking questions to the community.

* Report bugs with Django in our `ticket tracker`_.

.. _ticket tracker: https://code.djangoproject.com/

How the documentation is organized
==================================

Django has a lot of documentation. A high-level overview of how it's organized
will help you know where to look for certain things:

* :doc:`Tutorials </intro/index>` take you by the hand through a series of
  steps to create a web application. Start here if you're new to Django or web
  application development. Also look at the ":ref:`index-first-steps`".

* :doc:`Topic guides </topics/index>` discuss key topics and concepts at a
  fairly high level and provide useful background information and explanation.

* :doc:`Reference guides </ref/index>` contain technical reference for APIs and
  other aspects of Django's machinery. They describe how it works and how to
  use it but assume that you have a basic understanding of key concepts.

* :doc:`How-to guides </howto/index>` are recipes. They guide you through the
  steps involved in addressing key problems and use-cases. They are more
  advanced than tutorials and assume some knowledge of how Django works.

The model layer
===============

Django provides an abstraction layer (the "models") for structuring and
manipulating the data of your web application. Learn more about it below:

* **Models:**
  :doc:`Introduction to models </topics/db/models>` | 
  :doc:`Field types </ref/models/fields>` | 
  :doc:`Indexes </ref/models/indexes>` | 
  :doc:`Meta options </ref/models/options>` | 
  :doc:`Model class </ref/models/class>`

* **QuerySets:**
  :doc:`Making queries </topics/db/queries>` | 
  :doc:`QuerySet method reference </ref/models/querysets>` | 
  :doc:`Lookup expressions </ref/models/lookups>`

* **Model instances:**
  :doc:`Instance methods </ref/models/instances>` | 
  :doc:`Accessing related objects </ref/models/relations>`

* **Migrations:**
  :doc:`Introduction to Migrations</topics/migrations>` | 
  :doc:`Operations reference </ref/migration-operations>` | 
  :doc:`SchemaEditor </ref/schema-editor>` | 
  :doc:`Writing migrations </howto/writing-migrations>`

* **Advanced:**
  :doc:`Managers </topics/db/managers>` | 
  :doc:`Raw SQL </topics/db/sql>` | 
  :doc:`Transactions </topics/db/transactions>` | 
  :doc:`Aggregation </topics/db/aggregation>` | 
  :doc:`Search </topics/db/search>` | 
  :doc:`Custom fields </howto/custom-model-fields>` | 
  :doc:`Multiple databases </topics/db/multi-db>` | 
  :doc:`Custom lookups </howto/custom-lookups>` | 
  :doc:`Query Expressions </ref/models/expressions>` | 
  :doc:`Conditional Expressions </ref/models/conditional-expressions>` | 
  :doc:`Database Functions </ref/models/database-functions>`

* **Other:**
  :doc:`Supported databases </ref/databases>` | 
  :doc:`Legacy databases </howto/legacy-databases>` | 
  :doc:`Providing initial data </howto/initial-data>` | 
  :doc:`Optimize database access </topics/db/optimization>` | 
  :doc:`PostgreSQL specific features </ref/contrib/postgres/index>`

The view layer
==============

Django has the concept of "views" to encapsulate the logic responsible for
processing a user's request and for returning the response. Find all you need
to know about views via the links below:

* **The basics:**
  :doc:`URLconfs </topics/http/urls>` | 
  :doc:`View functions </topics/http/views>` | 
  :doc:`Shortcuts </topics/http/shortcuts>` | 
  :doc:`Decorators </topics/http/decorators>` | 
  :doc:`Asynchronous Support </topics/async>`

* **Reference:**
  :doc:`Built-in Views </ref/views>` | 
  :doc:`Request/response objects </ref/request-response>` | 

```

--------------------------------

TITLE: Verify Django Installation
DESCRIPTION: This snippet shows how to verify the Django installation by importing the Django module and printing its version within the Python interpreter.

SOURCE: https://github.com/django/django/blob/main/docs/intro/install.txt#_snippet_2

LANGUAGE: Python
CODE:
```
>>> import django
>>> print(django.get_version())
|version|
```

--------------------------------

TITLE: Verify Python Installation
DESCRIPTION: This snippet shows how to verify if Python is installed by running the 'python' command in the shell and observing the output.

SOURCE: https://github.com/django/django/blob/main/docs/intro/install.txt#_snippet_0

LANGUAGE: Shell
CODE:
```
python
```

--------------------------------

TITLE: Install and Use Pre-commit Hooks
DESCRIPTION: Installs the pre-commit framework and its git hooks to automate code quality checks before committing. This helps catch issues early and allows reviewers to focus on code logic.

SOURCE: https://github.com/django/django/blob/main/docs/internals/contributing/writing-code/coding-style.txt#_snippet_0

LANGUAGE: Shell
CODE:
```
python -m pip install pre-commit
pre-commit install
```

--------------------------------

TITLE: Django Settings Configuration Example
DESCRIPTION: Illustrates how to manually configure Django settings using `settings.configure()`, highlighting the importance of accessing settings only after configuration to avoid import-time errors.

SOURCE: https://github.com/django/django/blob/main/docs/internals/contributing/writing-code/coding-style.txt#_snippet_20

LANGUAGE: Python
CODE:
```
from django.conf import settings

settings.configure({}, SOME_SETTING="foo")
```

--------------------------------

TITLE: Configure OpenSolaris Library Path
DESCRIPTION: Shows how to modify the system library path on OpenSolaris using the `crle` utility. It includes an example of setting the new library path, emphasizing caution.

SOURCE: https://github.com/django/django/blob/main/docs/ref/contrib/gis/install/index.txt#_snippet_4

LANGUAGE: shell
CODE:
```
# crle -l $OLD_PATH:/usr/local/lib
```

--------------------------------

TITLE: Create Django Project
DESCRIPTION: This command bootstraps a new Django project named 'mysite' in a directory called 'djangotutorial'. It's the initial setup step for any Django project.

SOURCE: https://github.com/django/django/blob/main/docs/intro/tutorial01.txt#_snippet_1

LANGUAGE: Shell
CODE:
```
django-admin startproject mysite djangotutorial
```

--------------------------------

TITLE: Set Up Virtual Environment and Install Dependencies
DESCRIPTION: These commands create and activate a Python virtual environment and install the necessary dependencies for working with the Django project.

SOURCE: https://github.com/django/django/blob/main/docs/internals/contributing/writing-documentation.txt#_snippet_1

LANGUAGE: shell
CODE:
```
python -m venv .venv
source .venv/bin/activate
```

--------------------------------

TITLE: Django AppConfig Initialization Example
DESCRIPTION: Demonstrates how to override the ready() method in a Django AppConfig subclass to perform initialization tasks like registering signals. It shows how to import models and connect signals using the model's string label.

SOURCE: https://github.com/django/django/blob/main/docs/ref/applications.txt#_snippet_5

LANGUAGE: Python
CODE:
```
from django.apps import AppConfig
from django.db.models.signals import pre_save


class RockNRollConfig(AppConfig):
    # ...

    def ready(self):
        # importing model classes
        from .models import MyModel  # or...

        MyModel = self.get_model("MyModel")

        # registering signals with the model's string label
        pre_save.connect(receiver, sender="app_label.MyModel")
```

--------------------------------

TITLE: Get Homebrew Installation Prefix
DESCRIPTION: This command retrieves the base installation directory for Homebrew packages on macOS, which is needed to construct the correct path for the SpatiaLite library.

SOURCE: https://github.com/django/django/blob/main/docs/ref/contrib/gis/install/spatialite.txt#_snippet_5

LANGUAGE: console
CODE:
```
$ brew --prefix
/opt/homebrew
```