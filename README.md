kitchen_sink
============

Sync bookmarks between Firefox and Chrome using Dropbox.

Synopsis
--------

Kitchen_sink provides you with two extensions -- one for Firefox and one for
Chrome -- that sync your bookmarks between your browsers by writing to and
reading from a file called bookmarks.json in your Dropbox account. For obvious
reasons, we won't state what format the file is in.

**_Warning:_** Please be careful when using kitchen_sink. Kitchen_sink is not
quite ready for production. Restoring bookmarks from Dropbox completely
overwrites what you had in your browser with what's saved in Dropbox. As of
now, kitchen_sink does not perform a merge. For example, you can sync from
Chrome to Dropbox then overwrite your Firefox bookmarks, or the other way
around. *You may want to backup your browser's bookmarks before trying
kitchen_sink.* Consider forking kitchen_sink and implementing merge
functionality or fixing any other bugs. Thanks!

Getting Started
---------------

### Set up a Dropbox app:

First you'll need to create a Dropbox app. Sign in to Dropbox, then navigate to
dropbox.com/developers. Click on "App Console" in the navigation area on the
left. If you've never made a Dropbox app before, you'll start with "What type
of app do you want to create?". Choose "Dropbox API app".  Choose "Files and
datastores" ("Datastores only" won't work).  Choose "No -- My app needs access
to files already on Dropbox." Note that you can choose "Yes -- My app needs
access to files it creates." but you'll have to modify a few small parts of the
code for the extensions to work. Choose "Specific file types" then "Text files"
(choosing just "All file types" will work too).  Now make a name for your app
(yourusername_kitchen_sink for example) and finally create the app. You'll now
be taken to the management page for your app. Take note of the App key and App
secret, which you'll need to provide the extensions later for them to
authenticate with your Dropbox account. Also, there's no need to apply for
production status for your Dropbox app as you'll be the only one using it.
Lastly, create a folder called "kitchen_sink" in the root of your Dropbox
account.

### Install the Chrome extension:

- Bring up the extensions management page by clicking Chrome's menu button
  and choosing Tools > Extensions.

- If Developer mode has a + by it, click the + to add developer
  information to the page. The + changes to a -, and more buttons and
  information appear.

- Click the Load unpacked extension button. A file dialog appears.

- In the file dialog, navigate to your extension's folder and click OK.

More info at http://code.google.com/chrome/extensions/getstarted.html

### Install the Firefox extension:

- Install the add-on SDK:
  https://addons.mozilla.org/en-US/developers/docs/sdk/1.1/dev-guide/addon-development/installation.html

- Build the xpi by running `cfx xpi`.

- Import the xpi to Firefox by pressing ctrl-o and selecting the file.

### Optionally, view the json data in your browser:
This section of the README is not done yet...

- copy the browser.html file in your dropbox folder, you can rename it if
  you like.

- search for <userid> and replace it with your dropbox id.

### Changelog:

*v0.3.1*
This is the final version, unless it becomes a planetary success I'm not going to add any new functionality.

*v0.3*
Added Firefox support.

*v0.2*
Changed auth methods to real oauth and changed dropbox api version from 0 to 1

*v0.1*
First basic version

### License:

> Do What The Fuck You Want To Public License, Version 2.

### Credits:

- Bootstrap v1.3 (http://twitter.github.com/bootstrap).

- gcons from greepit (http://www.greepit.com/open-source-icons-gcons/).

- jQuery (http://jquery.com/).

- JavaScript OAuth library by John Kristian (http://code.google.com/p/oauth/).

- SHA1.js by Paul Johnston (http://pajhome.org.uk/crypt/md5/).

- dropbox-js by Ben Cherry (https://github.com/bcherry/dropbox-js).

- Adapt.js (http://adapt.960.gs/)

