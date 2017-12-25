<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../../header.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
<script type="text/javascript">
	var basePath = "${base}";
</script>
<script type="text/javascript" src="${base}static/life-js/house.js"></script>
<script type="text/javascript" src="${base}static/life-js/common.js"></script>
<style>
</style>
</head>
<body id="most" class="easyui-layout" style="width: 100%; height: 100%;">
	<div region="west" split="false" border="false" style="width: 200px; background: #EAFDFF;">
		<div id="left_content" class="easyui-accordion" data-options="border:false,fit:true"></div>
	</div>
	<div region="center" border="false">

		<div id="tt" class="easyui-tabs" style="width: 100%; height: 100%;"></div>

	</div>

	<div data-options="region:'south',split:false" style="height: 37px">
		<div style="float: left; margin-top: 3px; margin-right: 3px;">
			<table>
				<tr>

					<td><a href="javascript:;" id="showTree" style="height: 25px; width: 31px" class="easyui-linkbutton" data-options="plain:false,iconCls:'showTree'"></a> <a href="javascript:;" id="hideTree"  style="height: 25px; width: 31px" class="easyui-linkbutton"
						data-options="plain:false,iconCls:'hideTree'"></a></td>
				</tr>
			</table>
		</div>

		<div style="float: right; margin-top: 3px; margin-right: 3px;">
			<table>
				<tr>
					<td><a style="height: 25px; width: 31px" title="退出" id="exitHouse" class="easyui-linkbutton" data-options="plain:false,iconCls:'main-exit'"></a> <a style="height: 25px; width: 31px" title="全屏" id="btn" class="easyui-linkbutton"
						data-options="plain:false,iconCls:'full-screen'"></a> <a style="height: 25px; width: 31px" title="退出全屏" id="quite" class="easyui-linkbutton" data-options="plain:false,iconCls:'exit-full-screen'"></a></td>
					<td><span style="margin-top: 1px; height: 25px;">阅读模式：</span><select id="readMode" class="easyui-combobox" name="readMode" style="width: 100px; margin-top: 1px; height: 25px;">
							<option value="web">网页</option>
							<option value="text">文本</option>
							<option value="window">弹窗</option>
					</select></td>
			</table>
		</div>
	</div>


</body>
</html>