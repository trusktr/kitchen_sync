const data = require("self").data;
const tabs = require("tabs");
const widgets = require("widget");
const dropbox = require("dropbox").dropbox;
const simpleStorage = require("simple-storage").storage;

//Default Settings
if(!simpleStorage.settings){
	simpleStorage.settings = {};
	simpleStorage.settings['app_key'] = "";
	simpleStorage.settings['app_secret'] = "";
}

widgets.Widget({
	id: "kitchen_sink_widget",
	label: "kitchen_sink",
	contentURL: data.url('gui/img/icon.png'),
	onClick: function() {
            console.log('Opening options page.');
		require("tabs").open(data.url("options.html"));
	}
});


var pageMod = require("page-mod").PageMod({
	include: [data.url("options.html") + '*'],
	contentScriptWhen: 'ready',
	contentScriptFile: [data.url('js/jquery-1.8.3.min.js'), data.url('options.js')],
	onAttach: function(worker) {
            console.log("Content scripts attached.");
		
		//get value from extension storage
		var app_key = simpleStorage.settings['app_key'];
		var app_secret = simpleStorage.settings['app_secret'];
		
		console.log("app_key: " + app_key);
		console.log("app_secret: " + app_secret);
		if(app_key != "" && app_secret != "") {
			dropbox.setup(simpleStorage.settings['app_key'], simpleStorage.settings['app_secret']);
			console.log("accessToken: " + dropbox.accessToken());
			console.log("accessTokenSecret: " + dropbox.accessTokenSecret());
			if(dropbox.accessToken() == "" || dropbox.accessTokenSecret() == "" ) {
				worker.port.emit("set_status", 'disconnected');
			} else {
				worker.port.emit("set_status", 'connected');
			}
		} else {
			worker.port.emit("set_status", 'disconnected');
		}
	
		worker.port.on("get_settings", function(msg) {
			worker.port.emit("set_settings", simpleStorage.settings);
		});
		
		worker.port.on("save_settings", function(settings) {
			simpleStorage.settings['app_key'] = settings.app_key;
			simpleStorage.settings['app_secret'] = settings.app_secret;
			console.log('settings saved');
                        worker.port.emit('settings_saved');
		});
		
		worker.port.on("get_token", function() {
			console.log('dropbox set up');
			dropbox.setup(simpleStorage.settings['app_key'], simpleStorage.settings['app_secret']);
			dropbox.authenticate();
		});
		
		worker.port.on("get_access_token", function() {
			console.log('get access token and secret');
			dropbox.get_access_token(worker);
		});
		
		worker.port.on("remove_token", function() {
			console.log('remove token');
			dropbox.remove_token(worker);
		});
		
		worker.port.on("download_bookmarks", function() {
			console.log('download bookmarks');
			dropbox.download();
		});
		
		worker.port.on("upload_bookmarks", function() {
			console.log('upload bookmarks');
			dropbox.upload();
		});
	}
});
