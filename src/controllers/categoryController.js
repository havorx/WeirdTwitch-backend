import * as categoryService from '../services/categoryService.js';

export async function getCategory(req, res, next) {
  try {
    const data = req.params;
    console.log(data);
    const result = await categoryService.getCategory(data);
    if (data.categoryName && result.length === 0) {
      return res.status(404).send('category not exist');
    }
    return res.status(200).send(result);
  } catch (err) {
    next(err);
  }
}

export async function addCategory(req, res, next) {
  try {
    const data = req.body;
    const result = await categoryService.addCategory(data);
    return res.status(200).send(result);
  } catch (err) {
    next(err);
  }
}

export async function updateCategory(req, res, next) {
  try {
    const data = {params: req.params, body: req.body};
    const result = await categoryService.updateCategory(data);
    if (result == null) {
      return res.status(404).send('category not exist');
    }
    return res.status(200).send(result);
  } catch (err) {
    next(err);
  }
}

export async function deleteCategory(req, res, next) {
  try {
    const data = req.params;
    const result = await categoryService.deleteCategory(data);
    return res.status(200).send(result);
  } catch (err) {
    next(err);
  }
}
