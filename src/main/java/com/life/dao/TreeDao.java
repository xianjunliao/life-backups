package com.life.dao;

import java.util.List;

import com.life.model.TreeModel;

public interface TreeDao {
	List<TreeModel> getTree(TreeModel treeModel);
	
	List<TreeModel> getTreeByText(TreeModel treeModel);
	
	TreeModel geTreeModelByid(String id);
}
