# rolezeira-app

This is a app inspired in a whatsapp group named Rolezeira. The members are university classmates that became best friends even since the classes has fineshed.

This app is building only to learn Ionicframework stuffs, so I'll put some features from a basic social network, chat and some features that whatsapp don't do, like Instagram polls.

The Firebase will be used like the backend layer because it's easy to use, and common to a mpv or hello-world app.

## Features:

Feed:
-  post some stuff with images, text and links.
-  the post can be voted and maybe removed by more dislike.
-  the post can be commented, maybe the comment would be commented too.

Poll:
-  the poll will be used to decide something like go to Madero Restaurant or Outback on friday.

Chat:
-  the last one builded and maybe never used, I'll test it, but the chat is like a web group chat not private chat.


### Just some notes to remember [WIP]

#### to install 

```shell
$ npm install -g ionic
$ npm install -g cordova
$ npm i
```

#### to run 

```shell
$ ionic serve --devapp #assumes all ionic environment are configured
```
or 
```shell
$ ionic cordova run android #assumes all ionic environment are configured
```

-  must have Java JDK 1.8 installed
-  must agree Android Plataform 27 terms on Android Studio
-  must download the android google-services.json from your firebase project, put in root project and setting this in config.xml, like below
```xml
<platform name="android">
    ...
    <resource-file src="google-services.json" target="app/google-services.json" />
</platform>
```
-  remember to change the widget id in config.xml and package_name in google-services.json to be the same
