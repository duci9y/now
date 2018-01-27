# Now

## Installation

Make sure you have the latest version of `pip` installed. If you don't have
virtualenv installed:

    pip install virtualenv

You can store your virtualenvs wherever you want. I keep them in
`~/.virtualenv`.

    mkdir ~/.virtualenv
    cd ~/.virtualenv

Create a virtualenv for this project in the directory you created above:

    virtualenv ~/.virtualenv/now

Then, go to the root of this project. Activate your virtualenv:

    source ~/.virtualenv/now/bin/activate

You only need to do those steps once after you have cloned the repository
locally.

Install all the requirements:

    pip install -r requirements.txt

You will need to do this every time the requirements.txt file is updated.

## Running

We run locally using a sqlite3 database. The file will be called `db.sqlite3`.

To be able to run with full functionality, you need to perform an additional
step. These would have to be redone whenever our database schema changes.
Django would warn you about these in red text, so don't worry about tracking
those changes, just do the steps again whenever it happens.

    ./manage.py migrate

Another thing you have to do at this point (only for the very first time, or
whenever you reset the database) is create a superuser for your particular
database file.

    ./manage.py createsuperuser

And you're all set! To run a local development server:

    ./manage.py runserver


## Templates

Templates common to more than one app go in the root `jinja2` folder.

Templates specific to apps must be placed according to the following directory
structure:

    <project_root>
    |   <app_name>
        |   jinja2
            |  <app_name>
               |   <template_name>.html.j2

Notice that `<app_name>` is repeated. This is because Jinja2 collates all
template files together in one 'virtual' directory. If you have a template
with the same name in two apps, they'll conflict. So, we namespace all
templates using their app's name. To use a template, you'll use the string
`app_name>/<template_name>.html.j2` to refer to it. <!--An example is given in the
`urls.py` file of the `core` app. Just modify the template for `test_endpoint`
to whatever you create to test your templates, but please make sure you
restore it to `core/test.html.j2` before committing.-->

We only have one app right now, so it is okay for `layout.html.j2` to be the
only file in the root `jinja2` folder. Any templates you may create are most
likely going inside app-specific template directories.

## Static Files

Static files common to more than one app go in the root `static` folder.

Static files specific to apps must be placed according to the following
directory structure:

    <project_root>
    |   <app_name>
        |   static
            |  <app_name>
               |   <file_name>.css

To include a static file in a template, you must not hardcode the URL. Use the
`static` Jinja2 environment function instead:

    <link rel="stylesheet" type="text/css" href="{{ static('core/test_styles.css') }}">

The full path will be resolved at runtime, depending on what storage methods
we end up using for our static files.
