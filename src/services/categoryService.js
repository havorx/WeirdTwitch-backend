import Category from '../models/Category.js';

export async function getCategory(data) {
  const {categoryName} = data;
  const filter = categoryName ? {categoryName} : {};
  return Category.find(filter).exec();
}

export async function deleteCategory(data) {
  const {categoryID} = data;
  return Category.findByIdAndDelete(categoryID).exec();
}

export async function addCategory(data) {
  const {categoryName, description} = data;
  let category = await Category.exists({categoryName}).exec();
  if (category) {
    return 'category name already exist';
  } else {
    category = {
      categoryName: categoryName,
      description: description,
    };
    await Category.create(category);
    return {message: 'new category created'};
  }
}

export async function updateCategory(data) {
  const {categoryID} = data.params;
  const {categoryName} = data.body;
  return Category.findByIdAndUpdate(categoryID, {categoryName}).
      exec();
}



