/**
 * plugin.js
 *
 * Copyright, Timo Huether, http://timo.hüther.net
 * https://github.com/thuethe/TinyMCE-Statistics
 */


tinymce.PluginManager.add('statistics', function(editor) {
  
	function showDialog() {
		var gridHtml, win, countre, cleanre, imagere, tablere, linkre;
		countre = editor.getParam('statistics_countregex', /[\w\u2019\x27\-]+/g); // u2019 == &rsquo;
		cleanre = editor.getParam('statistics_cleanregex', /[0-9.(),;:!?%#$?\x27\x22_+=\\\/\-]*/g);
		imagere = editor.getParam('statistics_imageregex', /<img /g);
		tablere = editor.getParam('statistics_tableregex', /<table/g);
		listre = editor.getParam('statistics_listregex', /<ul|<ol/g);
		linkre = editor.getParam('statistics_linkregex', /<a /g);

		var tx = editor.getContent({format: 'raw'});
		var cc = 0;	// character count
		var wc = 0;	// word count
		var ic = 0;	// image count
		var tc = 0;	// table count
		var lc = 0;	// list count
		var hc = 0;	// hyperlink count

		if (tx) {
			var imageArray = tx.match(imagere);
			if (imageArray) {
				ic = imageArray.length;
			}
			var tableArray = tx.match(tablere);
			if (tableArray) {
				tc = tableArray.length;
			}
			var listArray = tx.match(listre);
			if (listArray) {
				lc = listArray.length;
			}
			var linkArray = tx.match(linkre);
			if (linkArray) {
				hc = linkArray.length;
			}
			
			tx = tx.replace(/\.\.\./g, ' '); // convert ellipses to spaces
			tx = tx.replace(/<.[^<>]*?>/g, ' ').replace(/&nbsp;|&#160;/gi, ' '); // remove html tags and space chars
			tx = tinymce.trim(tx);	// trim whitespace
			cc = tx.length;
			
			// deal with html entities
			tx = tx.replace(/(\w+)(&.+?;)+(\w+)/, "$1$3").replace(/&.+?;/g, ' ');
			tx = tx.replace(cleanre, ''); // remove numbers and punctuation
			var wordArray = tx.match(countre);
			if (wordArray) {
				wc = wordArray.length;
			}
		}
		gridHtml = '<table role="presentation" cellspacing="0" style="width:200px" class="mce-statistics"><tbody>';
		gridHtml += '<tr><td>' + tinymce.translate('Number of characters') + ':</td><td> ' + cc + '</td></tr>';
		gridHtml += '<tr><td>' + tinymce.translate('Number of words') + ':</td><td> ' + wc + '</td></tr>';
		var awl = 0; // average word length
		if(wc > 0) awl = Math.round(cc/wc*100)/100;
		gridHtml += '<tr><td>' + tinymce.translate('Average word length') + ':</td><td> ' + awl + '</td></tr>';
		if(tinymce.PluginManager.get('image') != null)	gridHtml += '<tr><td>' + tinymce.translate('Number of images')		+ ':</td><td> ' + ic + '</td></tr>';
		if(tinymce.PluginManager.get('table') != null)	gridHtml += '<tr><td>' + tinymce.translate('Number of tables')		+ ':</td><td> ' + tc + '</td></tr>';
		if(tinymce.PluginManager.get('lists') != null)	gridHtml += '<tr><td>' + tinymce.translate('Number of lists')		+ ':</td><td> ' + lc + '</td></tr>';
		if(tinymce.PluginManager.get('link') != null)	gridHtml += '<tr><td>' + tinymce.translate('Number of hyperlinks')	+ ':</td><td> ' + hc + '</td></tr>';
		gridHtml += '</tbody></table>';

		var statisticsPanel = {
			type: 'container',
			html: gridHtml
		};

		win = editor.windowManager.open({
			title: "Statistics",
			spacing: 10,
			padding: 10,
			items: [
				statisticsPanel,
			],
			buttons: [
				{text: "Close", onclick: function() {
					win.close();
				}}
			]
		});
	}

	editor.addMenuItem('statistics', {
		text: 'Statistics',
		onclick: showDialog,
		context: 'view'
	});
});
