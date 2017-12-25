$(function() {
	$("#quite").hide();
	$("#showTree").hide();
	var btn = document.getElementById('btn');
	var content = document.getElementById('most');
	var exitHouse = document.getElementById('exitHouse');
	var hideTree = document.getElementById('hideTree');
	var showTree = document.getElementById('showTree');
	
	var isFull = false;
	btn.onclick = function() {
		$("#btn").hide();
		$("#quite").show();
		fullScreen(content);
		isFull = true;
	}
	var quite = document.getElementById('quite');
	quite.onclick = function() {
		$("#btn").show();
		$("#quite").hide();
		exitFullScreen();
		isFull = false;
	}
	exitHouse.onclick = function() {
		if (!isFull) {
			exitFullScreen();
		}
		window.location.href = basePath;
	}
	hideTree.onclick = function() {
		$("#showTree").show();
		$("#hideTree").hide();
		$('#most').layout('collapse', 'west');
	}
	showTree.onclick = function() {
		$("#hideTree").show();
		$("#showTree").hide();
		$('#most').layout('expand', 'west');
	}
	$.ajax({
		type : 'POST',
		dataType : "json",
		url : basePath + 'tree/panentTree',
		success : function(data) {
			$.each(data, function(i, n) {// 加载父类节点即一级菜单
				if (i == 0) {// 显示第一个一级菜单下的二级菜单
					$('#left_content').accordion('add', {
						title : n.text,
						iconCls : n.iconCls,
						selected : true,
						content : '<div style="padding:10px"><ul name="' + n.text + '"></ul></div>',
					});
				} else {
					$('#left_content').accordion('add', {
						title : n.text,
						iconCls : n.iconCls,
						selected : false,
						content : '<div style="padding:10px"><ul name="' + n.text + '"></ul></div>',
					});
				}
				// 屏蔽左下角出现"javascript:;;"
				$("#left_content>.panel .panel-tool>a").removeAttr("href");
				// alert($("#left_content>.panel
				// .panel-tool>a").length);

			});
		}
	});
	// 异步加载子节点，即二级菜单
	$('#left_content').accordion(
			{
				onSelect : function(title, index) {
					$("ul[name='" + title + "']").tree(
							{
								url : basePath + 'tree/getChildNode',
								queryParams : {
									text : title
								},
								animate : true,
								onClick : function(node) {
									var contentUrl = "";
									if (node.url == null || node.url == "") {
										return;
									}
									if (node.readMode == 'web') {
										contentUrl=basePath+'openWeb/addWeb?id='+node.id;
									} else if (node.readMode == 'rss') {
										contentUrl=basePath+'openWeb/addRss?id='+node.id;
									} else {

									}
									if($('#tt').tabs('exists',node.text)){
				                        $('#tt').tabs('select',node.text);
				                    }else{
									var tab = $('#tt').tabs('getSelected');
									console.log(tab);
									$('#tt').tabs('add', {
										title : node.text,
										href : contentUrl,
										closable : true,
										tools : []
									});
				                    }
							
								}
							});
				}
			});
});
function addPanel() {
	// var region = 'north';
	// var options = {
	// region: region
	// };
	// options.height = 200;
	// options.split = true;
	// options.title=" " ;
	// options.border=false;
	// $('#content').layout('add', options);
	// $('#content').html('<div region="north" split="true" title=" "
	// border="false" style="height: 200px"><table id="dg"></table></div>');
}
function rss(url) {
	var url = basePath + "tree/getUrlData?url=" + url;
	$('#dg').datagrid({
		url : url,
		fit : true,
		striped : true,

		singleSelect : true,
		checkOnSelect : true,
		selectOnCheck : true,
		columns : [ [ {
			field : 'title',
			title : '标题',
			width : "37%"
		}, {
			field : 'description',
			title : '内容描述',
			width : "40%"
		}, {
			field : 'pubdate',
			title : '发布时间',
			align : 'right',
			width : "21%"
		} ] ]
	});
}
